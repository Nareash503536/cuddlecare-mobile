import React, {useEffect} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View,} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import {PlusSmallIcon} from "react-native-heroicons/solid";
import {useNavigation} from "@react-navigation/native";
import {StatusBar} from "expo-status-bar";
import {themeColors} from "../theme";
import GrowthMeasurementList from "../components/Growth/GrowthMeasurementList";
import {useDispatch, useSelector} from "react-redux";
import {selectGrowth, setGrowth} from "../slices/growthSlice";
import {getFormattedDate} from "../util/date";
import {ChartBarSquareIcon} from "react-native-heroicons/outline";
import {GlobalStyles} from "../constants/styles";
import {babyDetails} from "../constants";

let baby = babyDetails[2];

const DUMMY_GROWTH =[
    {
        id: 'e1',
        weight:5,
        height: 10,
        headCircumference: 15,
        description: 'Eat more',
        date: getFormattedDate(new Date(2023, 4, 29)),
    },
    {
        id: 'e2',
        weight:10,
        height: 20,
        headCircumference: 25,
        description: 'Eat less',
        date: getFormattedDate(new Date(2023, 2, 6)),
    },
    {
        id: 'e3',
        weight:15,
        height: 30,
        headCircumference: 35,
        description: 'eat samaposha',
        date: getFormattedDate(new Date(2022, 12, 22)),
    },
    {
        id: 'e4',
        weight:20,
        height: 40,
        headCircumference: 45,
        description: 'eat more',
        date: getFormattedDate(new Date(2022, 5, 8))
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
                <View className={"flex-row justify-center my-5"}>
                    <Text className={"flex-row justify-center text-2xl text-gray-500"}
                          style={styles.title}
                    > Growth Analytics</Text>
                </View>

                <View className={"mt-3 px-4 flex-row "}>
                    {/*image*/}
                    <View className={"bg-white p-1 rounded-3xl"}>
                        <Image source={baby.image} className={"w-20 h-20 rounded-3xl"}/>
                    </View>

                    {/*name and growth status*/}
                    <View className={"flex  flex-1 pl-3"}>
                        <View>
                            <Text className={"text-white text-2xl font-semibold"} style={{letterSpacing:2}}>{baby.name}</Text>
                        </View>
                        <View className={"flex-row flex-1 justify-between space-x-1"} >
                            <View className={" flex px-5 py-1 items-center rounded-2xl"} style={{backgroundColor:themeColors.bgWhite(0.4)}} >
                                <Text className={"text-white"} >Weight</Text>
                                <Text className={"text-lg "} style={{color:themeColors.colorExtraDark}}>{baby.weight}kg</Text>
                            </View>
                            <View className={" flex px-5 py-1 items-center rounded-2xl"} style={{backgroundColor:themeColors.bgWhite(0.3)}} >
                                <Text className={"text-white"}>Size</Text>
                                <Text className={"text-lg "} style={{color:themeColors.colorExtraDark}}>{baby.height}cm</Text>
                            </View>
                            <View className={" flex px-5 py-1 items-center rounded-2xl"} style={{backgroundColor:themeColors.bgWhite(0.3)}} >
                                <Text className={"text-white"}>Age</Text>
                                <Text className={"text-lg"} style={{color:themeColors.colorExtraDark}} >{baby.year}y {baby.month}m</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <Text className={"pl-2 font-semibold text-gray-500 mt-5 mb-3"} style={{letterSpacing:1,fontSize:16}} >
                    Growth Measurements
                </Text>

                <GrowthMeasurementList className={"border"} growthData={growthDetails} />

                <TouchableOpacity
                    className={"absolute bottom-24 right-5 rounded-full p-1"}
                    style={{backgroundColor:themeColors.btnColor}}
                    onPress={() => navigation.navigate('GrowthChart')}
                >
                    <ChartBarSquareIcon   size="40" color="white" />
                </TouchableOpacity>

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    title: {
        color: themeColors.colorDark,
    },
});
