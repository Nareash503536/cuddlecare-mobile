import {SafeAreaView} from "react-native";
import {TopBar} from "../../TopBar";
import {themeColors} from "../../../theme";
import ExpenseForm from "../../Expense/ExpenseForm";
import IncomeForm from "../../Expense/IncomeForm";
import * as React from "react";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import VegetablesList from "./VegetablesList";
import ScreenHeader from "../../ScreenHeader";
import Food from "../../../assets/images/Food/dairy-products.png";
const Tab = createMaterialTopTabNavigator();
export default function SolidFoodsHeader(){
    return(
        <SafeAreaView  className={"flex-1 relative mt-8"}>
            <ScreenHeader screen={"Feeding"} screenName={"Solid Foods"} BabyName={'Chelsea'} image={Food} />
            <Tab.Navigator
                initialRouteName="Puree"
                screenOptions={
                    {
                        "tabBarActiveTintColor": "gray",
                        "tabBarInactiveTintColor": "gray",
                        "tabBarLabelStyle": {
                            "fontSize": 12
                        },
                        "tabBarIndicatorStyle": {
                            "backgroundColor": themeColors.colorDark,


                        },
                        "tabBarStyle": {
                            "backgroundColor": "white",
                            "height": 55,



                        },
                        "tabBarScrollEnabled": true,

                        "tabBarItemStyle": {
                            "width": 150,
                        },
                    }

                }

            >
                <Tab.Screen name="Puree" component={VegetablesList} options={{tabBarLabel:"Puree"}}/>
                <Tab.Screen name="Vegetables" component={VegetablesList} options={{tabBarLabel:"Vegetables"}}/>
                <Tab.Screen name="Fruits" component={VegetablesList} options={{tabBarLabel:"Fruits"}}/>
                <Tab.Screen name="Grains" component={VegetablesList} options={{tabBarLabel:"Grains"}}/>
                <Tab.Screen name="Snacks" component={VegetablesList} options={{tabBarLabel:"Snacks"}}/>
            </Tab.Navigator></SafeAreaView>
    )
}