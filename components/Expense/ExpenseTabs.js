import * as React from 'react';
import {View, useWindowDimensions, SafeAreaView} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import {NavigationContainer} from "@react-navigation/native";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import ExpenseForm from "./ExpenseForm";
import IncomeAddTab from "./IncomeForm";
const Tab = createMaterialTopTabNavigator();
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {themeColors} from "../../theme";
import IncomeForm from "./IncomeForm";
import {TopBar} from "../TopBar";
export default function ExpenseTabs(){
    const insets = useSafeAreaInsets();
    return(
   <SafeAreaView  className={"flex-1 relative mt-8"}><TopBar/>
        <Tab.Navigator
        initialRouteName="Expense"
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
            <Tab.Screen name="Expense" component={ExpenseForm} options={{tabBarLabel:"Expense"}}/>
            <Tab.Screen name="Income" component={IncomeForm} options={{tabBarLabel:"Budget"}}/>
        </Tab.Navigator></SafeAreaView>
    )
}


