import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, HelperText, TextInput, Text } from "react-native-paper";
import { login, useMyContext } from "../store";

const Login = ({ navigation }) => {
    const [controller, dispatch] = useMyContext();
    const { userLogin } = controller;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hiddenPassword, setHiddenPassword] = useState(true);

    const hasErrorEmail = () => !email.includes("@");
    const hasErrorPassword = () => password.length < 6;

    const handleLogin = () => {
        login(dispatch, email, password);
    };

    useEffect(() => {
        if (userLogin != null) {
            if (userLogin.role === "admin") {
                navigation.navigate("Admin");
            } else if (userLogin.role === "customer") {
                navigation.navigate("Customer");
            }
        }
    }, [userLogin, navigation]);

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 40, fontWeight: "bold", alignSelf: "center", color: "pink", marginTop: 100, marginBottom: 50 }}>
                Login
            </Text>

            <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                error={hasErrorEmail()}
            />
            {hasErrorEmail() && <HelperText type="error">Địa chỉ Email không hợp lệ</HelperText>}

            <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={hiddenPassword}
                error={hasErrorPassword()}
                right={<TextInput.Icon icon={hiddenPassword ? "eye-off" : "eye"} onPress={() => setHiddenPassword(!hiddenPassword)} />}
            />
            {hasErrorPassword() && <HelperText type="error">Password ít nhất 6 ký tự</HelperText>}

            <Button mode="contained" buttonColor="blue" onPress={handleLogin} disabled={hasErrorEmail() || hasErrorPassword()}>
                Login
            </Button>

            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 20 }}>
                <Text>Don't have an account? </Text>
                <Button onPress={() => navigation.navigate("Register")}>
                    Create new account
                </Button>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                <Button onPress={() => navigation.navigate("ForgotPassword")}>
                    Forgot Password
                </Button>
            </View>
        </View>
    );
};

export default Login;