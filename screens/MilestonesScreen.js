import React, {useEffect} from "react";
import {Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from 'react-native'
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
import ProgressBar from "../components/ProgressBar";
import MilestonesList from "../components/Milestones/MilestonesList";

let baby = babyDetails[2];
const deviceWidth = Dimensions.get('window').width;

export default function MilestonesScreen() {
    let baby = babyDetails[2];
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(setGrowth(DUMMY_GROWTH));
    },[DUMMY_GROWTH]);

    let growthDetails = useSelector(selectGrowth);
    const latestGrowthDetail = growthDetails[0];

    const navigation = useNavigation();
    return (
        <View className={"flex-1 bg-white "}>
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
                            > Milestones</Text>
                        </View>
                    </View>
                    <TouchableOpacity className={"rounded-full p-1"} style={{backgroundColor:themeColors.btnColor}}>
                        <BellIcon size="27" color="white" />
                    </TouchableOpacity>
                </View>

                {/*BabyDetails*/}
                <View className={"mt-3 px-4 flex-row px-8 pb-2 mb-2" }>
                    {/*image*/}
                    <View className={"h-full w-2 rounded-l-2xl"} style={{ backgroundColor:themeColors.btnColor,}}>
                        {/*<Image source={baby.image} className={"w-20 h-20 rounded-full"}/>*/}
                    </View>

                    {/*name and growth status*/}
                    <View className={"flex flex-1 pl-1"}>
                        <View>
                            <Text className={"text-gray-500 text-2xl font-semibold"} >{baby.name}</Text>
                        </View>
                        <View className={"flex-row space-x-2"}>
                            <Text className={"text-gray-500 font-bold"} >Age </Text>
                            <Text className={"text-gray-500 text-sm"} >{dateDiff(baby.dob,(new Date()))}</Text>
                        </View>
                        <View className={"flex-row space-x-2"}>
                            <Text className={"text-gray-500 font-bold"} >8 </Text>
                            <Text className={"text-gray-500 text-sm"} >Measurements</Text>
                        </View>

                        {/*<View className={"flex-row flex-1 justify-between space-x-1"} >*/}
                        {/*    <View className={" flex px-5 py-1 items-center rounded-2xl"} style={{backgroundColor:themeColors.bgWhite(0.4)}} >*/}
                        {/*        <Text className={"text-white"} >Weight</Text>*/}
                        {/*        <Text className={"text-lg "} style={{color:themeColors.colorExtraDark}}>{baby.weight}kg</Text>*/}
                        {/*    </View>*/}
                        {/*    <View className={" flex px-5 py-1 items-center rounded-2xl"} style={{backgroundColor:themeColors.bgWhite(0.3)}} >*/}
                        {/*        <Text className={"text-white"}>Size</Text>*/}
                        {/*        <Text className={"text-lg "} style={{color:themeColors.colorExtraDark}}>{baby.height}cm</Text>*/}
                        {/*    </View>*/}
                        {/*    <View className={" flex px-5 py-1 items-center rounded-2xl"} style={{backgroundColor:themeColors.bgWhite(0.3)}} >*/}
                        {/*        <Text className={"text-white"}>Age</Text>*/}
                        {/*        <Text className={"text-lg"} style={{color:themeColors.colorExtraDark}} >{baby.year}y {baby.month}m</Text>*/}
                        {/*    </View>*/}
                        {/*</View>*/}

                    </View>
                </View>

                <ProgressBar progressInput={50}/>

                {/*Checklist Button*/}
                <View className={"flex-row justify-center items-"}>
                    <TouchableOpacity className={"mt-3 py-2 px-8 rounded-xl center"}
                        style={{backgroundColor:themeColors.colornormal,shadowColor: "#000",width:deviceWidth*0.6}}
                        onPress={() => navigation.navigate('MilestonesList')}
                    >
                        <View >
                            <Text className={"text-white text-lg"}>Check Milestone list</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/*Milestones to be completed*/}
                <View className={"h-full"}>
                    <View className={"flex-row justify-between px-3 pt-3"}>
                        <Text className={"font-semibold text-xl text-gray-500"} style={{letterSpacing:1,fontSize:16}} >
                            Milestones to be completed
                        </Text>
                        <TouchableOpacity>
                            <Text className={"text-gray-500"} style={{letterSpacing:1,}} >
                                See More
                                <ArrowRightIcon  size="16" color="gray" />
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false} className={"p-2 pb-3"}>
                        <MilestonesList growthData={growthDetails} />
                    </ScrollView>
                </View>

                {/*completed Milestones*/}

                {/*<View>*/}
                {/*    <View className={"flex-row justify-between px-3 pt-3"}>*/}
                {/*        <Text className={"font-semibold text-xl text-gray-500"} style={{letterSpacing:1,fontSize:16}} >*/}
                {/*            Completed Milestones*/}
                {/*        </Text>*/}
                {/*        <TouchableOpacity>*/}
                {/*            <Text className={"text-gray-500"} style={{letterSpacing:1,}} >*/}
                {/*                See More*/}
                {/*                <ArrowRightIcon  size="16" color="gray" />*/}
                {/*            </Text>*/}
                {/*        </TouchableOpacity>*/}
                {/*    </View>*/}
                {/*    <GrowthMeasurementList growthData={growthDetails} />*/}
                {/*</View>*/}

                {/*/!*Side Button*!/*/}
                {/*<View  className={"absolute"}>*/}
                <TouchableOpacity
                    className={"absolute bottom-24 right-5 rounded-full shadow-2xl p-1"}
                    style={{backgroundColor:themeColors.btnColor,shadowColor: "#000"}}
                    onPress={() => navigation.navigate('GrowthChart')}
                >
                    <Image source={require("../assets/images/analysisIcon.png")} className={"w-12 h-12 rounded-full"}/>
                    {/*<ChartBarSquareIcon   size="40" color="white" />*/}
                </TouchableOpacity>

                {/*<TouchableOpacity*/}
                {/*    className={"absolute bottom-10 right-5 shadow-2xl rounded-full p-1"}*/}
                {/*    style={{backgroundColor:themeColors.btnColor,shadowColor: "#000"}}*/}
                {/*    onPress={() => navigation.navigate('GrowhtManage')}*/}
                {/*>*/}
                {/*    <PlusSmallIcon size="40" color="white"  />*/}
                {/*</TouchableOpacity>*/}
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
