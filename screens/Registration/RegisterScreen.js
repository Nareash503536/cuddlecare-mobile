import { SafeAreaView } from "react-native-safe-area-context"
import { LinearGradient } from "expo-linear-gradient";
import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import { COLORS } from "../../constants/theme";
import { Title } from "../../components/Registration/RegisterScreeen/Title";
import { Buttons } from "../../components/Registration/RegisterScreeen/Buttons";
import { ImageSlider } from "../../components/Registration/RegisterScreeen/ImageSlider";
import { NativeBaseProvider } from "native-base";

export function RegisterScreen() {
    return (
        <NativeBaseProvider>
            <SafeAreaView className={"flex-1"}>
                <LinearGradient
                    className={"flex-1"}
                    colors={['white', COLORS.primary]}  >
                    <View className="flex-1 justify-around align-middle m-5">
                        <Title
                        />
                        <ImageSlider
                        />
                        <Buttons
                        />
                    </View>
                </LinearGradient>
            </SafeAreaView>
        </NativeBaseProvider>
    )
}