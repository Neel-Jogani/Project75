import firebase from 'firebase'
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyCqVjrjJ832uyzDV67kE_vs9tg3-l2tWRE",
    authDomain: "project71-2aa0f.firebaseapp.com",
    databaseURL: "https://project71-2aa0f-default-rtdb.firebaseio.com",
    projectId: "project71-2aa0f",
    storageBucket: "project71-2aa0f.appspot.com",
    messagingSenderId: "750395446204",
    appId: "1:750395446204:web:379ad0a4b5ff9d32c851b9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore()