import { db } from "@/config";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

async function saveAddress( userId: string, data: any) {
    const userDocRef = doc(db, "address", userId); 
    try {
        // Check if the user document already exists
        const userDocSnap = await getDoc(userDocRef);
        const userData =  data

        // If the user document exists, update the addresses array
        if (userDocSnap.exists()) {
            await updateDoc(userDocRef, userData);
        } else {
            // If the user document doesn't exist, create a new document
            await setDoc(userDocRef, userData);
        }
        console.log('Addresses saved successfully!');
        return data
    } catch (error) {
        console.error('Error saving addresses:', error);
        return null
    }
}

async function getAddressList(userId: string) {
    const userDocRef = doc(db, 'address', userId); // Reference to the user's document in the "address" collection

    try {
        // Retrieve the user document data
        const userDocSnapshot = await getDoc(userDocRef);
        if (!userDocSnapshot.exists()) {
            console.error('User document does not exist');
            return []; // Return an empty array if the user document doesn't exist
        }

        // Get the user document data
        const userData = userDocSnapshot.data();
        console.log("USER DATA", userData)

        // Extract the addresses from the user document and convert them into an array
        const addresses = Object.values(userData);

        console.log('Addresses retrieved successfully:', addresses);
        return addresses;
    } catch (error) {
        console.error('Error retrieving addresses:', error);
        return [];
    }
}

async function updateAddress(addressId: any, userId: any, updatedAddressData: any) {
    const addressDocRef = doc(db, 'address', userId); // Reference to the user's address document

    try {
        // Update the document with the new data
        await updateDoc(addressDocRef, {
            [addressId]: updatedAddressData // Update only the specific address within the document
        });
        console.log('Address updated successfully!');
        return updatedAddressData;
    } catch (error) {
        console.error('Error updating address:', error);
        return null;
    }
}

export {
    saveAddress,
    getAddressList,
    updateAddress,
}