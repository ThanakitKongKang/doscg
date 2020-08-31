<template>
  <div class="container">
    <h1 class="title">{{ title }}</h1>
    <div>
      <b-card
        class="mt-5 mx-auto text-center"
        header="Input origin, destination"
        style="min-height:25em"
      >
        <b-form @submit="onSubmit">
          <b-input-group
            prepend="From"
            class="mb-2 w-75 mx-auto"
          >
            <b-form-input
              id="from"
              v-model="form.origin"
              type="text"
            ></b-form-input>
          </b-input-group>
          <b-input-group
            prepend="To "
            class="mb-2 w-75 mx-auto"
          >
            <b-form-input
              id="to"
              v-model="form.destination"
              type="text"
            ></b-form-input>
          </b-input-group>
          <b-button
            ref="submit"
            type="submit"
            variant="outline-primary"
            class="mt-3"
          >Find Routes</b-button>
        </b-form>
        <div
          id="map"
          class="my-3"
        >
          <iframe
            width="100%"
            height="500px"
            v-bind:src="src"
            frameborder="0"
            style="border:0"
            allowfullscreen
            v-if="src"
          ></iframe>
          <div v-if="!src">Loading..</div>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoogleMaps',
  data () {
    return {
      url: 'https://www.google.com/maps/embed/v1/directions?key=AIzaSyBCSQT6QAnIQ7BGGBoSC-AbIrQoqqqki_o',
      title: 'Google Maps API',
      form: {
        origin: 'SCG Siam Cement Alley, Bang Sue, Bangkok',
        destination: 'CentralWorld, 999/9 Rama I Rd, Pathum Wan, Pathum Wan District, Bangkok 10330'
      },
      src: null
    }
  },
  async mounted () {
    this.$refs.submit.click()
  },
  methods: {
    onSubmit (evt) {
      if (evt) {
        evt.preventDefault()
      }
      this.src = this.url + '&origin=' + this.form.origin + '&destination=' + this.form.destination + '&zoom=13&maptype=satellite'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
