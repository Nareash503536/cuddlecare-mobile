import {React, useContext} from "react";
import { Navigation } from "./navigation";
import { NativeBaseProvider } from "native-base";
import Toast from 'react-native-toast-message';
import { AuthContext } from "../Context/AuthContext";
import { ActivityIndicator, View, Text } from "react-native";
import {AuthStack} from "./AuthStack";
import { styled } from "nativewind";
import LottieView from 'lottie-react-native';
import animation from '../constants/animations';
import { COLORS } from "../constants/theme";


const toastConfig = {
    error: ({ text1, text2}) => (
        <View style={{
            backgroundColor: "#fee4e3", 
            margin: 10,
            padding: 10,
            width: "90%",
            borderRadius: 10,
            alignContent: "center",
            borderBottomColor: "#c6494b",
            flexDirection: "column",
            borderBottomWidth: 4,
            }}>
            <Text style = {{
                fontWeight: "bold",
            }}>
                {text1}
            </Text>
            <Text>
                {text2}
            </Text>
        </View>
    )
};

const AppNav = () => {
    const { isLoading, authState} = useContext(AuthContext);


    if(isLoading){
        return(
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                {/* <LottieView source={animation.Spinner} autoPlay loop /> */}
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        )
    }

    return (
        <NativeBaseProvider>
            {authState?.authenticated == true ? <Navigation /> : <AuthStack />}
            <Toast config={toastConfig}/>
        </NativeBaseProvider>
    )
}

export default AppNav;

