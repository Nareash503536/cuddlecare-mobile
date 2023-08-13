import React from 'react'
import {TouchableOpacity, View, Text, StyleSheet, Image} from "react-native";
import {themeColors} from "../../theme";
import {ArrowUpIcon, CalendarDaysIcon, CheckIcon, ClockIcon} from "react-native-heroicons/solid";
import {dateDiff,getDateenUSFormat} from "../../util/date";
import {babyDetails} from "../../constants";
import {useNavigation} from "@react-navigation/native";
export default function  Milestone({ value,status}) {
    let baby = babyDetails[2];
    const navigation = useNavigation();

    return (
        <TouchableOpacity className={"pt-3"}
            onPress={() => {
                navigation.navigate('MilestoneManage', {
                    milestone: value,
                    status:status,
                    });
                }
            }
        >
            <View className={"flex-row justify- rounded-xl p-3 shadow-sm  mx-2 space-x-3"} style={[styles.uncomplete,!status ?{borderColor:themeColors.colorDanger}:{borderColor:"limegreen"}] }>

                    <View className={"flex-1"}>
                        <Text className={" flex text-gray-500 py-1 "}>{value}</Text>
                    </View>

                    <View className={"items-center justify-center"}>
                        {!status ? <View className={"rounded-full w-4 h-4"} style={{borderWidth:2,borderColor:themeColors.colorDanger}}></View>:<View><Image className={"w-4 h-4"} source={require("../../assets/images/done.png")}/></View>}

                        {/*<View><Image className={"w-4 h-4"} source={require("../../assets/images/done.png")}/></View>*/}
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