import {Text, TouchableOpacity, View, Image, TextInput, Dimensions} from "react-native";
import React from "react";


import {HeightChart} from "../../components/GrowthChart/heightChart";
import {WeightChart} from "../../components/GrowthChart/weightChart";
import {HeadCircumChart} from "../../components/GrowthChart/headCircumChart";
import {Logs2} from "../../components/log2";
import {themeColors} from "../../theme";
import {PlusSmallIcon} from "react-native-heroicons/solid";
import {ArrowLeftIcon} from "react-native-heroicons/outline";
import {useNavigation} from "@react-navigation/native";

const Charts = ["weight","height","headcircum"]
function chartRender(chart){
    if(chart=="weight"){
        return <WeightChart/>
    }if(chart=="height"){
        <HeightChart/>
    }
    return (
        <HeadCircumChart/>
    )
}
export function GrowthChartScreen() {
    let navigation = useNavigation();
    return (
        <View className={"flex flex-1 bg-white"}>

            <View className={"ml-1"}>
                <HeightChart/>
            </View>

            <View>
                <View  className={" mt-2 "}>
                    <View className={"flex-row justify-between  my-2"}>
                        <Text className={"pl-2 font-semibold text-gray-500"} style={{letterSpacing:1,fontSize:16}} >Latest Measurements</Text>
                        <TouchableOpacity>
                            <Text className={"pr-2 text-gray-500"} style={{letterSpacing:1,}} > See More</Text>
                        </TouchableOpacity>
                    </View>
                    <Logs2/>
                </View>
            </View>

            <TouchableOpacity
                className={"absolute top-10 left-5 rounded-full p-1"}
                style={{backgroundColor:themeColors.colorDark}}
                onPress={() => navigation.goBack()}
            >
                <ArrowLeftIcon size="22" color="white"  />
            </TouchableOpacity>

        </View>

    )
}
