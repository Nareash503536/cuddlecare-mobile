import { SafeAreaView } from "react-native-safe-area-context"
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text } from "react-native";
import { COLORS } from "../../constants/theme";
import { Title } from "../../components/Registration/Title";
import { Buttons } from "../../components/Registration/Buttons";
import { ImageSlider } from "../../components/Registration/ImageSlider";
import { NativeBaseProvider } from "native-base";

export function RegisterScreen() {
    return (
        <NativeBaseProvider>
            <SafeAreaView className={"flex-1"}>
                <LinearGradient
                    className={"flex-1"}
                    colors={['white', COLORS.primary]}  >
                    <View className="flex-1 flex-col justify-center align-middle m-5"
                        style={
                            {
                                borderColor: "black",
                                borderWidth: 1
                            }
                        }>
                        <Title />
                        <ImageSlider />
                        <Buttons />
                    </View>
                </LinearGradient>
            </SafeAreaView>
        </NativeBaseProvider>  
    )
}