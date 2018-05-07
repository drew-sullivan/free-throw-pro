<template>
  <div class="sign-up">
    <p>Create a new Account</p>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <button @click="signUp">Sign Up</button>
    <router-link to="/login"><button>Return to Login</button></router-link>
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
        user => alert('Account created!'),
        err => alert(`Whoops!: ${err.message}`)
      )
    }
  }
}
</script>
