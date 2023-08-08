import {Image, Text, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import React from "react";

export default function SleepCard(){
    return(
        <View className={"flex flex-row items-center px-2 border m-2 rounded-2xl"}>
            <Image className={"h-8 w-8"} source={require("../assets/images/sleeping.png")} />
            <View className={"flex-1 flex-col p-2"}>
                <View className={"flex flex-row justify-between items-center"}>
                    <Text className={"text-2xl font-bold opacity-70"}>Previous Sleeping</Text>
                    <Text className={"opacity-50"}>1 hour ago</Text>
                </View>
                <View className={"flex flex-row items-center"}>
                    <Icon name={"history"} />
                    <Text className={"px-1"}>Duration 4 hours and 31 minutes</Text>
                </View>
            </View>
        </View>
    )
}