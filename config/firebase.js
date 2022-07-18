const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");

// Add Firebase SDK Snippet

const firebaseConfig = {
  apiKey: "AIzaSyD3g0eU9ns6aDqyPzcq9a9Ol467Yqi0Uh0",
  authDomain: "client-demo-9e1d1.firebaseapp.com",
  projectId: "client-demo-9e1d1",
  storageBucket: "client-demo-9e1d1.appspot.com",
  messagingSenderId: "1082228765156",
  appId: "1:1082228765156:web:a087f18b7a16d6919f17f1",
  measurementId: "G-M6TSR0120P"
};
firebase.initializeApp(firebaseConfig);

module.exports = firebase;
