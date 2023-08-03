import { SafeAreaView } from "react-native-safe-area-context"
import { useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { React, useState } from "react";
import { View, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { NativeBaseProvider, Button, Text } from "native-base";
import images from "../../constants/images";
import { COLORS } from "../../constants/theme";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { BASE_URL } from "../../config";
import { AuthContext } from "../../Context/AuthContext";
import { ButtonStyles } from "../../components/Registration/VerifyToLoginScreen/ButtonStyle";
import LottieView from 'lottie-react-native';
import animation from '../../constants/animations';

export function GetStartedScreen() {

    const [loading, setLoading] = useState(false);
    const TOKEN_KEY = "token";
    const route = useRoute();
    const email = route.params?.email || {};
    const password = route.params?.Password || {};

    const { login, authState, setAuthState } = useContext(AuthContext);

    const setToken = async (email, password) => {
        setLoading(true);
        console.log("Email = " + email + " Password = " + password);

        //Only settoken
        let apiURL = BASE_URL + "/login";
        const formData = new FormData();
        formData.append('username', email);
        formData.append('password', password);
        try {
            const response = await axios.post(apiURL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setAuthState({
                token: response.data.accessToken,
                authenticated: false
            })
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
            await SecureStore.setItemAsync(TOKEN_KEY, response.data.accessToken);
            console.log(response.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }

        //Only authenticateUser
        setLoading(true);
        apiURL = BASE_URL + "/setAuthenticated";
        try {
            const response = await axios.post(apiURL, null,
                {
                    params: {
                        email: email
                    }
                });
            console.log(response.data);
            //Set authenticated true
            setAuthState({
                token: authState.token,
                authenticated: true
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }

    }

    return (
        <NativeBaseProvider>
            <SafeAreaView className={"flex-1"}>
                {
                    loading ? 
                        // <LottieView source={animation.Spinner} autoPlay loop /> 
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            {/* <LottieView source={animation.Spinner} autoPlay loop /> */}
                            <ActivityIndicator size="large" color={COLORS.primary} />
                        </View>
                        :
                        <LinearGradient
                            className={"flex-1"}
                            colors={['white', COLORS.primary]}  >
                            <View className="flex-1 my-auto justify-end">

                                <View>
                                    <Image
                                        className={"w-1/2 h-1/2"}
                                        source={images.getStartedBaby}
                                        style={{
                                            alignSelf: "center",
                                        }}
                                    />
                                    <Text className={"text-center text-xl font-extrabold"} style={{ color: "#477276" }}>
                                        Your Profile has been set
                                    </Text>
                                    <Text className={"text-center font-bold"} style={{ color: "#477276" }}>
                                        Contratulations! Your profile
                                    </Text>
                                    <Text className={"text-center font-bold"} style={{ color: "#477276" }}>
                                        setup is complete.
                                    </Text>
                                    <View
                                    >
                                        <TouchableOpacity
                                            className={"flex-row mt-8"}
                                            style={ButtonStyles.Button}
                                            name="next"
                                            onPress={() => setToken(email, password)}
                                        >
                                            <Text className="text-white">
                                                Get started
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </LinearGradient>
                }
            </SafeAreaView>
        </NativeBaseProvider>
    )
}