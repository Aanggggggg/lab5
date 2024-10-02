import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import Router from "./routers/Router"; // Đảm bảo đường dẫn chính xác
import { auth, collection, db, getDoc, getDocs } from "./firebaseConfig";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { MyContextProvider } from "./store";

const App = () => {
    const admin = {
        fullName: "Admin",
        email: "vanan.vva@gmail.com",
        password: "123456",
        phone: "0328268747",
        address: "Bình Dương",
        role: "admin"
    }

    useEffect(() => {
        onSnapshot(doc(db, 'USERS', admin.email), async (docSnapshot) => {
            if (!docSnapshot.exists()) {
                await createUserWithEmailAndPassword(auth, admin.email, admin.password)
                    .then(response => {
                        setDoc(doc(db, 'USERS', admin.email), admin);
                        console.log('Added new admin account');
                    })
                    .catch(error => {
                        console.log('Error new admin account', error);
                    })
            }
        })
    }, [])
    return (
        <MyContextProvider>
            <NavigationContainer>
                <Router />
            </NavigationContainer>
        </MyContextProvider>
    );
};

export default App;
