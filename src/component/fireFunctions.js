import { collection, addDoc, setDoc, doc, updateDoc, getDoc, getDocs } from "firebase/firestore";
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

// Function to get total number of users
const getTotalUsers = async () => {
    try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        return usersSnapshot.size;
    } catch (e) {
        console.error("Error getting total users:", e);
        return 0;
    }
}

export { setData, updateData, readData, getTotalUsers }