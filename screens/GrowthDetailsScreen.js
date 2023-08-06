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
import {getFormattedDate} from "../util/date";
import {BellIcon, CalendarDaysIcon, ChartBarSquareIcon} from "react-native-heroicons/outline";
import {GlobalStyles} from "../constants/styles";
import {babyDetails} from "../constants";
import {Bars3CenterLeftIcon} from "react-native-heroicons/mini";
import {UpcomingEvent} from "../components/upcomingEvent";
import {GrowthUpcomingEvent} from "../components/Growth/GrowthUpcomingEvent";
import {DUMMY_GROWTH} from "../constants/GrowthChartZScoreData/DUMMY_GROWTH";

let baby = babyDetails[2];


export function GrowthDetailsScreen() {
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(setGrowth(DUMMY_GROWTH));
    },[]);

    let growthDetails = useSelector(selectGrowth);

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
                            <Text className={"text-gray-500 text-2xl font-semibold"} >{baby.name}</Text>
                        </View>
                        <View className={"flex-row space-x-2"}>
                            <Text className={"text-gray-500 font-bold"} >Age </Text>
                            <Text className={"text-gray-500 text-sm"} >3Y-1M</Text>
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

                {/*Growth Helth status*/}
                <GrowthUpcomingEvent title={"Growth measurement"}/>

                {/*Growth Displays*/}
                <View className={"flex-row my-2 justify-center items-center"}>

                    {/*Weight Display*/}
                    <View className={"flex rounded-xl shadow-2xl mx-1 "} style={{backgroundColor:themeColors.colornormal,shadowColor: "#000"}}>
                       {/*Image and title*/}
                        <View className={"flex-row mx-2 space-x-2 pt-1"}>
                            {/*Weight Image*/}
                            <View className={" p-1 rounded-full bg-white"} >
                                <Image source={require("../assets/images/weight-icon.png")} className={"w-8 h-8 rounded-full"}/>
                            </View>
                            <View className={"flex pt-1"}>
                                <Text className={"flex-row font-semibold text-white"}>Weight</Text>
                                <View className={"flex-row"}>
                                    <Text className={"flex-row font-semibold text-white"}>25.2%</Text>
                                    <ArrowUpIcon size="16" color="white" />
                                </View>
                            </View>
                        </View>
                        <View className={"flex-row justify-center items-center mx-2 space-x-1 my-1"}>
                            <Text className={"text-3xl text-white"}>7.3</Text>
                            <View className={"mt-2"}><Text className={" text-gray-100"}>kg</Text></View>
                        </View>
                    </View>

                    {/*Height Display*/}
                    <View className={"flex rounded-xl shadow-2xl mx-1 "} style={{backgroundColor:themeColors.colornormal,shadowColor: "#000"}}>
                        {/*Image and title*/}
                        <View className={"flex-row mx-2 space-x-2 pt-1"}>
                            {/*Weight Image*/}
                            <View className={" p-1 rounded-full bg-white"} >
                                <Image source={require("../assets/images/height-icon.png")} className={"w-8 h-8 rounded-full"}/>
                            </View>
                            <View className={"flex pt-1"}>
                                <Text className={"flex-row font-semibold text-white"}>Height</Text>
                                <View className={"flex-row"}>
                                    <Text className={"flex-row font-semibold text-white"}>21.4%</Text>
                                    <ArrowUpIcon size="16" color="white" />
                                </View>
                            </View>
                        </View>
                        <View className={"flex-row justify-center items-center mx-2 space-x-1 my-1"}>
                            <Text className={"text-3xl text-white"}>57.8</Text>
                            <View className={"mt-2"}><Text className={" text-gray-100"}>cm</Text></View>
                        </View>
                    </View>

                    {/*Head Circum display*/}
                    <View className={"flex rounded-xl shadow-2xl mx-1 "} style={{backgroundColor:themeColors.colornormal,shadowColor: "#000"}}>
                        {/*Image and title*/}
                        <View className={"flex-row mx-2 space-x-2 pt-1"}>
                            {/*Weight Image*/}
                            <View className={" p-1 rounded-full bg-white"} >
                                <Image source={require("../assets/images/headCircum-icon.png")} className={"w-8 h-8 rounded-full"}/>
                            </View>
                            <View className={"flex pt-1"}>
                                <Text className={"flex-row font-semibold text-white"}>HeadCir.</Text>
                                <View className={"flex-row"}>
                                    <Text className={"flex-row font-semibold text-white"}>13.4%</Text>
                                    <ArrowUpIcon size="16" color="white" />
                                </View>
                            </View>
                        </View>
                        <View className={"flex-row justify-center items-center mx-2 space-x-1 my-1"}>
                            <Text className={"text-3xl text-white"}>34.5</Text>
                            <View className={"mt-2"}><Text className={" text-gray-100"}>cm</Text></View>
                        </View>
                    </View>

                </View>

                {/*Growth upcoming event*/}
                {/*<GrowthUpcomingEvent title={"Growth measurement"}/>*/}

                {/*<View*/}
                <View className={"flex-row justify-between px-3 pt-3"}>
                    <Text className={"font-semibold text-xl text-gray-500"} style={{letterSpacing:1,fontSize:16}} >
                        Growth Measurements
                    </Text>
                    <TouchableOpacity>
                        <Text className={"text-gray-500"} style={{letterSpacing:1,}} >
                            See More
                            <ArrowRightIcon  size="16" color="gray" />
                        </Text>
                    </TouchableOpacity>
                </View>

                <GrowthMeasurementList growthData={growthDetails} />

                {/*Side Button*/}
                {/*<View  className={"absolute"}>*/}
                    <TouchableOpacity
                        className={"absolute bottom-24 right-5 rounded-full shadow-2xl p-1"}
                        style={{backgroundColor:themeColors.btnColor,shadowColor: "#000"}}
                        onPress={() => navigation.navigate('GrowthChart')}
                    >
                        <ChartBarSquareIcon   size="40" color="white" />
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
