import Vue from 'vue'
import Router from 'vue-router'
import FindValues from '@/components/FindValues'
import MissingNumbers from '@/components/MissingNumbers'
import GoogleMaps from '@/components/GoogleMaps'
import LineBot from '@/components/LineBot'
import Resume from '@/components/Resume'

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
    },
    {
      path: '/line-bot',
      name: 'LineBot',
      component: LineBot
    },
    {
      path: '/line-callback',
      name: 'LineBot',
      component: LineBot
    },
    {
      path: '/cv',
      name: 'Resume',
      component: Resume
    }
  ]
})
