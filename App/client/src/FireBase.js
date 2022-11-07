// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzI89dTsDBnjYOIxfVrBkq_QHTJxltCRQ",
  authDomain: "react-community-c9e5e.firebaseapp.com",
  projectId: "react-community-c9e5e",
  storageBucket: "react-community-c9e5e.appspot.com",
  messagingSenderId: "1038827062363",
  appId: "1:1038827062363:web:feb653b7d937f27a782b7e",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
