import Vue from 'vue'
import Router from 'vue-router'
import BBall from '@/components/BBall'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: BBall },
    { path: '/bball', component: BBall }
    // { path: '/login', name: 'Login', component: Login}
  ],
  mode: 'history'
})
