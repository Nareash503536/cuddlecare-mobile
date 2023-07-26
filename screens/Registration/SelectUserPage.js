import { SafeAreaView } from "react-native-safe-area-context"
import { useEffect, useContext, createContext } from "react";
import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { NativeBaseProvider, Button, Text } from "native-base";
import { Intro } from "../../components/Registration/RegisterPage/Intro";
import { BabyIcon } from "../../components/Registration/RegisterPage/BabyIcon";
import { BabyForm } from "../../components/Registration/RegisterPage/BabyForm";
import { ParentForm } from "../../components/Registration/RegisterPage/ParentForm";
import { ProfileForm } from "../../components/Registration/RegisterPage/ProfileForm";
import { NextButton } from "../../components/Registration/RegisterPage/NextButton";
import { RegisterButton } from "../../components/Registration/RegisterPage/RegisterButton";
import { styles } from "../../components/Registration/RegisterPage/ButtonStyle";

export const handleNavigateContext = createContext();

export function SelectUserPage() {

    return (
        <NativeBaseProvider>
            <SafeAreaView className={"flex-1"}>
                <View>
                    <TouchableOpacity>
                        <Text>
                            Parent
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text>
                            Caregiver
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </NativeBaseProvider>
    )
}