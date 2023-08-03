import { SafeAreaView } from "react-native-safe-area-context"
import { useEffect, useContext, createContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { View, Image } from "react-native";
import { NativeBaseProvider, Button, Text } from "native-base";
import images from "../../constants/images";
import { COLORS } from "../../constants/theme";
import { VerifyButton } from "../../components/Registration/VerifyToLoginScreen/VerifyButton";
import { useRoute } from "@react-navigation/native";


export function VerifyToLoginScreen() {

    const route = useRoute();

    return (
        <NativeBaseProvider>
            <SafeAreaView className={"flex-1"}>
                <LinearGradient
                    className={"flex-1"}
                    colors={['white', COLORS.primary]}  >
                    <View className="flex-1 my-auto justify-end">

                        <View>
                            <Image
                                className={"w-1/2 h-1/2"}
                                source={images.verifyBaby}
                                style={{
                                    alignSelf: "center",
                                }}
                            />
                            <Text className={"text-center text-xl font-extrabold"} style={{ color: "#477276" }}>
                                Registration Completed Successfully
                            </Text>
                            
                            <Text className={"text-center font-bold"} style={{ color: "#477276" }}>
                                    Verify your phone number
                            </Text>
                            <VerifyButton phoneNumber={route.params?.PhoneNumber || {}}
                                email={route.params?.Email || {}}
                                password={route.params?.Password || {}}/>
                        </View>
                    </View>
                </LinearGradient>
            </SafeAreaView>
        </NativeBaseProvider>
    )
}