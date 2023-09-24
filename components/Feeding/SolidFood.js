import React, {createContext, useState} from "react";
import { ScrollView, StyleSheet, Text, } from "react-native";
import {FoodList} from "./Solidfoods/FoodList";
import {SafeAreaView} from "react-native-safe-area-context";
import {themeColors} from "../../theme";
import {useNavigation, useRoute} from "@react-navigation/native";
import {SaveFood} from "./Solidfoods/SaveFood";

export const solidfoodContext = createContext();

export function SolidFood() {
    const route = useRoute();
    // console.log("route params here",route.params);
    let { TodayCart: vegArray } = route.params || {};
    // console.log("veg Array", vegArray);


    return (

        <SafeAreaView className={"px-3"}>
            <ScrollView>
                {vegArray ? (
                    <SaveFood vegeArray = {vegArray}/>

                ) : (
                    <>
                        <Text style={[styles.label]} className={"text-center mb-2"}>
                            Pick a Category
                        </Text>
                        <FoodList />
                    </>
                )}
            </ScrollView>
        </SafeAreaView>

    )
}
const styles = StyleSheet.create({


    label: {
        color: themeColors.colorDark,
        fontSize: 18,
    },


});