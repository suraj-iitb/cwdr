import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions";

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
const functions = getFunctions(app);

// Remove this line before deployment
connectFunctionsEmulator(functions, "localhost", "5001");

export const addNumbers = httpsCallable(functions, 'addNumbers');
export const addMessageCall = httpsCallable(functions, 'addMessageCall');

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
