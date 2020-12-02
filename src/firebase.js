import firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDooXpUQ3MqmdYlbpPlXcyyV-PEDxq037g",
    authDomain: "barcart-8808a.firebaseapp.com",
    databaseURL: "https://barcart-8808a.firebaseio.com",
    projectId: "barcart-8808a",
    storageBucket: "barcart-8808a.appspot.com",
    messagingSenderId: "203689556798",
    appId: "1:203689556798:web:85feb0322444a0bd184a6f",
    measurementId: "G-35NM8PZBB8"
  };
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);