import { db } from "./firebase";
import { addDoc, collection } from "firebase/firestore";


export const storeData = async(data, objectName) =>{

    try {
        await addDoc(collection(db, objectName), data);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}
