import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDOSkk22gF6UpBAgUup8uzwSJwhUN4dg1U",
    authDomain: "bharatify-671ec.firebaseapp.com",
    projectId: "bharatify-671ec",
    storageBucket: "bharatify-671ec.appspot.com",
    messagingSenderId: "456029782554",
    appId: "1:456029782554:web:67fe4ca030bb96d96b47a3"
  };

  const app = !firebase.apps.length 
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

  const db = app.firestore();

  export default db;

  // stripe listen --forward-to=localhost:3000/api/webhook