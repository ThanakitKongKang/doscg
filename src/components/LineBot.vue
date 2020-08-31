<template>
  <div class="container">
    <h1 class="title">{{ title }}</h1>
    <div>
      <b-card
        class="mt-5 w-50 mx-auto"
        header="Line Bot noti"
      >
        <b-list-group>
          <b-list-group-item
            v-show="isResult"
            class="m-0"
          >B = {{ results }}
          </b-list-group-item>
          <pre v-show="!isResult">No data</pre>

        </b-list-group>
      </b-card>
    </div>
  </div>
</template>

<script>
// import api from '@/api'
export default {
  name: 'LineBot',
  data () {
    return {
      title: 'Line Bot',
      results: {
      },
      isResult: false,
      showDismissibleAlert: false
    }
  },
  async created () {
    // this.callBack()
  },
  methods: {
    // callBack (evt) {
    //   api.webHook(this.form.values).then((res) => {
    //     if (!res.results) {
    //       this.showDismissibleAlert = true
    //       this.results = 'No data'
    //       this.isResult = false
    //     } else {
    //       this.showDismissibleAlert = false
    //       this.results = JSON.parse(res.results).result
    //       this.isResult = true
    //     }
    //   })
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
