import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDby5jeaNUsuP5CQmOuteJLEDUyl48tSws",
    authDomain: "e-commerce-a376e.firebaseapp.com",
    projectId: "e-commerce-a376e",
    storageBucket: "e-commerce-a376e.appspot.com",
    messagingSenderId: "74888118682",
    appId: "1:74888118682:web:1910b677faa2619ae0fa23",
    measurementId: "G-4WJ1EHRF4J"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()


export { auth, db }
