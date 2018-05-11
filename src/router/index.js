import Vue from 'vue'
import Router from 'vue-router'
import BBall from '@/components/BBall'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import ResetPassword from '@/components/ResetPassword'

import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  routes: [
    { path: '*', redirect: '/login' },
    { path: '/', redirect: '/login' },
    { path: '/bball', component: BBall, meta: { requiresAuth: true } },
    { path: '/login', component: Login },
    { path: '/sign-up', component: SignUp },
    { path: '/reset-password', component: ResetPassword }
  ],
  mode: 'history'
})

router.beforeEach(
  (to, from, next) => {
    let currentUser = firebase.auth().currentUser
    let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

    if (requiresAuth && !currentUser) {
      next('login')
    } else if (!requiresAuth && currentUser) {
      next('bball')
    } else {
      next()
    }
  }
)

export default router
