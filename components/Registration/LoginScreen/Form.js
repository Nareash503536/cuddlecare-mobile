import { React, useState, useRef, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import { styles } from './textInputStyle';
import { useNavigation } from "@react-navigation/native";
import { Formik } from 'formik';
import Toast from 'react-native-toast-message';
import axios  from 'axios';
import { AuthContext } from "../../../Context/AuthContext";
import { BASE_URL } from "../../../config";

export function Form() {
    const navigation = useNavigation();

    const { login, authState, setIsLoading, setAuthState } = useContext(AuthContext);

    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [EmailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [PasswordFocus, setPasswordFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const loginCheck = async () => {
        if (!validEmail && !validPassword) {
            showToast("emailPassword");
        } else if (!validEmail && validPassword) {
            showToast("email");
        } else if (validEmail && !validPassword) {
            showToast("password");
        } else {
            let response = await login(email, password);
            if (response === undefined) {
                showToast();
            } else {
                const apiURL = BASE_URL + "/isAuthenticated";
                try {
                    response = await axios.post(apiURL, null,
                        {
                            params: {
                                email:email
                            }
                        });
                    console.log(response.data);
                    if (response.data.authenticated) {
                        setAuthState({
                            token: authState.token,
                            authenticated: true
                        });
                    } else {
                        navigation.navigate('VerifyToLoginScreen', {
                            PhoneNumber: response.data.phoneNumber,
                            Email: email,
                            Password: password
                        });
                    }
                } catch (error) {
                    console.log("Authentication error : " + error);
                }
            }
        }

    }

    const USER_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$_!%*#?&])[A-Za-z\d@$!%*_#?&]{8,}$/;

    const showToast = (condition) => {
        let text2 = '';
        if (condition === "emailPassword") {
            text2 = "Please enter a valid email and password";
        } else if (condition === "email") {
            text2 = "Please enter a valid email";
        } else if (condition === "password") {
            text2 = "Please enter a valid password";
        } else {
            text2 = "Invalid user credentials!!!";
        }
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: text2
        });
    }
    useEffect(() => {
        const result = USER_REGEX.test(email);
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        const result = PASSWORD_REGEX.test(password);
        setValidPassword(result);
    }, [password]);

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    function handleSubmit(e) {
        e.preventDefault();
        login(email, password);
    }


    return (
        <View>
            <Formik
                initialValues={{ email: '', password: '' }}>
                <View>

                    <TextInput
                        keyboardType='email-address'
                        onChangeText={setEmail}
                        value={email}
                        ref={emailRef}
                        style={styles.textInput}
                        placeholder="Email"
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                    />
                    <TextInput
                        onChangeText={setPassword}
                        secureTextEntry={true}
                        value={password}
                        style={styles.textInput}
                        placeholder="Password"
                    />
                    <TouchableOpacity
                        className={"flex-row mt-8"}
                        style={styles.loginButton}
                        name="submit"
                        onPress={loginCheck}
                    >
                        <Text className="text-white">
                            login
                        </Text>
                    </TouchableOpacity>

                </View>
            </Formik>

            <View>
                <View className="flex-row justify-center">
                    <Text>
                        Don't have an account?
                    </Text>
                    <Text className={"underline underline-offset-"} onPress={() => navigation.navigate("Register")}>
                        Register
                    </Text>
                </View>
            </View>
        </View>
    )
}