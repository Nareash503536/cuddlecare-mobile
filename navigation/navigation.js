import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {StartScreen} from "../screens/StartScreen";
import {HomeScreen} from "../screens/HomeScreen";
import { BabyScreen } from "../screens/BabyScreen";

const Stack = createNativeStackNavigator();
export function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name="Start" component={StartScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Baby" component={BabyScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
