<template>
  <div class="login">
    <h3>Sign In</h3>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <button @click="signIn">Sign In</button>
    <router-link to="/sign-up"><button>Create an Account</button></router-link>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'login',
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signIn: function () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        user => alert('You are now logged in'),
        err => alert(`Whoops! ${err.message}`)
      )
    }
  }
}
</script>

<style scoped>

</style>
