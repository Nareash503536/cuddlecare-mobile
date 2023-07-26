import { SafeAreaView } from "react-native-safe-area-context"
import { useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { View } from "react-native";
import { COLORS } from "../../constants/theme";
import { NativeBaseProvider, Button, Text } from "native-base";
import { AppIntro } from "../../components/Registration/LoginScreen/AppIntro";
import { Form } from "../../components/Registration/LoginScreen/Form";
import {AuthContext} from "../../Context/AuthContext";

export function LoginScreen() {
    return (
        <NativeBaseProvider>
            <SafeAreaView className={"flex-1"}>
                <LinearGradient
                    className={"flex-1"}
                    colors={['white', COLORS.primary]}  >
                    <View className="flex-1 justify-around align-middle m-5">
                        <AppIntro/>
                        <Form />
                    </View>
                </LinearGradient>
            </SafeAreaView>
        </NativeBaseProvider>
    )
}