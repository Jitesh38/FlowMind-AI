import { collection, addDoc, setDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const setData = async (collection, userID, data) => {
    try {
        await setDoc(doc(db, collection, userID), data);
    } catch (e) {
        console.error("Error adding document :", e);
    }
}

const updateData = async (collection, userID, data) => {
    try {
        await updateDoc(doc(db, collection, userID), data);
    } catch (e) {
        console.error("Error adding document :", e);
    }
}

const readData = async (collection, uID) => {
    const docSnap = await getDoc(doc(db, collection, uID));
    if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        return docSnap.data()
    } else {
        console.log("No such document!");
        return null
    }
}

export { setData, updateData, readData }