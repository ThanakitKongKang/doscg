<template>
  <div class="container">
    <h1 class="title">{{ title }}</h1>
    <div>
      <b-card
        class="mt-5 w-50 mx-auto"
        header="Input Values"
      >
        <b-form @submit="onSubmit">
          <div
            v-for="(number,index) in form.numbers"
            :key="index"
          >
            <b-form-input
              v-bind:id="'input-'+index"
              number
              v-model="form.numbers[index]"
              type="number"
              v-bind:placeholder="'Number '+Number(index+1)"
              class="mb-2 w-75 mx-auto"
            ></b-form-input>

          </div>
          <b-alert
            dismissible
            v-model="showDismissibleAlert"
            variant="danger"
          >Numbers are not valid sequences!</b-alert>
          <b-button
            ref="submit"
            type="submit"
            variant="outline-primary"
            class="mt-3"
          >Find missing value (s)</b-button>
        </b-form>
      </b-card>
      <b-card
        class="mt-5 w-50 mx-auto"
        header="Missing values"
      >
        <b-list-group>
          <b-list-group-item
            v-show="isResult"
            class="m-0"
            v-for="(result,index) in results"
            :key="index"
          >{{ result }}
          </b-list-group-item>
          <pre v-show="!isResult">{{results}}</pre>

        </b-list-group>
      </b-card>
    </div>
  </div>
</template>

<script>
import api from '@/api'
export default {
  name: 'MissingNumbers',
  data () {
    const initialValues = [null, null, 5, 9, 15, 23, null]
    return {
      title: 'Finding X, Y, Z value',
      form: {
        numbers: initialValues
      },
      results: 'No data',
      isResult: false,
      showDismissibleAlert: false
    }
  },
  async mounted () {
    this.$refs.submit.click()
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      api.getMissingNumbers(this.form.numbers).then((res) => {
        if (!res.results) {
          this.showDismissibleAlert = true
          this.results = 'No data'
          this.isResult = false
        } else {
          this.showDismissibleAlert = false
          this.results = JSON.parse(res.results).result
          this.isResult = true
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
