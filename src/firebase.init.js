// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD2bSxacuXz7xLWu4FMqCf2l5OPH3Vz0yk",
    authDomain: "email-password-auth-44f01.firebaseapp.com",
    projectId: "email-password-auth-44f01",
    storageBucket: "email-password-auth-44f01.appspot.com",
    messagingSenderId: "703232458015",
    appId: "1:703232458015:web:2ee914bd8249a6b583842a",
    measurementId: "G-D6C8GPNKT5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app