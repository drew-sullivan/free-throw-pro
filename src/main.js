import Vue from 'vue'
import VueFire from 'vuefire'
import App from './App'
import router from './router'

import firebase from 'firebase'

import './assets/scss/main.scss'

let app

Vue.use(VueFire)
Vue.config.productionTip = false

firebase.auth().onAuthStateChanged(
  user => {
    if (!app) {
      /* eslint-disable no-new */
      app = new Vue({
        el: '#app',
        router,
        components: { App },
        template: '<App/>'
      })
    }
  }
)
