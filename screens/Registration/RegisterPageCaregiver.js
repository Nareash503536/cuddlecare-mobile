import { SafeAreaView } from "react-native-safe-area-context"
import { useEffect, useContext, createContext } from "react";
import React, { useState } from "react";
import { View, TouchableOpacity, ActivityIndicator } from "react-native";
import { NativeBaseProvider, Button, Text } from "native-base";
import { Intro } from "../../components/Registration/RegisterPageParent/Intro";
import { CaregiverIcon } from "../../components/Registration/RegisterPageCaregiver/CaregiverIcon";
import { CaregiverForm } from "../../components/Registration/RegisterPageCaregiver/CaregiverForm";
import { ProfileForm } from "../../components/Registration/RegisterPageCaregiver/ProfileForm";
import animation from "../../constants/animations"
import LottieView from 'lottie-react-native';
import { COLORS } from "../../constants/theme";


export const handleNavigateContext = createContext();


export function RegisterPageCaregiver() {

    const [currentComponet, setCurrentComponent] = useState("first");

    const [loading, setLoading] = useState(false);

    const [registrationInfo, setRegistrationInfo] = useState({
        CaregiverName: "",
        CaregiverPhoneNumber: "",
        CaregiverDOB: "",
        CaregiverGender: "",
        CaregiverPassword: "",
        CaregiverEmail: ""
    })


    const Component1 = () => {
        return (
            <>
                <Intro />
                <CaregiverIcon />
            </>
        )

    }

    const Component2 = () => {
        return (
            <>
                <CaregiverForm />
            </>
        )
    }

    const Component3 = () => {
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
                    {
                        loading ?
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                {/* <LottieView source={animation.Spinner} autoPlay loop /> */}
                                <ActivityIndicator size="large" color={COLORS.primary} />
                            </View>
                            :
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
                            </handleNavigateContext.Provider >
                    }
                </View>
            </SafeAreaView>
        </NativeBaseProvider>
    )
}