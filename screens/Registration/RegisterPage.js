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


export function RegisterPage() {

    const [currentComponet, setCurrentComponent] = useState("first"); 

    const [registrationInfo, setRegistrationInfo] = useState({
        BabyName: "",
        BabyGender: "",
        BabyDOB: null,
        BabyRelationship: null,
        ParentName: null,
        ParentPhoneNumber: null,
        ParentDOB: null,
        ParentEmail: null,
        ParentPassword: null,
        ParentConfirmPassword: null
    })

    const [BabyName, setBabyName] = useState("");

    const handleNavigate = () => {
        if (currentComponet === "first") {
            setCurrentComponent("second");
        } else if (currentComponet === "second") {
            setCurrentComponent("third");
        } else if (currentComponet === "third") {
            setCurrentComponent("fourth");
        } else if (currentComponet === "fourth") {
            setCurrentComponent("first");
        }
    }


    useEffect(() => {
        console.log(currentComponet);
    }, [currentComponet])
 
    const Component1 =() => {
        return(
            <>
                <Intro />
                <BabyIcon />
            </>
        )
        
    }

    const Component2 = () => {
        return(
            <>
                <BabyForm />
            </>
        )
    }

    const Component3 = () => {
        return(
            <>
                <ParentForm />
            </>
        )
    }

    const Component4 = () => {
        return(
            <>
                <ProfileForm />
            </>
        )
    }

    const Component5 = () => {
        return (
            <>
                <NextButton />
            </>
        )
    }

    const Component6 = () => {
        return (
            <>
                <RegisterButton />
            </>
        )
    }

    

    return (
        <NativeBaseProvider>
            <SafeAreaView className={"flex-1"}>
                    <View className="flex-1 justify-around align-middle m-5">
                    <handleNavigateContext.Provider value={{ setCurrentComponent, currentComponet, handleNavigate, setRegistrationInfo, registrationInfo, BabyName, setBabyName }}>
                            {currentComponet === "first" && 
                                <>
                                    <Component1 /> 
                                    <Component5 />
                                </>
                            }
                            {currentComponet === "second" &&
                                <>
                                    <Component2 />
                                    <Component5 />
                                </>
                            }
                            {currentComponet === "third" &&
                                <>
                                    <Component3 />
                                    <Component5 />
                                </>
                            }
                            {currentComponet === "fourth" &&
                                <>
                                    <Component4 />
                                    <Component6 />
                                </>
                            }
                        </handleNavigateContext.Provider >
                    </View>
            </SafeAreaView>
        </NativeBaseProvider>
    )
}