import { View, Text, StyleSheet, TextInput, Button, ActivityIndicator } from 'react-native';
import { React, useState, useRef } from 'react';
import { getApp, initializeApp } from 'firebase/app';
import firebase from 'firebase/app';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import fbConfig from '../../setup';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import animation from '../../constants/animations';
import { COLORS } from '../../constants/theme';


export function CheckOTP() {

    const [loading, setLoading] = useState(false);

    try {
        initializeApp(fbConfig);
    } catch (error) {
        console.log("Initializing error ", error);
    }

    const app = getApp();
    const auth = getAuth(app);


    if (!app?.options || Platform.OS === 'web') {
        throw new Error(
            'This example only works on Android or iOS, and requires a valid Firebase config.'
        );
    }


    const recaptchaVerifier = useRef(null);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationId, setVerificationID] = useState('');
    const [verificationCode, setVerificationCode] = useState('');


    const firebaseConfig = app ? app.options : undefined;
    const [info, setInfo] = useState("");
    const attemptInvisibleVerification = false;

    const handleSendVerificationCode = async () => {
        setLoading(true);
        try {
            const phoneProvider = new PhoneAuthProvider(auth); // initialize the phone provider.
            const verificationId = await phoneProvider.verifyPhoneNumber(
                phoneNumber,
                recaptchaVerifier.current
            ); // get the verification id
            setVerificationID(verificationId); // set the verification id
            setInfo('Success : Verification code has been sent to your phone'); // If Ok, show message.
        } catch (error) {
            setInfo(`Error : ${error.message}`); // show the error
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyVerificationCode = async () => {
        setLoading(true);
        try {
            const credential = PhoneAuthProvider.credential(verificationId, verificationCode); // get the credential
            await signInWithCredential(auth, credential); // verify the credential
            setInfo('Success: Phone authentication successful'); // if OK, set the message
            navigation.navigate("Home"); // navigate to the welcome screen
        } catch (error) {
            setInfo(`Error : ${error.message}`); // show the error.
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {
                loading ? (
                    <View style={styles.container}>
                        {/* <LottieView source={animation.Spinner} autoPlay loop /> */}
                        <ActivityIndicator size="large" color={COLORS.primary} />
                    </View>) : (
                    <View style={styles.container}>

                        <FirebaseRecaptchaVerifierModal
                            ref={recaptchaVerifier}
                            firebaseConfig={firebaseConfig}
                        />
                        {
                            info && <Text style={styles.text}>{info}</Text>
                        }

                        { // show the phone number input field when verification id is not set.
                            !verificationId && (
                                <View>
                                    <Text style={styles.text}>Enter the phone number</Text>

                                    <TextInput
                                        placeholder='+2547000000'
                                        autoFocus
                                        autoCompleteType='tel'
                                        keyboardType='phone-pad'
                                        textContentType='telephoneNumber'
                                        onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
                                    />

                                    <Button
                                        onPress={() => handleSendVerificationCode()}
                                        title="Send Verification Code"
                                        disabled={!phoneNumber}
                                    />
                                </View>
                            )

                        }

                        { // if verification id exists show the confirm code input field.
                            verificationId && (
                                <View>
                                    <Text style={styles.text}>Enter the verification code</Text>

                                    <TextInput
                                        editable={!!verificationId}
                                        placeholder="123456"
                                        onChangeText={setVerificationCode}
                                    />

                                    <Button
                                        title="Confirm Verification Code"
                                        disabled={!verificationCode}
                                        onPress={() => handleVerifyVerificationCode()}
                                    />
                                </View>
                            )
                        }

                        {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
                    </View>
                )
            }
        </>


    )
}

const styles = StyleSheet.create({
    text: {
        color: "#aaa"
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})



