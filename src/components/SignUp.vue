<template>
  <div class="sign-up">
    <h3 class="util-margin-50">Create a New Account</h3>
    <input class="custom-input util-margin-top-40" type="text" v-model="email" placeholder="Email Address"><br>
    <input class="custom-input" type="password" v-model="password" placeholder="Password"><br>
    <button class="ftp-btn light-btn data-btn util-margin-top-40" @click="signUp">Sign Up</button>
    <p class="util-margin-top-30">Return to&nbsp;<router-link to="/login">Login</router-link></p>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'signup',
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signUp: function () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        user => this.$router.replace('bball'),
        err => alert(`Whoops!: ${err.message}`)
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

.pw {
  margin-right: 15px;
}
</style>
