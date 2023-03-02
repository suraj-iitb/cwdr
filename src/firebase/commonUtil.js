import { db } from "./firebase";
import {
  addDoc,
  collection,
  getDocs,
  where,
  query,
  updateDoc,
  doc,
} from "firebase/firestore";

export const storeData = async (data, objectName) => {
  try {
    await addDoc(collection(db, objectName), data);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const fetchData = async (id, objectName) => {
  const querySnapshot = await getDocs(
    query(collection(db, objectName), where("memberID", "==", +id))
  );
  const newData = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return newData;
};

export const updateData = async (docID, data, objectName) => {
  console.log("DocIDsdf", docID);

  const docRef = doc(db, objectName, docID);
  console.log("DocID", docID);
  // Update the document
  try {
    await updateDoc(docRef, { ...data });
    console.log("User updated successfully");
  } catch (error) {
    console.error("Error updating user: ", error);
  }
};

export const fetchAllUsersData = async (objectName) => {
  const querySnapshot = await getDocs(query(collection(db, objectName)));
  const newData = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  console.log(newData);
  return newData;
};
