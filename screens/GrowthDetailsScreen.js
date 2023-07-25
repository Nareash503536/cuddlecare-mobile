import React, {useEffect} from "react";
import {Text, TouchableOpacity, View,} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import {PlusSmallIcon} from "react-native-heroicons/solid";
import {useNavigation} from "@react-navigation/native";
import {StatusBar} from "expo-status-bar";
import {themeColors} from "../theme";
import GrowthMeasurementList from "../components/Growth/GrowthMeasurementList";
import {useDispatch, useSelector} from "react-redux";
import {selectGrowth, setGrowth} from "../slices/growthSlice";
import {getFormattedDate} from "../util/date";

const DUMMY_GROWTH =[
    {
        id: 'e1',
        weight:5,
        height: 10,
        headCircumference: 15,
        description: 'Eat more',
        date: getFormattedDate(new Date(2022, 10, 12)),
    },
    {
        id: 'e2',
        weight:10,
        height: 20,
        headCircumference: 25,
        description: 'Eat less',
        date: getFormattedDate(new Date(2022, 10, 12)),
    },
    {
        id: 'e3',
        weight:15,
        height: 30,
        headCircumference: 35,
        description: 'eat samaposha',
        date: getFormattedDate(new Date(2022, 10, 12)),
    },
    {
        id: 'e4',
        weight:20,
        height: 40,
        headCircumference: 45,
        description: 'eat more',
        date: getFormattedDate(new Date(2022, 10, 12))
    }
];
export function GrowthDetailsScreen() {
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(setGrowth(DUMMY_GROWTH));
    },[]);

    let growthDetails = useSelector(selectGrowth);

const navigation = useNavigation();
    return (
        <SafeAreaView className={"flex-1 relative"}>
            <View className={"flex-1 bg-white "}>
            <StatusBar barStyle={"dark-content"}/>
                <GrowthMeasurementList growthData={growthDetails} />

                <TouchableOpacity
                    className={"absolute bottom-10 right-5 rounded-full p-1"}
                    style={{backgroundColor:themeColors.btnColor}}
                    onPress={() => navigation.navigate('GrowhtManage')}
                >
                    <PlusSmallIcon size="40" color="white"  />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
