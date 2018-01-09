import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"

var config = {
    apiKey: "AIzaSyAaSyUHNw1ye450sYl33A846URzMQKqTAY",
    authDomain: "our-cryptos.firebaseapp.com",
    databaseURL: "https://our-cryptos.firebaseio.com",
    projectId: "our-cryptos",
    storageBucket: "our-cryptos.appspot.com",
    messagingSenderId: "571559336324"
}
firebase.initializeApp(config)

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;