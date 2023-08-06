import { View, Image, Text, TouchableOpacity, TextInput, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { styles } from "./textInputStyle";
import icons from "../../../constants/icons";
import { ButtonStyles } from "./ButtonStyle";
import { Formik } from 'formik';
import { useEffect } from "react";
import { handleNavigateContext } from "../../../screens/Registration/RegisterPageCaregiver";
import { useContext, useState } from "react";
import Toast from 'react-native-toast-message';
import { useNavigation } from "@react-navigation/native";
import AuthenticationAPI from "../../../Api/AuthenticationAPI";
import { AuthContext } from "../../../Context/AuthContext";
import { ALERT_TYPE, Dialog, AlertNotificationRoot } from 'react-native-alert-notification';
import { SafeAreaView } from "react-native-safe-area-context";


export function ProfileForm() {

    let Navigation = useNavigation();

    const USER_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$_!%*#?&])[A-Za-z\d@$!%*_#?&]{8,}$/;

    const { updateKeys } = useContext(AuthContext);
    const { setRegistrationInfo, registrationInfo, setLoading } = useContext(handleNavigateContext);

    const [CaregiverAdditionalInfo, setCaregiverAdditionalInfo] = useState({
        CaregiverEmail: "",
        CaregiverPassword: "",
        CaregiverConfirmPassword: ""
    })

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
        } else if (CaregiverAdditionalInfo.CaregiverPassword !== CaregiverAdditionalInfo.CaregiverConfirmPassword) {
            showToast("passwordMatch");
            return;
        }
        setRegistrationInfo({
            ...registrationInfo,
            CaregiverEmail: CaregiverAdditionalInfo.CaregiverEmail,
            CaregiverPassword: CaregiverAdditionalInfo.CaregiverPassword
        });
        console.log(registrationInfo);
        console.log(CaregiverAdditionalInfo.CaregiverEmail);
        console.log(CaregiverAdditionalInfo.CaregiverPassword);

        try {
            setLoading(true);
            let response = await AuthenticationAPI().registerCaregiver(
                CaregiverAdditionalInfo.CaregiverEmail,
                CaregiverAdditionalInfo.CaregiverPassword,
                registrationInfo.CaregiverName,
                registrationInfo.CaregiverPhoneNumber,
                registrationInfo.CaregiverDOB,
                registrationInfo.CaregiverGender);
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
                        PhoneNumber: registrationInfo.CaregiverPhoneNumber,
                        Email: CaregiverAdditionalInfo.CaregiverEmail,
                        Password: CaregiverAdditionalInfo.CaregiverPassword
                    })
                })
            }
        } catch (error) {
            Alert.alert("Registration Failed", ". Try different email.");
            console.log(error);
        }  finally {
            setLoading(false);
        }
    }

    const [validEmail, setValidEmail] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [secureTextEntryConfirmPassword, setSecureTextEntryConfirmPassword] = useState(true);
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

    useEffect(() => {
        const result = USER_REGEX.test(CaregiverAdditionalInfo.CaregiverEmail);
        setValidEmail(result);
    }, [CaregiverAdditionalInfo.CaregiverEmail])

    useEffect(() => {
        const result = PASSWORD_REGEX.test(CaregiverAdditionalInfo.CaregiverPassword);
        setValidPassword(result);
    }, [CaregiverAdditionalInfo.CaregiverPassword]);

    useEffect(() => {
        const result = PASSWORD_REGEX.test(CaregiverAdditionalInfo.CaregiverConfirmPassword);
        setValidConfirmPassword(result);
    }, [CaregiverAdditionalInfo.CaregiverConfirmPassword]);

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
                                value={CaregiverAdditionalInfo.CaregiverEmail}
                                onChangeText={(CaregiverEmail) => setCaregiverAdditionalInfo({ ...CaregiverAdditionalInfo, CaregiverEmail: CaregiverEmail })}
                            />
                            <TextInput
                                keyboardType="default"
                                style={styles.textInput}
                                placeholder="Password"
                                secureTextEntry={secureTextEntry}
                                value={CaregiverAdditionalInfo.CaregiverPassword}
                                onChangeText={(CaregiverPassword) => setCaregiverAdditionalInfo({ ...CaregiverAdditionalInfo, CaregiverPassword: CaregiverPassword })}
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
                                value={CaregiverAdditionalInfo.CaregiverConfirmPassword}
                                onChangeText={(CaregiverConfirmPassword) => setCaregiverAdditionalInfo({ ...CaregiverAdditionalInfo, CaregiverConfirmPassword: CaregiverConfirmPassword })}
                            />
                            <TouchableOpacity
                                className={"absolute right-2 bottom-4 mr-4 mt-4"}
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
                    onPress={() => sendRegistrationInfo()}
                    disabled={CaregiverAdditionalInfo.CaregiverEmail === "" ||
                        CaregiverAdditionalInfo.CaregiverPassword === "" ||
                        CaregiverAdditionalInfo.CaregiverConfirmPassword === "" ? true : false}
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