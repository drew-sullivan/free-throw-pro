<template>
  <div class="reset-password">
    <h3 class="util-margin-50">Reset Password</h3>
    <input class="custom-input util-margin-top-40" type="text" v-model="email" placeholder="Email Address"><br>
    <button class="ftp-btn light-btn data-btn util-margin-top-40" @click="sendPasswordResetEmail">Reset Password</button>
    <p class="util-margin-top-30">Return to&nbsp;<router-link to="/login">Login</router-link></p>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'reset-password',
  data: function () {
    return {
      email: ''
    }
  },
  methods: {
    sendPasswordResetEmail: function () {
      firebase.auth().sendPasswordResetEmail(this.email).then(
        () => {
          alert(`Password reset sent to ${this.email}`)
          this.$router.replace('login')
        }).catch(
        error => alert(`Uh-oh! ${error.message}`)
      )
    }
  }
}
</script>

<style scoped>
p {
  font-size: 16px;
}
</style>
