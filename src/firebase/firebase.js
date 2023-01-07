import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

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

export const auth = getAuth(app);
export const db = getFirestore(app);

export const createUserProfileDocument = async (userAuth) => {
  if (!userAuth) return;

  const userRef = doc(db, "user", userAuth.uid);

  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    setDoc(userRef, { displayName, createdAt, email })
      .catch((err) => console.log(err));
  }
  return userRef;
};