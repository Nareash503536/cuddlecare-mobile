import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {StartScreen} from "../screens/StartScreen";
import {HomeScreen} from "../screens/HomeScreen";
import {BabyScreen} from "../screens/BabyScreen";
import {GrowthDetailsScreen} from "../screens/GrowthDetailsScreen";

const Stack = createNativeStackNavigator();
export function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name="Start" component={StartScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Baby" component={BabyScreen} />

                {/* Growth feature screens */}
                <Stack.Screen name="GrowthDetails" component={GrowthDetailsScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}
