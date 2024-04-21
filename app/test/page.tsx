"use client"
import { Button } from '@/components/ui/Button'
import React from 'react'
import { db } from '@/config'
import { addDoc, getDocs, collection, updateDoc, setDoc, doc, getDoc } from 'firebase/firestore'

export default function page() {
    const addressCollection = collection(db, "address")
    const userDocRef = doc(db, 'address', "12345"); // Reference to the user 
    async function handleUpload() {

        try {
            // Check if the user document already exists
            const userDocSnap = await getDoc(userDocRef);
            const userData = {
                address_ID_4: {
                    id: "address_ID_4",
                    lineOne: "Ialong Village",
                    lineTwo: "Khliehphrynap",
                    city: "Shillong",
                    state: "Meghalaya",
                    pincode: "793150"
                }
                // addresses: [
                //     {
                //         id: "addressID_1",
                //         lineOne: "Ialong",
                //         lineTwo: "Khliehphrynap",
                //         city: "Shillong",
                //         state: "Meghalaya",
                //         pincode: "793150"
                //     },
                //     {
                //         id: "addressID_2",
                //         lineOne: "Ialong",
                //         lineTwo: "Khliehphrynap",
                //         city: "Shillong",
                //         state: "Meghalaya",
                //         pincode: "793150"
                //     }

                // ] // New addresses array
            };

            // If the user document exists, update the addresses array
            if (userDocSnap.exists()) {
                await updateDoc(userDocRef, userData);
            } else {
                // If the user document doesn't exist, create a new document
                await setDoc(userDocRef, userData);
            }

            console.log('Addresses saved successfully!');
        } catch (error) {
            console.error('Error saving addresses:', error);
        }
    }
    async function handleGetData() {
        const userId = '12345'; // Replace 'user123' with the actual user ID
        const userAddresses = await getUserAddresses(userId);
        console.log('User Addresses:', userAddresses);
        // try {
        //     const response = await getDocs(addressCollection)
        //     const filteredData = response.docs.map((doc) => ({
        //         // userId: doc.id,
        //         ...doc.data(),
        //     }))
        //     console.log(response)
        //     console.log(filteredData)
        // } catch (err) {
        //     console.log(err)
        // }
    }

    // Update
    async function updateAddress(addressId: any, userId: any, updatedAddressData: any) {
        const addressDocRef = doc(db, 'address', userId); // Reference to the user's address document

        try {
            // Update the document with the new data
            await updateDoc(addressDocRef, {
                [addressId]: updatedAddressData // Update only the specific address within the document
            });
            console.log('Address updated successfully!');
            return true;
        } catch (error) {
            console.error('Error updating address:', error);
            return false;
        }
    }
    // Usage example
    const userId = '123'; // Replace 'user123' with the actual user ID
    const addressId = 'address_ID_2'; // The ID of the address you want to update
    const updatedAddressData = {
        lineOne: 'Updated Line NOW',
        lineTwo: 'Updated Line Two',
        city: 'Updated City',
        state: 'Updated State',
        pincode: 'Updated Pincode'
    };

    async function handleUpdate() {
        const success = await updateAddress(addressId, userId, updatedAddressData);
        if (success) {
            console.log('Address updated successfully!');
        } else {
            console.log('Failed to update address.');
        }
    }

    /**
     * Get all address object into an array
     */
    async function getUserAddresses(userId: any) {
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

    return (
        <div>
            <Button onClick={handleUpload}>
                Upload
            </Button>
            <Button onClick={handleGetData}>
                Get
            </Button>
            <Button onClick={handleUpdate}>
                UPdate
            </Button>
        </div>
    )
}
