<template>
  <div id="app" class="ui container">
    <bball stats="stats"></bball>
    <div v-for="(item, index) in stats" :key="index">{{ item }}</div>
  </div>
</template>

<script>
import BBall from './components/BBall'
import Firebase from 'firebase'
let config = {
    apiKey: "AIzaSyBqSI9c69b6k8-ozjv9lxmrvm9dAghgstc",
    authDomain: "free-throw-pro.firebaseapp.com",
    databaseURL: "https://free-throw-pro.firebaseio.com",
    storageBucket: "free-throw-pro.appspot.com",
    messagingSenderId: "607926992175"
  };
let app = Firebase.initializeApp(config)
let db = app.database()
let statsRef = db.ref('stats')

export default {
  name: 'App',
  firebase: {
    stats: statsRef
  },
  components: {
    bball: BBall
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
