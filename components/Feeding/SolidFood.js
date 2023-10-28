import React, {createContext, useState} from "react";
import {ScrollView, StyleSheet, Text, TouchableOpacity,} from "react-native";
import {FoodList} from "./Solidfoods/FoodList";
import {SafeAreaView} from "react-native-safe-area-context";
import {themeColors} from "../../theme";
import {useNavigation, useRoute} from "@react-navigation/native";
import {SaveFood} from "./Solidfoods/SaveFood";
import {ChartBarSquareIcon} from "react-native-heroicons/outline";

export const solidfoodContext = createContext();

export function SolidFood() {
    const route = useRoute();
    let navigation = useNavigation();
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
                <TouchableOpacity
                    className={"absolute bottom-0 right-5 rounded-full p-1"}
                    style={{backgroundColor:themeColors.btnColor}}
                    onPress={() => navigation.navigate('Mealplan')}
                >
                    <ChartBarSquareIcon   size="40" color="white" />
                </TouchableOpacity>
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