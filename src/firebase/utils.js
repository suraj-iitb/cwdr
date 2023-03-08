import {
  doc,
  getDoc,
  collection,
  getCountFromServer,
  runTransaction,
  updateDoc
} from "firebase/firestore";
import { COLLECTIONS } from "../constants/constants";

import { db } from "./firebase";
import { capitalize } from "../utils";

export const retrieveDoc = async (collectionName, id) => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return { error: "No such document!" };
  }
};

export const updateDocument = async (collectionName, id, data) => {
  const docRef = doc(db, collectionName, id);
  console.log(collectionName, id, data)
  await updateDoc(docRef, {
    ...data
  });
};
export const retrieveDocsCount = async (collectionName) => {
  const collectionRef = collection(db, collectionName);
  const snapshot = await getCountFromServer(collectionRef);
  return snapshot.data().count;
};

export const getNextMemberId = async (org) => {
  let memberId, count;
  const docRef = doc(db, COLLECTIONS.MEMBER_SEQ, "SEQUENCE");

  try {
    await runTransaction(db, async (transaction) => {
      const docSnap = await transaction.get(docRef);
      if (docSnap.exists()) {
        if(org === COLLECTIONS.MAITHRI) {
          count = docSnap.data().maithri;
          memberId = COLLECTIONS.MAITHRI + "-" + count;
          transaction.update(docRef, { maithri: count+1 });
        } else if(org === COLLECTIONS.MANUSHI) {
          count = docSnap.data().manushi;
          memberId = COLLECTIONS.MANUSHI + "-" + count;
          transaction.update(docRef, { manushi: count+1 });
        } else if(org === COLLECTIONS.SNEHIDHI) {
          count = docSnap.data().snehidhi;
          memberId = COLLECTIONS.SNEHIDHI + "-" + count;
          transaction.update(docRef, { snehidhi: count+1 });
        } 
      }
    });
    console.log("Transaction successfully committed!");
      return capitalize(memberId);
  } catch (e) {
    console.log("Transaction failed: ", e);
  }
}
