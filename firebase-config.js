import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyBqSI9c69b6k8-ozjv9lxmrvm9dAghgstc',
  authDomain: 'free-throw-pro.firebaseapp.com',
  databaseURL: 'https://free-throw-pro.firebaseio.com',
  storageBucket: 'free-throw-pro.appspot.com',
  messagingSenderId: '607926992175'
}
const app = firebase.initializeApp(config)

const db = app.database()
let statsRef;

export default statsRef = db.ref('stats')
console.log(firebase.auth().currentUser)
