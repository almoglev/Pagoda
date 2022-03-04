import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCdDsVPX_YWXlJmxyiE98usFO2Fd1TgJ9U",
    authDomain: "thepagodasite.firebaseapp.com",
    projectId: "thepagodasite",
    storageBucket: "thepagodasite.appspot.com",
    messagingSenderId: "313049083076",
    appId: "1:313049083076:web:bf2382979b9c4efd5f2d91"
  }


// Initialize firebase
firebase.initializeApp(firebaseConfig)

// Initialize services (firestore + authentication)
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// Set up timestamp function
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, projectStorage, timestamp }