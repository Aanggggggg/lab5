// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, getDoc } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD8um0lVDb7CIZKPpVOL_EP6IA80FgSUxk",
    authDomain: "th-lab5.firebaseapp.com",
    projectId: "th-lab5",
    storageBucket: "th-lab5.appspot.com",
    messagingSenderId: "132699123597",
    appId: "1:132699123597:web:73097a4d710ab722a697c4",
    measurementId: "G-DWD2QQ1BPN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);


export { auth, db, collection, addDoc, getDocs, onSnapshot, getDoc };