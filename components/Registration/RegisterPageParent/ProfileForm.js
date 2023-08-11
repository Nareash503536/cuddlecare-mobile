import { View, Image, Text, TouchableOpacity, TextInput, ActivityIndicator, StyleSheet, Alert } from "react-native";
import images from "../../../constants/images";
import icons from "../../../constants/icons";
import { styles } from "./textInputStyle";
import { ButtonStyles } from "./ButtonStyle";
import { Formik } from 'formik';
import { useEffect, React, useRef } from "react";
import { handleNavigateContext } from "../../../screens/Registration/RegisterPageParent";
import { useContext, useState } from "react";
import Toast from 'react-native-toast-message';
import { useNavigation } from "@react-navigation/native";
import AuthenticationAPI from "../../../Api/AuthenticationAPI";
import { AuthContext } from "../../../Context/AuthContext";
import { ALERT_TYPE, Dialog, AlertNotificationRoot } from 'react-native-alert-notification';
import { SafeAreaView } from "react-native-safe-area-context";

export function ProfileForm() {

    const Navigation = useNavigation();
    const USER_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$_!%*#?&])[A-Za-z\d@$!%*_#?&]{8,}$/;

    const { updateKeys } = useContext(AuthContext);
    const { setRegistrationInfo, registrationInfo, setLoading } = useContext(handleNavigateContext);

    const [ParentAdditionalInfo, setParentAdditionalInfo] = useState({
        ParentEmail: "",
        ParentPassword: "",
        ParentConfirmPassword: ""
    })

    const [validEmail, setValidEmail] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [secureTextEntryConfirmPassword, setSecureTextEntryConfirmPassword] = useState(true);
    const [validPassword, setValidPassword] = useState(false);
    const [validConfirmPassword, setValidConfirmPassword] = useState(false);

    const showToast = (condition) => {

        let text2 = '';
        if (condition === "emailPassword") {
            text2 = "Please enter a valid email and password";
        } else if (condition === "email") {
            text2 = "Please enter a valid email";
        } else if (condition === "password") {
            text2 = "Please enter a valid password";
        } else if (condition === "passwordMatch") {
            text2 = "Password does not match";
        }
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: text2
        });
    }

    const sendRegistrationInfo = async () => {
        if (!validEmail && !validPassword) {
            showToast("emailPassword");
            return;
        } else if (!validEmail && validPassword) {
            showToast("email");
            return;
        } else if (validEmail && !validPassword) {
            showToast("password");
            return;
        } else if (ParentAdditionalInfo.ParentPassword !== ParentAdditionalInfo.ParentConfirmPassword) {
            showToast("passwordMatch");
            return;
        }
        setRegistrationInfo({
            ...registrationInfo,
            ParentEmail: ParentAdditionalInfo.ParentEmail,
            ParentPassword: ParentAdditionalInfo.ParentPassword
        });
        console.log(registrationInfo);
        console.log(ParentAdditionalInfo.ParentEmail);
        console.log(ParentAdditionalInfo.ParentPassword);
        try {
            setLoading(true);
            let response = await AuthenticationAPI().registerParent(
                registrationInfo.BabyDOB,
                registrationInfo.BabyGender,
                registrationInfo.BabyName,
                registrationInfo.BabyRelationship,
                registrationInfo.ParentName,
                registrationInfo.ParentPhoneNumber,
                registrationInfo.ParentDOB,
                ParentAdditionalInfo.ParentEmail,
                ParentAdditionalInfo.ParentPassword);
            console.log(response.data);
            if (response.data.error === true) {
                console.log(response.data.error);
                setLoading(false);
                Dialog.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Registration Failed',
                    textBody: response.data.result + ". Try different email or username",
                    button: 'Close',

                })
            } else {
                setLoading(false);
                Dialog.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Success',
                    textBody: 'Registration Completed Successfully',
                    button: 'Continue',
                    onPressButton: () => Navigation.navigate("VerifyToLoginScreen", {
                        PhoneNumber: registrationInfo.ParentPhoneNumber,
                        Email: ParentAdditionalInfo.ParentEmail,
                        Password: ParentAdditionalInfo.ParentPassword
                    })
                })
                }
        } catch (error) {
                console.log(error.message);
                Alert.alert("Registration Failed", "Try different email or username");
            } finally {
                setLoading(false);
            }
        }

    useEffect(() => {
            const result = USER_REGEX.test(ParentAdditionalInfo.ParentEmail);
            setValidEmail(result);
        }, [ParentAdditionalInfo.ParentEmail])

        useEffect(() => {
            const result = PASSWORD_REGEX.test(ParentAdditionalInfo.ParentPassword);
            setValidPassword(result);
        }, [ParentAdditionalInfo.ParentPassword]);

        useEffect(() => {
            const result = PASSWORD_REGEX.test(ParentAdditionalInfo.ParentConfirmPassword);
            setValidConfirmPassword(result);
        }, [ParentAdditionalInfo.ParentConfirmPassword]);
        return (
            <AlertNotificationRoot>
                <SafeAreaView className={"flex-1 justify-around"}>

                    <View>
                        <Text className={"text-center text-3xl font-bold"}>
                            Registration
                        </Text>
                    </View>
                    <View>
                        <Text className={"text-[#477276] text-xl text-center font-bold"}>
                            Set your pofile
                        </Text>
                        <Formik
                            initialValues={{}}>
                            <View>

                                <TextInput
                                    keyboardType='email-address'
                                    style={styles.textInput}
                                    placeholder="Email"
                                    value={ParentAdditionalInfo.ParentEmail}
                                    onChangeText={(ParentEmail) => setParentAdditionalInfo({ ...ParentAdditionalInfo, ParentEmail: ParentEmail })}
                                />

                                <TextInput
                                    keyboardType="default"
                                    style={styles.textInput}
                                    placeholder="Password"
                                    secureTextEntry={secureTextEntry}
                                    value={ParentAdditionalInfo.ParentPassword}
                                    onChangeText={(ParentPassword) => setParentAdditionalInfo({ ...ParentAdditionalInfo, ParentPassword: ParentPassword })}
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

                                <TextInput
                                    keyboardType="default"
                                    style={styles.textInput}
                                    placeholder="Confirm Password"
                                    secureTextEntry={secureTextEntryConfirmPassword}
                                    value={ParentAdditionalInfo.ParentConfirmPassword}
                                    onChangeText={(ParentConfirmPassword) => setParentAdditionalInfo({ ...ParentAdditionalInfo, ParentConfirmPassword: ParentConfirmPassword })}
                                />
                                <TouchableOpacity
                                    className={"absolute right-2 bottom-5 mr-4 mt-4"}
                                    onPressIn={() => setSecureTextEntryConfirmPassword(false)}
                                    onPressOut={() => setSecureTextEntryConfirmPassword(true)}
                                >
                                    <Image
                                        source={icons.eye}
                                        className={"w-6 h-6 opacity-50"}
                                    />
                                </TouchableOpacity>

                            </View>
                        </Formik>
                    </View>

                    <TouchableOpacity
                        className={"flex-row mt-8"}
                        style={ButtonStyles.Button}
                        name="next"
                        onPress={sendRegistrationInfo}
                        disabled={ParentAdditionalInfo.ParentEmail === "" ||
                            ParentAdditionalInfo.ParentPassword === "" ||
                            ParentAdditionalInfo.ParentConfirmPassword === "" ? true : false
                        }
                    >
                        <Text className="text-white">
                            Submit
                        </Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </AlertNotificationRoot>
        )
    }

    const spinnerStyles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
    });