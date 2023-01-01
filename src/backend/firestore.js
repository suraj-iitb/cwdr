// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1YLMIsJUPzx8v1zJXgJgLWnPjOKOiBHM",
  authDomain: "cwdr-org.firebaseapp.com",
  projectId: "cwdr-org",
  storageBucket: "cwdr-org.appspot.com",
  messagingSenderId: "955125939774",
  appId: "1:955125939774:web:ffef8f8ad1e93d82775b6f",
  measurementId: "G-5GY6XTRTCX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);