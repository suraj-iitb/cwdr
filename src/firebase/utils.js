import {
  doc,
  getDoc,
  collection,
  getCountFromServer,
} from "firebase/firestore";

import { db } from "./firebase";

export const retrieveDoc = async (collectionName, id) => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return { error: "No such document!" };
  }
};

export const retrieveDocsCount = async (collectionName) => {
  const collectionRef = collection(db, collectionName);
  const snapshot = await getCountFromServer(collectionRef);
  return snapshot.data().count;
};
