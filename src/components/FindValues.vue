<template>
  <div class="container">
    <h1 class="title">{{ title }}</h1>
    <div>
      <b-card
        class="mt-5 w-50 mx-auto"
        header="Input Values"
      >
        <b-form
          @submit="onSubmit"
          @change="onSubmit"
        >
          <b-input-group
            prepend="A = "
            class="mb-2 w-75 mx-auto"
          >
            <b-form-input
              id="input-A"
              number
              v-model="form.values[0]"
              type="number"
            ></b-form-input>
          </b-input-group>
          <b-input-group
            prepend="A + B = "
            class="mb-2 w-75 mx-auto"
          >
            <b-form-input
              id="input-AB"
              number
              v-model="form.values[1]"
              type="number"
            ></b-form-input>
          </b-input-group>

          <b-input-group
            prepend="A + C = "
            class="mb-2 w-75 mx-auto"
          >
            <b-form-input
              id="input-AC"
              number
              v-model="form.values[2]"
              type="number"
            ></b-form-input>
          </b-input-group>

          <b-alert
          dismissible
            v-model="showDismissibleAlert"
            variant="danger"
          >Something went wrong!</b-alert>
          <b-button
            type="submit"
            variant="outline-primary"
            class="mt-3"
          >Find B, C values</b-button>
        </b-form>
      </b-card>
      <b-card
        class="mt-5 w-50 mx-auto"
        header="B, C values"
      >
        <b-list-group>
          <b-list-group-item
            v-show="isResult"
            class="m-0"
          >B = {{ results.B }}
          </b-list-group-item>

          <b-list-group-item
            v-show="isResult"
            class="m-0"
          >C = {{ results.C }}
          </b-list-group-item>

          <pre v-show="!isResult">No data</pre>

        </b-list-group>
      </b-card>
    </div>
  </div>
</template>

<script>
import api from '@/api'
export default {
  name: 'FindValues',
  data () {
    const initialValues = [21, 23, -21]
    return {
      title: 'Find B, C Values',
      form: {
        values: initialValues
      },
      results: {
        B: null,
        C: null
      },
      isResult: false,
      showDismissibleAlert: false
    }
  },
  async created () {
    this.onSubmit()
  },
  methods: {
    onSubmit (evt) {
      if (evt) {
        evt.preventDefault()
      }
      if (!this.form.values[0]) {
        this.form.values[0] = 0
      }
      if (!this.form.values[1]) {
        this.form.values[1] = 0
      }
      if (!this.form.values[2]) {
        this.form.values[2] = 0
      }
      api.findValues(this.form.values).then((res) => {
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
