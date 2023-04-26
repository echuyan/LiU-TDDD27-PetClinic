// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import * as firebase from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCQ-Zt2OXosq1WcY5vTZ6La3zXycNAWBzs",
  authDomain: "petclinicdb-5b403.firebaseapp.com",
  projectId: "petclinicdb-5b403",
  storageBucket: "petclinicdb-5b403.appspot.com",
  messagingSenderId: "646572343194",
  appId: "1:646572343194:web:906fd655cce3379b85c423",
  measurementId: "G-XBNXYT0L37"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export default firebase;
