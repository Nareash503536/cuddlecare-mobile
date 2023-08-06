import { SafeAreaView } from "react-native-safe-area-context"
import { useEffect, useContext, createContext } from "react";
import React, { useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { NativeBaseProvider, Button, Text } from "native-base";
import { useNavigation } from "@react-navigation/native";
import images from "../../constants/images";
import { styles } from "../../components/Registration/RegisterPageParent/textInputStyle";
import { COLORS } from "../../constants/theme";

export function SelectUserPage() {

    const navigation = useNavigation();

    return (
        <NativeBaseProvider>
            <SafeAreaView className={"flex-1 mt-6"}>
                <Text className={"text-center text-xl font-bold"} style={{ color: COLORS.tertiary }}>
                    Select a user to register
                </Text>
                <View className={"flex "}>
                    <TouchableOpacity 
                        className={"p-2 ml-0 mt-14 mr-14 h-56 rounded-r-full justify-center align-middle"}
                        onPress={() => navigation.navigate("RegisterPageParent")}
                        style={{ backgroundColor: COLORS.cardBackground ,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.25,
                            shadowRadius: 4,
                            elevation: 4,
                        }}
                    >
                        <Text className={"text-center text-3xl"} style={{color: COLORS.tertiary}}>
                            Parent
                        </Text>
                        <Image 
                            source={images.parent}
                            resizeMode="contain"
                            className={"h-28 w-52 mx-auto"}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        className={"p-2 mr-0 mt-14 ml-14 h-56 rounded-l-full justify-center align-middle"}
                        onPress={() => navigation.navigate("RegisterPageCaregiver")}
                        style={{
                            backgroundColor: COLORS.cardBackground, 
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.25,
                            shadowRadius: 4,
                            elevation: 4,
                        }}
                    >
                        <Text className={"text-center text-3xl"} style={{ color: COLORS.tertiary }}>
                            Caregiver
                        </Text>
                        <Image
                            source={images.caregiver}
                            resizeMode="contain"
                            className={"h-32 w-48 mx-auto"}
                            style={{ backgroundColor: COLORS.cardBackground }}
                        />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </NativeBaseProvider>
    )
}