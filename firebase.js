import firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyBu07he9SEANIhUndVaW5I-RcPApBMwbgQ",
    authDomain: "ml--clone-5252e.firebaseapp.com",
    projectId: "ml--clone-5252e",
    storageBucket: "ml--clone-5252e.appspot.com",
    messagingSenderId: "212209462412",
    appId: "1:212209462412:web:702fba0503f64283571fa9"
  };

  const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig):
  firebase.app();

  const db = app.firestore();
  
  export default db;

