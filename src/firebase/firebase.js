import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSMb3F7h2dzo638L_pEvwTfHWH_ucJAXA",
  authDomain: "cwdr-application.firebaseapp.com",
  projectId: "cwdr-application",
  storageBucket: "cwdr-application.appspot.com",
  messagingSenderId: "202195066477",
  appId: "1:202195066477:web:fccc7b6e0e1002c810e964"
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
