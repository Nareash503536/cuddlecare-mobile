import React from "react";
import {ScrollView, Text} from "react-native";
import {DateAndTime} from "./DateAndTime";
import {FoodList} from "./FoodList";
import {ReactionsList} from "./ReactionsList";
import {SafeAreaView} from "react-native-safe-area-context";

export function SolidFood() {
    return (
        <SafeAreaView>
            <ScrollView>
                <DateAndTime/>
                <FoodList/>
                <ReactionsList/>
            </ScrollView>
        </SafeAreaView>
    )
}