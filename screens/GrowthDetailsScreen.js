import React, {useEffect} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View,} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import {ArrowRightIcon, ArrowUpIcon, PlusSmallIcon} from "react-native-heroicons/solid";
import {useNavigation} from "@react-navigation/native";
import {StatusBar} from "expo-status-bar";
import {themeColors} from "../theme";
import GrowthMeasurementList from "../components/Growth/GrowthMeasurementList";
import {useDispatch, useSelector} from "react-redux";
import {selectGrowth, setGrowth} from "../slices/growthSlice";
import {dateDiff, getFormattedDate} from "../util/date";
import {BellIcon, CalendarDaysIcon, ChartBarSquareIcon} from "react-native-heroicons/outline";
import {GlobalStyles} from "../constants/styles";
import {babyDetails} from "../constants";
import {Bars3CenterLeftIcon} from "react-native-heroicons/mini";
import {UpcomingEvent} from "../components/upcomingEvent";
import {GrowthUpcomingEvent} from "../components/Growth/GrowthUpcomingEvent";
import {DUMMY_GROWTH} from "../constants/GrowthChartZScoreData/DUMMY_GROWTH";
import GrowthDisplays from "../components/Growth/GrowthDisplays";

let baby = babyDetails[2];


export function GrowthDetailsScreen() {
    let baby = babyDetails[2];
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(setGrowth(DUMMY_GROWTH));
    },[DUMMY_GROWTH]);

    let growthDetails = useSelector(selectGrowth);
    const latestGrowthDetail = growthDetails[0];

const navigation = useNavigation();
    return (
        <View className={"flex-1 bg-white "} style={{backgroundColor:"white"}}>
            <SafeAreaView className={"flex-1 relative"}>
                <StatusBar barStyle={"light"}/>
                {/*Top bar*/}
                <View className="mx-4  mt-1 flex-row  items-center">
                    <TouchableOpacity className={"rounded-full p-1"} style={{backgroundColor:themeColors.btnColor}}>
                        <Bars3CenterLeftIcon size="27" color="white" />
                    </TouchableOpacity>

                    <View className=" flex-1 space-x-2 items-center">
                        <View className={"flex-row justify-center"}>
                            <Text className={"flex-row justify-center text-2xl text-gray-500 font-bold"}
                                  style={styles.title}
                            > Growth Analytics</Text>
                        </View>
                    </View>
                    <TouchableOpacity className={"rounded-full p-1"} style={{backgroundColor:themeColors.btnColor}}>
                        <BellIcon size="27" color="white" />
                    </TouchableOpacity>
                </View>

                {/*BabyDetails*/}
                <View className={"mt-3 px-4 flex-row px-8 pb-2"}>
                    {/*image*/}
                    <View className={" p-1 rounded-full border-2 border-t-0 border-l-0"} style={{ borderColor:themeColors.colorDark,}}>
                        <Image source={baby.image} className={"w-20 h-20 rounded-full"}/>
                    </View>

                    {/*name and growth status*/}
                    <View className={"flex flex-1 pl-3 pt-2"}>
                        <View>
                            <Text className={"text-gray-500 text-2xl font-semibold"} style={{color:"gray"}}>{baby.name}</Text>
                        </View>
                        <View className={"flex-row space-x-2"}>
                            <Text className={"text-gray-500 font-bold"} style={{color:"gray"}}>Age </Text>
                            <Text className={"text-gray-500 text-sm"} style={{color:"gray"}}>{dateDiff(baby.dob,(new Date()))}</Text>
                        </View>
                        <View className={"flex-row space-x-2"}>
                            <Text className={"text-gray-500 font-bold"} style={{color:"gray"}}>8 </Text>
                            <Text className={"text-gray-500 text-sm"} style={{color:"gray"}}>Measurements</Text>
                        </View>
                    </View>
                </View>

                {/*Growth Helth status*/}
                <GrowthUpcomingEvent title={"Growth measurement"}/>

                {/*Growth Displays*/}
                <GrowthDisplays {...latestGrowthDetail}/>

                {/*Growth upcoming event*/}
                {/*<GrowthUpcomingEvent title={"Growth measurement"}/>*/}

                {/*<View*/}
                <View className={"flex-row justify-between px-3 pt-3"}>
                    <Text className={"font-semibold text-xl text-gray-500"} style={{letterSpacing:1,fontSize:16,color:"gray"}} >
                        Growth Measurements
                    </Text>
                    <TouchableOpacity>
                        <Text className={"text-gray-500"} style={{letterSpacing:1,color:"gray"}} >
                            See More
                            <ArrowRightIcon  size="16" color="gray" />
                        </Text>
                    </TouchableOpacity>
                </View>

                {/*Growth Measurement List*/}
                <GrowthMeasurementList growthData={growthDetails} />

                {/*Side Button*/}
                {/*<View  className={"absolute"}>*/}
                    <TouchableOpacity
                        className={"absolute bottom-24 right-5 rounded-full shadow-2xl p-1"}
                        style={{backgroundColor:themeColors.btnColor,shadowColor: "#000"}}
                        onPress={() => navigation.navigate('GrowthChart')}
                    >
                        <Image source={require("../assets/images/analysisIcon.png")} className={"w-12 h-12 rounded-full"}/>
                        {/*<ChartBarSquareIcon   size="40" color="white" />*/}
                    </TouchableOpacity>

                    <TouchableOpacity
                        className={"absolute bottom-10 right-5 shadow-2xl rounded-full p-1"}
                        style={{backgroundColor:themeColors.btnColor,shadowColor: "#000"}}
                        onPress={() => navigation.navigate('GrowhtManage')}
                    >
                        <PlusSmallIcon size="40" color="white"  />
                    </TouchableOpacity>
                {/*</View>*/}

            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    title: {
        color: themeColors.colornormal,
    },
});
