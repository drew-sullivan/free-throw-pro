<template>
  <div>
    <navbar></navbar>

    <hr>
    <router-link to="/">Home</router-link>
    <router-link to="/bball">Bball</router-link>
    <hr>

    <router-view></router-view>

    <div id="app" class="container">
      <bball v-bind:stats="stats" v-on:add-new-data="addNewData($event)"></bball>
    </div>

  </div>
</template>

<script>
import Navbar from './components/Navbar'
import BBall from './components/BBall'
import Firebase from 'firebase'

let config = {
  apiKey: 'AIzaSyBqSI9c69b6k8-ozjv9lxmrvm9dAghgstc',
  authDomain: 'free-throw-pro.firebaseapp.com',
  databaseURL: 'https://free-throw-pro.firebaseio.com',
  storageBucket: 'free-throw-pro.appspot.com',
  messagingSenderId: '607926992175'
}
let app = Firebase.initializeApp(config)
let db = app.database()
let statsRef = db.ref('stats')

export default {
  name: 'App',
  firebase: {
    stats: statsRef
  },
  components: {
    bball: BBall,
    navbar: Navbar
  },
  methods: {
    addNewData: function (newStats) {
      statsRef.push(newStats)
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Permanent+Marker');

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  margin-top: 5px !important;
}
</style>
