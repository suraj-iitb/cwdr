var appn = require("firebase/app");
var firestore = require("firebase/firestore");
var config = require("../config/config")

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSMb3F7h2dzo638L_pEvwTfHWH_ucJAXA",
  authDomain: "cwdr-application.firebaseapp.com",
  projectId: "cwdr-application",
  storageBucket: "cwdr-application.appspot.com",
  messagingSenderId: "202195066477",
  appId: "1:202195066477:web:fccc7b6e0e1002c810e964",
};

// Initialize Firebase
const app = appn.initializeApp(firebaseConfig);
const db = firestore.getFirestore(app);

const createUserProfileDocument = async (userAuth) => {
  if (!userAuth) return;

  const userRef = firestore.doc(db, "user", userAuth.uid);
  const userSnapshot = await firestore.getDoc(userRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    firestore
      .setDoc(userRef, { createdAt, displayName, email, roles: [config.ROLES.FIELD] })
      .catch((err) => console.log(err));
  }
  return userRef;
};

module.exports = {
  createUserProfileDocument,
};
