import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Alert, View } from "react-native";
import { Button, HelperText, TextInput, Text } from "react-native-paper";
import { auth } from "../firebaseConfig";

const Register = ({ navigation }) => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [hiddenPassword, setHiddenPassword] = useState(true);
    const [hiddenPasswordConfirm, setHiddenPasswordConfirm] = useState(true);
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const hasErrorFullName = () => fullName === "";
    const hasErrorEmail = () => !email.includes("@");
    const hasErrorPassword = () => password.length < 6;
    const hasErrorPasswordConfirm = () => passwordConfirm !== password;

    const handleCreateAccount = () => {
        if (hasErrorFullName() || hasErrorEmail() || hasErrorPassword() || hasErrorPasswordConfirm()) {
            Alert.alert("Please fix the errors before submitting.");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((response) => {
                getDoc(doc(db, 'USERS', admin.email)).set({
                    fullName,
                    email,
                    phone,
                    address,
                    role: 'customer'
                });
                navigation.navigate('Login');
            })
            .catch((error) => {
                Alert.alert('Error', error.message);
            })
    };

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 30, marginBottom: 20 }}>Register</Text>

            <TextInput
                label="Full Name"
                value={fullName}
                onChangeText={setFullName}
                error={hasErrorFullName()}
            />
            {hasErrorFullName() && <HelperText type="error">Full name is required</HelperText>}

            <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                error={hasErrorEmail()}
            />
            {hasErrorEmail() && <HelperText type="error">Invalid email address</HelperText>}

            <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={hiddenPassword}
                error={hasErrorPassword()}
                right={<TextInput.Icon icon={hiddenPassword ? "eye-off" : "eye"} onPress={() => setHiddenPassword(!hiddenPassword)} />}
            />
            {hasErrorPassword() && <HelperText type="error">Password must be at least 6 characters</HelperText>}

            <TextInput
                label="Confirm Password"
                value={passwordConfirm}
                onChangeText={setPasswordConfirm}
                secureTextEntry={hiddenPasswordConfirm}
                error={hasErrorPasswordConfirm()}
                right={<TextInput.Icon icon={hiddenPasswordConfirm ? "eye-off" : "eye"} onPress={() => setHiddenPasswordConfirm(!hiddenPasswordConfirm)} />}
            />
            {hasErrorPasswordConfirm() && <HelperText type="error">Passwords must match</HelperText>}

            <TextInput
                label="Phone"
                value={phone}
                onChangeText={setPhone}
                style={{ marginBottom: 20 }}
            />

            <TextInput
                label="Address"
                value={address}
                onChangeText={setAddress}
                style={{ marginBottom: 20 }}
            />

            <Button mode="contained" onPress={handleCreateAccount}>
                Create New Account
            </Button>

            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 20 }}>
                <Text>Do you have an account? </Text>
                <Button onPress={() => navigation.navigate("Login")}>
                    Login
                </Button>
            </View>
        </View>
    );
};

export default Register;
