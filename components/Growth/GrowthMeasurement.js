import React from 'react'
import {TouchableOpacity, View, Text, StyleSheet, Image} from "react-native";
import {themeColors} from "../../theme";
import {ArrowUpIcon, CalendarDaysIcon, CheckIcon, ClockIcon} from "react-native-heroicons/solid";
import {dateDiff,getDateenUSFormat} from "../../util/date";
import {babyDetails} from "../../constants";
export default function GrowthMeasurement({ weight, height, headCircumference, description,date}) {
    let baby = babyDetails[2];

    return (
        <TouchableOpacity className={"pt-3"}>

            <View className={"flex-row rounded-xl p-3 shadow-2xl  mx-2 space-x-3"} style={{backgroundColor:"white",shadowColor: "#000"}}>

                <View className={"flex justify-center flex-1"}>
                    <View><Text className={" text-gray-500  font-semibold"} style={{color:"gray"}}>{getDateenUSFormat(date)}</Text></View>

                    <View><Text className={" text-gray-500 py-1"} style={{color:"gray"}}>
                        {description.substring(0, 60)+"..."}</Text>
                    </View>

                    <View className={"flex-row items-center space-x-1"}>
                        <ClockIcon size="18" color="limegreen" />
                        <Text className={"text-gray-500"} style={{color:"gray"}}>{dateDiff(baby.dob,date)}</Text>
                    </View>
                </View>

                <View className={"p-1 bg-white"} style={{backgroundColor:"white"}}>
                    <View className={"flex-row mx-1 space-x-2 pt-1 "}>
                        <View >
                            <Image source={require("../../assets/images/weight-icon.png")} className={"w-6 h-6 "}/>
                        </View>
                        <View className={"flex"}>
                            <Text className={"flex-row font-semibold text-gray-500"} style={{color:"gray"}}>{weight} kg</Text>
                        </View>
                    </View>

                    <View className={"flex-row mx-1 space-x-2 pt-1 "}>
                        <View >
                            <Image source={require("../../assets/images/height-icon.png")} className={"w-6 h-6 "}/>
                        </View>
                        <View className={"flex"}>
                            <Text className={"flex-row font-semibold text-gray-500"} style={{color:"gray"}}>{height} cm</Text>
                        </View>
                    </View>

                    <View className={"flex-row mx-1 space-x-2 pt-1 "}>
                        <View >
                            <Image source={require("../../assets/images/headCircum-icon.png")} className={"w-6 h-6 "}/>
                        </View>
                        <View className={"flex"}>
                            <Text className={"flex-row font-semibold text-gray-500"} style={{color:"gray"}}>{headCircumference} cm</Text>
                        </View>
                    </View>
                </View>

            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    rowborder: {
        borderColor:themeColors.colornormal,
    }
})

