import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { LoginScreen } from "../screens/Registration/LoginScreen";
import { RegisterScreen } from "../screens/Registration/RegisterScreen";
import { RegisterPageParent } from "../screens/Registration/RegisterPageParent";
import { SelectUserPage } from "../screens/Registration/SelectUserPage";
import { RegisterPageCaregiver } from "../screens/Registration/RegisterPageCaregiver";
import { OTPscreen } from "../screens/Registration/OTPscreen";
import { GetStartedScreen } from "../screens/Registration/GetStartedScreen";
import { VerifyToLoginScreen } from "../screens/Registration/VerifyToLoginScreen";
import { CheckOTP } from "../screens/Registration/CheckOTP"

const Stack = createNativeStackNavigator();
export function AuthStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{headerShown:false}}
            >
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="RegisterPageParent" component={RegisterPageParent} />
                <Stack.Screen name="SelectUser" component={SelectUserPage} />
                <Stack.Screen name="RegisterPageCaregiver" component={RegisterPageCaregiver} />
                <Stack.Screen name="OTPscreen" component={OTPscreen} />
                <Stack.Screen name="VerifyToLoginScreen" component={VerifyToLoginScreen} />
                <Stack.Screen name="GetStartedScreen" component={GetStartedScreen} />
                <Stack.Screen name="CheckOTP" component={CheckOTP} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
