import { View, Image, Text, TouchableOpacity, TextInput, ActivityIndicator, StyleSheet, Alert } from "react-native";
import images from "../../../constants/images";
import { styles } from "./textInputStyle";
import { ButtonStyles } from "./ButtonStyle";
import {Button, AlertDialog} from "native-base";
import { Formik } from 'formik';
import { useEffect, React, useRef } from "react";
import { handleNavigateContext } from "../../../screens/Registration/RegisterPageParent";
import { useContext, useState } from "react";
import Toast from 'react-native-toast-message';
import axios from "axios";
import { BASE_URL } from "../../../config";
import Communication from "react-native-communications";
import { useNavigation } from "@react-navigation/native";


export function ProfileForm() {

    const Navigation = useNavigation();
    const USER_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$_!%*#?&])[A-Za-z\d@$!%*_#?&]{8,}$/;

    const { setRegistrationInfo, registrationInfo, setLoading } = useContext(handleNavigateContext);

    const [ParentAdditionalInfo, setParentAdditionalInfo] = useState({
        ParentEmail: "",
        ParentPassword: "",
        ParentConfirmPassword: ""
    })
   
    const [validEmail, setValidEmail] = useState(false);
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

    const sendRegistrationInfo = async() => {
        setLoading(true);
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
        let API_URL = BASE_URL + "/register/parent";
        try {
            setLoading(true);
            let response = await axios.post(API_URL, null, {
                params: {
                    BabyDOB:registrationInfo.BabyDOB,
                    BabyGender:registrationInfo.BabyGender,
                    BabyName:registrationInfo.BabyName,
                    BabyRelationship:registrationInfo.BabyRelationship,
                    ParentName:registrationInfo.ParentName,
                    ParentPhoneNumber:registrationInfo.ParentPhoneNumber,
                    ParentDOB:registrationInfo.ParentDOB,
                    ParentEmail:ParentAdditionalInfo.ParentEmail,
                    ParentPassword:ParentAdditionalInfo.ParentPassword
                }
            });
            console.log(response.data);
            Navigation.navigate("VerifyToLoginScreen", { PhoneNumber: registrationInfo.ParentPhoneNumber,
                                                        Email: ParentAdditionalInfo.ParentEmail,
                                                        Password: ParentAdditionalInfo.ParentPassword
                                                    });
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
        <>
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
                            secureTextEntry={true}
                            value={ParentAdditionalInfo.ParentPassword}
                            onChangeText={(ParentPassword) => setParentAdditionalInfo({ ...ParentAdditionalInfo, ParentPassword: ParentPassword })}
                        />
                        <TextInput
                            keyboardType="default"
                            style={styles.textInput}
                            placeholder="Confirm Password"
                            secureTextEntry={true}
                            value={ParentAdditionalInfo.ParentConfirmPassword}
                            onChangeText={(ParentConfirmPassword) => setParentAdditionalInfo({ ...ParentAdditionalInfo, ParentConfirmPassword: ParentConfirmPassword })}
                        />

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
        </>
    )
}

const spinnerStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});