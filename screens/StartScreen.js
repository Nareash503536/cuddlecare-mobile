import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {COLORS} from "../constants/theme";
import images from "../constants/images";
import {useNavigation} from "@react-navigation/native";
import React, {useEffect} from "react";
import {Image, View} from "react-native";

export function StartScreen() {
    let navigation = useNavigation();
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("AppOverview");
        },2000);
    }, []);

    return (
        <SafeAreaView className={"flex-1"}>
            <LinearGradient className={"flex-1"} colors={['white', COLORS.primary]}>
                <View className={"flex-1 justify-center bg-gradient from-[#FFFFFF] to-[#000000]"}>
                    <Image
                        source={images.appName}
                        resizeMode="contain"
                        className={"mx-auto w-1/2"}/>
                    <Image
                        source={images.logo}
                        resizeMode="contain"
                        className={"w-80 h-80 mx-auto"}/>
                </View>
            </LinearGradient>
        </SafeAreaView>
    )
}
