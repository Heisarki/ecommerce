import { db } from "@/config";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";

async function saveData(userId: string, collectionName: string, data: any) {
  const userDocRef = doc(db, collectionName, userId);
  try {
    // Check if the user document already exists
    const userDocSnap = await getDoc(userDocRef);
    const userData = data;

    // If the user document exists, update the addresses array
    if (userDocSnap.exists()) {
      await updateDoc(userDocRef, userData);
    } else {
      // If the user document doesn't exist, create a new document
      await setDoc(userDocRef, userData);
    }
    console.log("Data saved successfully!");
    return data;
  } catch (error) {
    console.error("Error saving addresses:", error);
    return null;
  }
}

async function getUserData(userId: string, collectionName: string) {
  const userDocRef = doc(db, collectionName, userId); // Reference to the user's document in the "address" collection

  //   const querySnapshot = await getDocs(collection(db, "address"));
  //   querySnapshot.forEach((doc) => {
  //     // doc.data() is never undefined for query doc snapshots
  //     console.log(doc.id, " => ", doc.data());
  //   });

  try {
    // Retrieve the user document data
    const userDocSnapshot = await getDoc(userDocRef);
    if (!userDocSnapshot.exists()) {
      console.error("User document does not exist");
      return []; // Return an empty array if the user document doesn't exist
    }

    // Get the user document data
    const userData = userDocSnapshot.data();
    console.log("USER DATA", userData);

    // Extract the addresses from the user document and convert them into an array
    const addresses = Object.values(userData);

    console.log("Data retrieved successfully:", addresses);
    return addresses;
  } catch (error) {
    console.error("Error retrieving addresses:", error);
    return [];
  }
}

async function updateData(
  userId: any,
  collectionName: string,
  dataTobeUpdate: any
) {
  const addressDocRef = doc(db, collectionName, userId); // Reference to the user's address document

  try {
    // Update the document with the new data
    await updateDoc(addressDocRef, dataTobeUpdate);
    console.log("Address updated successfully!");
    return dataTobeUpdate;
  } catch (error) {
    console.error("Error updating address:", error);
    return null;
  }
}

export { saveData, getUserData, updateData };
