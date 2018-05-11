<template>
  <div>
    <div id="app" class="container">
      <img class="app-title-img" src="../static/favicon.png">
      <p class="app-title">Free Throw Pro</p>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import TitleNavbar from './components/TitleNavbar'
import BBall from './components/BBall'

export default {
  name: 'App',
  components: {
    bball: BBall,
    titleNavbar: TitleNavbar
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
  margin-top: 60px;
}
</style>
