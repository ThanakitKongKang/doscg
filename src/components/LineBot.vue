<template>
  <div class="container">
    <h1 class="title">{{ title }}</h1>
    <div>
      <b-card
        class="mt-5 w-50 mx-auto"
        header="How to test this function"
      >
        <b-list-group>
          <b-list-group-item class="m-0">
            <div class="mb-3">Add bot ID : @355frgxr</div>
            <div
              class="line-it-button"
              data-lang="en"
              data-type="friend"
              data-lineid="@355frgxr"
              data-count="true"
              style="display: none;"
            ></div>
          </b-list-group-item>
          <b-list-group-item class="m-0">
            Get LINE notify
            <a
              ref="submit"
              type="button"
              variant="success"
              class="mt-3"
              v-bind:href="href"
            >CLICK</a>
          </b-list-group-item>
          <b-list-group-item class="m-0">
            Try to send message to @355frgxr (doscg line bot)
            <div class="text-secondary">e.g. "Hey", "Hello"</div>
          </b-list-group-item>
        </b-list-group>
      </b-card>
      <b-alert
        dismissible
        v-model="showSuccessAlert"
        variant="success"
      >"doscg" is now connected, you can test line bot</b-alert>
      <b-alert
        dismissible
        v-model="showDismissibleAlert"
        variant="danger"
      >Something went wrong, please <a href="/line-bot">try again</a></b-alert>
    </div>
  </div>
</template>

<script>
import api from '@/api'

export default {
  name: 'LineBot',
  data () {
    let LINE_API_URI = 'https://notify-bot.line.me/oauth/authorize?'
    let q = {
      'response_type': 'code',
      'client_id': 'ug5Dj546tVlA0b9ONLqHwI',
      'redirect_uri': 'https://doscg-linebot.herokuapp.com/line-callback',
      'scope': 'notify',
      'state': 'abcdef123456'
    }
    return {
      title: 'Line Bot',
      results: {
      },
      isResult: false,
      href: LINE_API_URI + '&response_type=' + q.response_type + '&client_id=' + q.client_id + '&redirect_uri=' + q.redirect_uri + '&scope=' + q.scope + '&state=' + q.state,
      showDismissibleAlert: false,
      showSuccessAlert: false
    }
  },
  async created () {
    this.callBack()
  },
  methods: {
    callBack () {
      if (this.$route.query.code) {
        api.lineCallback(this.$route.query.code).then((res) => {
          if (res.results === 'INVALID_CODE') {
            this.showDismissibleAlert = true
          } else {
            this.showSuccessAlert = true
          }
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
