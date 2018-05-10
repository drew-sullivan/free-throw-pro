<template>
  <div>
    <title-navbar></title-navbar>
    <div id="app" class="container">
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

.container {
  margin-top: 5px !important;
  background-color: #831E31;
}

canvas, table {
  background-color: white;
}
</style>
