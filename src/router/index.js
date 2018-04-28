import Vue from 'vue'
import Router from 'vue-router'
import BBall from '@/components/BBall'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'BBall',
      component: BBall
    }
  ]
})
