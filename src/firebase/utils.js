import { doc, getDoc } from "firebase/firestore";

import { db } from './firebase';

export const retrieveDoc = async (collection, id) => {
    const docRef = doc(db, collection, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return {error: "No such document!"};
    }
}
