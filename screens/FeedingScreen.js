import {SafeAreaView} from "react-native-safe-area-context";
import {Text} from "react-native";
import {TopBar} from "../components/TopBar";
import React from "react";
import {themeColors} from "../theme";
import ExpenseForm from "../components/Expense/ExpenseForm";
import IncomeForm from "../components/Expense/IncomeForm";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {BreastFeeding} from "../components/Feeding/BreastFeeding";
import {SolidFood} from "../components/Feeding/SolidFood";
import {BottleFeeding} from "../components/Feeding/BottleFeeding";
import Food from "../assets/images/Food/dairy-products.png";
import ScreenHeader from "../components/ScreenHeader";
import MealPlan from "../components/Feeding/Solidfoods/MealPlan";
const Tab = createMaterialTopTabNavigator();

export function FeedingScreen(){
    return(
        <SafeAreaView className={"flex-1 relative"}>
            <ScreenHeader screen={"Baby"} screenName={"Feeding Activity"} BabyName={'Chelsea'} image={Food} />
            <Tab.Navigator
                initialRouteName="Feeding"
                screenOptions={
                    {
                        "tabBarActiveTintColor": "white",
                        "tabBarInactiveTintColor": "gray",
                        "tabBarLabelStyle": {
                            "fontSize": 12
                        },
                        "tabBarIndicatorStyle": {
                            "backgroundColor": themeColors.colorDark,
                            "height": 48,
                            "borderRadius": 20,

                        },
                        "tabBarStyle": {
                            "backgroundColor": "white",

                            "marginTop": 20,
                            "borderRadius": 20,
                            "marginRight": 20,
                            "marginLeft": 20
                        }
                    }

                }

            >

                <Tab.Screen name="Bfeeding" component={BreastFeeding} options={{tabBarLabel:"Breast"}}/>
                <Tab.Screen name="BottleFeeding" component={BottleFeeding} options={{tabBarLabel:"Bottle"}}/>
                <Tab.Screen name="Sfeeding" component={SolidFood} options={{tabBarLabel:"Solids"}}/>
                {/*<Tab.Screen name="mealplan" component={MealPlan} options={{tabBarLabel:"Meal plan"}}/>*/}
            </Tab.Navigator>

        </SafeAreaView>
    )
}