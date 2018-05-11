<template>
  <div class="login">
    <h3 class="util-margin-50">Sign In</h3>
    <input class="custom-input util-margin-top-40" type="text" v-model="email" placeholder="Email Address"><br>
    <input class="custom-input" type="password" v-model="password" placeholder="Password"><br>
    <div class="util-margin-30">
      <input class="form-check-input pull-left" type="checkbox" value="" id="defaultCheck1">
      <label class="form-check-label pull-left" for="defaultCheck1">Remember Me</label>
      <p class="pull-right">forgot password?</p>
    </div>
    <button class="ftp-btn light-btn data-btn util-margin-top-40" @click="signIn">Sign In</button>
    <p class="util-margin-top-30">Don't have an account?&nbsp;<router-link to="/sign-up">Sign up</router-link></p>
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
        user => this.$router.replace('bball'),
        err => alert(`Whoops! ${err.message}`)
      )
    }
  }
}
</script>

<style scoped>
label, p {
  display: inline-block;
  color: white;
  font-size: 16px;
}

input[type="checkbox"] {
  margin-left: 15px;
  margin-right: 10px;
}
</style>
