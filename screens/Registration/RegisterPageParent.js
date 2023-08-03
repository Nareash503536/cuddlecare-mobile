import { SafeAreaView } from "react-native-safe-area-context"
import { useEffect, useContext, createContext } from "react";
import React, { useState } from "react";
import { View, TouchableOpacity, ActivityIndicator } from "react-native";
import { NativeBaseProvider, Button, Text } from "native-base";
import { Intro } from "../../components/Registration/RegisterPageParent/Intro";
import { BabyIcon } from "../../components/Registration/RegisterPageParent/BabyIcon";
import { BabyForm } from "../../components/Registration/RegisterPageParent/BabyForm";
import { ParentForm } from "../../components/Registration/RegisterPageParent/ParentForm";
import { ProfileForm } from "../../components/Registration/RegisterPageParent/ProfileForm";
import LottieView from 'lottie-react-native';
import animation from '../../constants/animations';
import { COLORS } from "../../constants/theme";

export const handleNavigateContext = createContext();


export function RegisterPageParent() {

    const [currentComponet, setCurrentComponent] = useState("first");

    const [loading, setLoading] = useState(false);

    const [registrationInfo, setRegistrationInfo] = useState({
        BabyName: "",
        BabyGender: "",
        BabyDOB: "",
        BabyRelationship: "",
        ParentName: "",
        ParentPhoneNumber: "",
        ParentDOB: "",
        ParentEmail: "",
        ParentPassword: ""
    })

    const Component1 = () => {
        return (
            <>
                <Intro />
                <BabyIcon />
            </>
        )

    }

    const Component2 = () => {
        return (
            <>
                <BabyForm />
            </>
        )
    }

    const Component3 = () => {
        return (
            <>
                <ParentForm />
            </>
        )
    }

    const Component4 = () => {
        return (
            <>
                <ProfileForm />
            </>
        )
    }

    return (
        <NativeBaseProvider>
            <SafeAreaView className={"flex-1"}>
                <View className="flex-1 justify-around align-middle m-5">
                    {loading ?
                            // <LottieView source={animation.Spinner} autoPlay loop />
                            <ActivityIndicator size="large" color={COLORS.primary} />
                        : <>
                            <handleNavigateContext.Provider value={{ setCurrentComponent, setRegistrationInfo, registrationInfo, setLoading }}>


                                {currentComponet === "first" &&
                                    <>
                                        <Component1 />
                                    </>
                                }
                                {currentComponet === "second" &&
                                    <>
                                        <Component2 />
                                    </>
                                }
                                {currentComponet === "third" &&
                                    <>
                                        <Component3 />
                                    </>
                                }
                                {currentComponet === "fourth" &&
                                    <>
                                        <Component4 />
                                    </>
                                }
                            </handleNavigateContext.Provider >
                        </>
                    }
                </View>
            </SafeAreaView>
        </NativeBaseProvider>
    )
}