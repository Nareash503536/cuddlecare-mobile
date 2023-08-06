import { SafeAreaView } from "react-native-safe-area-context"
import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useState, createContext } from "react";
import { ActivityIndicator } from "react-native";
import { View } from "react-native";
import { COLORS } from "../../constants/theme";
import { NativeBaseProvider, Button, Text } from "native-base";
import { AppIntro } from "../../components/Registration/LoginScreen/AppIntro";
import { Form } from "../../components/Registration/LoginScreen/Form";


export const LoadingContext = createContext();

export function LoginScreen() {
    const [loading, setLoading] = useState(false);
    
    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            <NativeBaseProvider>
                <SafeAreaView className={"flex-1"}>
                    {loading ? (
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            {/* <LottieView source={animation.Spinner} autoPlay loop /> */}
                            <ActivityIndicator size="large" color={COLORS.primary} />
                        </View>) : (
                        <LinearGradient
                            className={"flex-1"}
                            colors={['white', COLORS.primary]}  >
                            <View className="flex-1 justify-around align-middle m-5">
                                <AppIntro />
                                <Form />
                            </View>
                        </LinearGradient>
                    )}
                </SafeAreaView>
            </NativeBaseProvider>
        </LoadingContext.Provider>
    )
}