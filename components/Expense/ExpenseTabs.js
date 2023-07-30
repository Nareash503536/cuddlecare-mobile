import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import {NavigationContainer} from "@react-navigation/native";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import ExpenseForm from "./ExpenseForm";
import IncomeAddTab from "./IncomeForm";
const Tab = createMaterialTopTabNavigator();
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {themeColors} from "../../theme";
import IncomeForm from "./IncomeForm";
export default function ExpenseTabs(){
    const insets = useSafeAreaInsets();
    return(

        <Tab.Navigator
        initialRouteName="Income"
        screenOptions={
                        {
                            "tabBarActiveTintColor": "black",
                            "tabBarLabelStyle": {
                            "fontSize": 12
                            },
                            "tabBarIndicatorStyle": {
                            "borderBottomWidth": 2,
                            "borderColor": themeColors.colorDark
                            },
                            "tabBarStyle": {
                            "backgroundColor": "white",
                            "marginTop": 40,
                            }
                        }

        }

        >
            <Tab.Screen name="Expense" component={ExpenseForm} options={{tabBarLabel:"Expense"}}/>
            <Tab.Screen name="Income" component={IncomeForm} options={{tabBarLabel:"Income"}}/>
        </Tab.Navigator>
    )
}