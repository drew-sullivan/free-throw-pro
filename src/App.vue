<template>
  <div>
    <nav class="navbar navbar-light">
      <div class="navbar-brand abs">Free Throw Pro</div>
    </nav>
    <div id="app" class="container">
      <bball v-bind:stats="stats" v-on:add-new-data="addNewData($event)"></bball>
    </div>
  </div>
</template>

<script>
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
    bball: BBall
  },
  methods: {
    addNewData: function (newStats) {
      statsRef.push(newStats)
    }
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

.container {
  margin-top: 5px !important;
}

.navbar {
  height: 80px;
  background-color: #6F263D;
  margin-bottom: 0;
  border-bottom: 5px solid #FFB81C;
  border-top: 10px solid #041E42;
}

.navbar-brand.abs {
  position: absolute;
  width: 100%;
  left: 0;
  text-align: center;
  color: #FFB81C;
  line-height: 35px;
  font-size: 40px;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}

h1 {
  font-size: 100px;
  margin-top: 10px;
  margin-bottom: 20px;
}

.table {
  margin-top: 20px;
}
</style>
