import {Text, View, ActivityIndicator } from "react-native";
import React, { createContext, useState } from "react";
import UserInfo from "../../components/UserProfile/ProfileScreen/UserInfo";
import { SafeAreaView } from "react-native-safe-area-context";
import {COLORS} from "../../constants/theme"; 
import InfoCard from "../../components/UserProfile/ProfileScreen/InfoCard";

export const ProfileContext = createContext();

export default function Profile(){

    const [loading, setLoading] = useState(false);

    const ViewProfile = () => {
        return(
            <View className="top-0 pb-20">
                <Text
                    className={"text-4xl font-bold text-left"}
                    style={{
                        fontSize: 30,
                        fontWeight: "bold",
                        color: "#fff",
                    }}
                >
                    Profile
                </Text>
            </View>
        )   
    }

    return(
        <ProfileContext.Provider value={{
            setLoading
        }}>
            {
                loading ?
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        {/* <LottieView source={animation.Spinner} autoPlay loop /> */}
                        <ActivityIndicator size="large" color={COLORS.primary} />
                    </View> :
            <SafeAreaView
                className={"h-full flex-1 justify-center items-center"}
                style={{
                    // backgroundColor: COLORS.primary,
                    width: "100%",
                    borderColor: '#000',
                }}
            >
                <View className={"absolute top-0"}
                    style={{
                        backgroundColor: COLORS.primary,
                        width: "100%",
                        height: "50%",
                        borderBottomLeftRadius: 100,
                        borderBottomRightRadius: 100,
                    }}
                >
                </View>
                <ViewProfile />
                <UserInfo />
                <InfoCard />
            </SafeAreaView>
}
        </ProfileContext.Provider>
    )
}