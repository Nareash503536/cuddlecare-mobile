import { React, useState, useRef, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import { styles } from './textInputStyle';
import { useNavigation } from "@react-navigation/native";
import { Formik } from 'formik';
import Toast from 'react-native-toast-message';
import { AuthContext } from "../../../Context/AuthContext";
import AuthenticationAPI from '../../../api/AuthenticationAPI';
import icons from '../../../constants/icons';
import { LoadingContext } from '../../../screens/Registration/LoginScreen';

export function Form() {
    const navigation = useNavigation();

    const { setLoading } = useContext(LoadingContext);
    const { login, setAuthState, authState, updateKeys } = useContext(AuthContext);

    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [EmailFocus, setEmailFocus] = useState(false);

    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [PasswordFocus, setPasswordFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const loginCheck = async () => {
        if (!validEmail && !validPassword) {
            showToast("emailPassword");
            return;
        } else if (!validEmail && validPassword) {
            showToast("email");
            return;
        } else if (validEmail && !validPassword) {
            showToast("password");
            return;
        } else {
            // console.log(email, password)
            setLoading(true);
            let response = await login(email, password);
            if (response === undefined) {
                setLoading(false);
                showToast();
            } else {
                try {
                    await updateKeys();
                    let response = await AuthenticationAPI().isAuthenticated(email);
                    console.log(response.data);
                    console.log(authState.authenticated);
                    if (response.data.authenticated) {
                        setAuthState({
                            accessToken: authState.accessToken,
                            refreshToken: authState.refreshToken,
                            authenticated: true
                        });
                        console.log("Logged In Successfully");
                    } else {
                        navigation.navigate('VerifyToLoginScreen', {
                            PhoneNumber: response.data.phoneNumber,
                            Email: email,
                            Password: password
                        });
                    }
                } catch (err) {
                    console.log("isAuthenticated Error: " + err);
                } finally {
                    setLoading(false);
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
        // <KeyboardAvoidingView style={{ flex: 1 }} behavior={'padding'}>
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
                            secureTextEntry={secureTextEntry}
                            value={password}
                            style={styles.textInput}
                            placeholder="Password"
                        />
                        <TouchableOpacity
                            className={"absolute right-2 top-16 mr-4 mt-4"}
                            onPressIn={() => setSecureTextEntry(false)}
                            onPressOut={() => setSecureTextEntry(true)}
                        >
                            <Image
                                source={icons.eye}
                                className={"w-6 h-6 opacity-50"}
                            />
                        </TouchableOpacity>
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
        // </KeyboardAvoidingView>


    )
}