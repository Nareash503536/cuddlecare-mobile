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
import {DUMMY_GROWTH, DUMMY_Milestones} from "../constants/GrowthChartZScoreData/DUMMY_GROWTH";
import GrowthDisplays from "../components/Growth/GrowthDisplays";
import ProgressBar from "../components/ProgressBar";
import CompleteMilestonesList from "../components/Milestones/CompleteMilestonesList";
import {selectMilestone, selectMilestones, setMilestone} from "../slices/milestoneSlice";

let baby = babyDetails[2];
const deviceWidth = Dimensions.get('window').width;

export default function MilestonesScreen() {
    let baby = babyDetails[2];
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(setMilestone(DUMMY_Milestones));
    },[DUMMY_Milestones]);

    let growthDetails = useSelector(selectGrowth);
    let milestonesDetails = useSelector(selectMilestone);


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
                            <Text className={"text-gray-500 text-2xl font-semibold"} style={{color:"gray"}}>{baby.name}</Text>
                        </View>
                        <View className={"flex-row space-x-2"}>
                            <Text className={"text-gray-500 font-bold"} style={{color:"gray"}}>Age </Text>
                            <Text className={"text-gray-500 text-sm"} style={{color:"gray"}} >{dateDiff(baby.dob,(new Date()))}</Text>
                        </View>
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
                            <Text className={"text-white text-lg"} style={{color:"white"}}>Check Milestone list</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/*Milestones to be completed*/}
                <View className={"h-full"}>
                    <View className={"flex-row justify-between px-3 pt-3"}>
                        <Text className={"font-semibold text-xl text-gray-500"} style={{letterSpacing:1,fontSize:16,color:"gray"}} >
                            completed Milestones
                        </Text>
                        <TouchableOpacity>
                            <Text className={"text-gray-500"} style={{letterSpacing:1,color:"gray"}} >
                                See More
                                <ArrowRightIcon  size="16" color="gray" />
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false} className={"p-2 pb-3"}>
                        <CompleteMilestonesList milestoneData={milestonesDetails} />
                    </ScrollView>
                </View>



                {/*/!*Side Button*!/*/}
                {/*<View  className={"absolute"}>*/}
                <TouchableOpacity
                    className={"absolute bottom-16 right-5 rounded-full shadow-2xl p-1"}
                    style={{backgroundColor:themeColors.btnColor,shadowColor: "#000"}}
                    onPress={() => navigation.navigate('GrowthChart')}
                >
                    {/*<Image source={require("../assets/images/analysisIcon.png")} className={"w-12 h-12 rounded-full"}/>*/}
                    <PlusSmallIcon   size="40" color="white" />
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
