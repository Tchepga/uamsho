import firebase from 'firebase/app'

import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyAJ6Fryeukc4TROHuW21ut2hCROzPFwCYI",
  authDomain: "crowd237.firebaseapp.com",
  databaseURL: "https://crowd237.firebaseio.com",
  projectId: "crowd237",
  storageBucket: "crowd237.appspot.com",
  messagingSenderId: "724437985455",
  appId: "1:724437985455:web:6be29bf71b9eae4ac68c5a",
  measurementId: "G-WZFWWGCZ5W",
};


firebase.initializeApp(firebaseConfig);

export default firebase;
