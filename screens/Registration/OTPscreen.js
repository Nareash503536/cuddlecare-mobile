import { SafeAreaView } from "react-native-safe-area-context"
import React, { useState, useRef, useEffect } from "react";
import { View, Image, Text, Alert, ActivityIndicator } from "react-native";
import { NativeBaseProvider } from "native-base";
import OTPKeyboard from "react-native-otp-keyboard";
import OTPTextInput from "react-native-otp-textinput";
import { COLORS } from "../../constants/theme";
import icons from "../../constants/icons";
import { useRoute } from "@react-navigation/native";
import { getApp, initializeApp } from 'firebase/app';
import firebase from 'firebase/app';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import fbConfig from '../../setup';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import animation from '../../constants/animations';

export function OTPscreen() {

    const [loading, setLoading] = useState(false);

    let navigation = useNavigation();

    const [verificationId, setVerificationID] = useState('');

    try {
        initializeApp(fbConfig);
    } catch (error) {
        console.log("Initializing error ", error);
    }

    const recaptchaVerifier = useRef(null);

    const app = getApp();
    const auth = getAuth(app);


    if (!app?.options || Platform.OS === 'web') {
        throw new Error(
            'This example only works on Android or iOS, and requires a valid Firebase config.'
        );
    }

    useEffect(() => {

        handleSendVerificationCode();
    }, []);

    const [value, setValue] = useState("");
    const route = useRoute();
    let otpInput = useRef(null);
    const receivedPhoneNumber = route.params?.phoneNumber || {};
    const phoneNumber = receivedPhoneNumber.startsWith("0") ? receivedPhoneNumber.slice(1) : receivedPhoneNumber;
    const formattedPhoneNumber = `+94${phoneNumber}`;
    console.log(formattedPhoneNumber);
    const Email = route.params?.email || {};
    const Password = route.params?.password || {};
    const attemptInvisibleVerification = false;
    const firebaseConfig = app ? app.options : undefined;


    const handleSendVerificationCode = async () => {
        setLoading(true);
        try {
            const phoneProvider = new PhoneAuthProvider(auth); // initialize the phone provider.
            const verificationId = await phoneProvider.verifyPhoneNumber(
                formattedPhoneNumber,
                recaptchaVerifier.current
            ); // get the verification id
            setVerificationID(verificationId); // set the verification id
            console.log('Success : Verification code has been sent to your phone'); // If Ok, show message.
        } catch (error) {
            Alert.alert("Invalid Phone Number", "Please enter a valid phone number");
            console.log("Send Verification error " + error); // show the error
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyVerificationCode = async () => {
        setLoading(true);
        try {
            const credential = PhoneAuthProvider.credential(verificationId, value); // get the credential
            await signInWithCredential(auth, credential); // verify the credential
            // navigation.navigate("Login"); // navigate to the welcome screen
            console.log('Success: Phone authentication successful');
            navigation.navigate("GetStartedScreen", {
                email: Email,
                Password: Password
            });
        } catch (error) {
            console.log(error.message); // show the error.
        } finally {
            setLoading(false);
        }
    }



    return (

            <NativeBaseProvider>
                <FirebaseRecaptchaVerifierModal
                    ref={recaptchaVerifier}
                    firebaseConfig={firebaseConfig}
                />
                {
                    verificationId && (
                        <SafeAreaView className={"flex-1"}>
                            {
                                loading ?
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                        {/* <LottieView source={animation.Spinner} autoPlay loop /> */}
                                        <ActivityIndicator size="large" color={COLORS.primary} />
                                    </View> :
                                    <View className="flex-1 justify-between">
                                        <View className="mb-10">
                                            <Text className={"text-[#477276] text-3xl text-center font-bold mt-10"}>
                                                Verify your phone number
                                            </Text>
                                            <Text className="text-[#477276] text-center">
                                                Enter your OTP code here
                                            </Text>
                                        </View>
                                        <OTPTextInput
                                            showSoftInputOnFocus={false}
                                            ref={otpInput}
                                            inputCount={6}
                                            tintColor={COLORS.secondary}
                                            containerStyle={{
                                                marginBottom: 20,
                                                marginLeft: 20,
                                                marginRight: 20
                                            }}
                                            textInputStyle={{
                                                borderWidth: 2,
                                                borderRadius: 50,
                                                height: 40,
                                                width: 40,
                                                backgroundColor: COLORS.primary,
                                                color: COLORS.tertiary,
                                            }}
                                            handleTextChange={(text) => setValue(text)}
                                        >
                                        </OTPTextInput>
                                        <View className={"flex-1 justify-center align-middle"}>
                                            <Text className={"text-center"}>
                                                Didn't you receive any code?
                                            </Text>
                                            <Text className={"text-center  font-extrabold text-lg text-red-500"}
                                                onPress={() => handleSendVerificationCode()}
                                            >
                                                Resend new code
                                            </Text>
                                        </View>

                                        <OTPKeyboard
                                            backspaceComponent={
                                                <Image
                                                    className={"w-6 h-6 mx-3"}
                                                    source={icons.backspace}
                                                    resizeMode="stretch"
                                                />
                                            }
                                            submitComponent={
                                                <Image
                                                    className={"w-6 h-6 mx-3 m-"}
                                                    source={icons.send}
                                                    resizeMode="stretch"
                                                />
                                            }
                                            keyboardStyle={{
                                                padding: 20,
                                                borderRadius: 10,
                                            }}
                                            digitBoxStyle={{
                                                borderRadius: 10,
                                                margin: 5
                                            }}
                                            keyboardBackgroundColor="#BADEE3"
                                            digitBoxBackgroundColor={"#94CCD2"}
                                            digitColor={"#fff"}
                                            onSubmitPress={() => handleVerifyVerificationCode()}
                                            onPress={(key) => otpInput.current.setValue(key)}
                                        />

                                    </View>
                            }

                        </SafeAreaView>
                    )
                }
                {
                    attemptInvisibleVerification &&
                    (
                        <SafeAreaView>
                            <View className="flex-1 justify-center align-middle">
                                <FirebaseRecaptchaBanner />
                            </View>
                        </SafeAreaView>
                    )

                }
            </NativeBaseProvider>
    )
}