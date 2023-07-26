import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Image } from 'react-native';
import { LoginScreen } from "../screens/Registration/LoginScreen";
import COLORS from "../constants/theme";
import icons from "../constants/icons"
import { RegisterScreen } from "../screens/Registration/RegisterScreen";
import { RegisterPage } from "../screens/Registration/RegisterPage";
import { SelectUserPage } from "../screens/Registration/SelectUserPage";

const Stack = createNativeStackNavigator();
export function AuthStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#BADEE3',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            >
                {/* <Stack.Screen name="RegisterPage2" component={RegisterPage2} /> */}
                {/* <Stack.Screen name="SelectUser" component={SelectUserPage} /> */}
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="RegisterPage" component={RegisterPage} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
