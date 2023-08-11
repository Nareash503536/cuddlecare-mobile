import React from 'react'
import {TouchableOpacity, View, Text, StyleSheet, Image} from "react-native";
import {themeColors} from "../../theme";
import {ArrowUpIcon, CalendarDaysIcon, CheckIcon, ClockIcon} from "react-native-heroicons/solid";
import {dateDiff,getDateenUSFormat} from "../../util/date";
import {babyDetails} from "../../constants";
export default function  CompletedMilestone({ milestone,description,date}) {
    let baby = babyDetails[2];

    // if(status){
    return (
        <TouchableOpacity className={"pt-3"}>

            <View className={"flex-row rounded-xl p-3 shadow-2xl  mx-2 space-x-3"} style={{backgroundColor:"white",shadowColor: "#000"}}>

                <View className={"flex justify-center flex-1"}>
                    <View><Text className={" text-gray-500  font-semibold"} >{milestone}</Text></View>

                    <View><Text className={" text-gray-500 py-1"} >
                        {description.substring(0, 60)+"..."}</Text>
                    </View>

                    <View className={"flex-row items-center space-x-1"}>
                        <ClockIcon size="18" color="limegreen" />
                        <Text className={"text-gray-500"}>{getDateenUSFormat(date)}</Text>
                    </View>
                </View>

            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    rowborder: {
        borderColor:themeColors.colornormal,
    },
    uncomplete:{
        borderWidth:2,
        borderColor:themeColors.colorDanger,
    }
})

//     <TouchableOpacity className={"pt-3"}>
//
//     <View className={"flex-row rounded-xl p-3 shadow-sm  mx-2 space-x-3"} style={styles.uncomplete}>
//
//     <View className={"flex justify-center flex-1"}>
//     {/*<View><Text className={" text-gray-500  font-semibold"} >{getDateenUSFormat(date)}</Text></View>*/}
//
// <View><Text className={" text-gray-500 py-1"} >
//     {value.substring(0, 60)+"..."}</Text>
// </View>
//
// <View className={"flex-row items-center space-x-1"}>
//     <ClockIcon size="18" color="limegreen" />
//     {/*<Text className={"text-gray-500"}>{dateDiff(baby.dob,date)}</Text>*/}
// </View>
// </View>
//
// </View>
// </TouchableOpacity>

