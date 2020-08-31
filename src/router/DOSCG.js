import Vue from 'vue'
import Router from 'vue-router'
import FindValues from '@/components/FindValues'
import MissingNumbers from '@/components/MissingNumbers'
import GoogleMaps from '@/components/GoogleMaps'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/miss-no',
      name: 'MissingNumbers',
      component: MissingNumbers,
      alias: '/'
    },
    {
      path: '/find-val',
      name: 'FindValues',
      component: FindValues
    },
    {
      path: '/google-maps',
      name: 'GoogleMaps',
      component: GoogleMaps
    }
  ]
})
