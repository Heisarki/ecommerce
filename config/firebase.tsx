// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics"; 
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "ecommerce-62b66.firebaseapp.com",
    projectId: "ecommerce-62b66",
    storageBucket: "ecommerce-62b66.appspot.com",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
// const analytics = getAnalytics(app);

export {
    app,
    auth,
}