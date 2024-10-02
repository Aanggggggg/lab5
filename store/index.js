import React, { createContext, useContext, useMemo, useReducer } from "react";
import { Alert } from "react-native";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, getDoc, onSnapshot } from "../firebaseConfig";
import { doc } from "firebase/firestore";

// Create the context
const MyContext = createContext();
MyContext.displayName = "MyContext";

// Define the reducer
const reducer = (state, action) => {
    switch (action.type) {
        case "USER_LOGIN":
            return { ...state, userLogin: action.value };
        case "LOGOUT":
            return { ...state, userLogin: null };
        default:
            throw new Error("Action not found");
    }
};

// Define the context provider
const MyContextProvider = ({ children }) => {
    const initialState = {
        userLogin: null,
        services: []
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const value = useMemo(() => [state, dispatch], [state, dispatch]);

    return (
        <MyContext.Provider value={value}>
            {children}
        </MyContext.Provider>
    );
};

// Custom hook to use the context
const useMyContext = () => {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error("useMyContext must be used within a MyContextProvider");
    }
    return context;
};

// Define login action
const login = (dispatch, email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then(response => {
            //console.log('11111')
            onSnapshot(getDoc(doc(db, 'USERS', email)), (u) => {
                console.log(u.data())
                dispatch({ type: 'USER_LOGIN', value: u.data() });
            });
        })
        .catch(() => Alert.alert('Invalid email or password'));
};

// Define logout action
const logout = (dispatch) => {
    signOut(auth)
        .then(() => {
            dispatch({ type: 'LOGOUT' })
        })
};

// Export the context provider and actions
export {
    MyContextProvider,
    useMyContext,
    login,
    logout
};