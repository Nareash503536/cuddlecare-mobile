import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {themeColors} from "../theme";
import {CalendarDaysIcon, ClockIcon} from "react-native-heroicons/solid";
import {CheckCircleIcon} from "react-native-heroicons/outline";

export function Logs2() {
    return (
        <ScrollView className={"flex space-y-2"}>
            <TouchableOpacity className={"flex-row rounded-xl p-2  mx-2 space-x-3 border-b-2 border-gray-300"}>
                <View className={"rounded-full p-1 bg-white"}>
                    <Image source={require('../assets/images/chart.png')} style={{width:40,height:40}}/>
                </View>
                <View className={"flex justify-center flex-1"}>
                    <Text className={" text-gray-500 font-semibold "} >5kg  32cm 18cm</Text>
                    <View className={"flex-row items-center space-x-2"}>
                        <ClockIcon size="20" color="gray"  />
                        <Text className={" text-gray-500 text-sm"}> Today, July 11</Text>
                    </View>
                </View>
                <View className={"flex-row justify-center  space-x-3 "}>
                    <View className={"flex-row rounded-full p-2 border border-white space-x-1"} >
                        <Text className={" text-green-700 text-xs"}>16Days ago</Text>
                        <CheckCircleIcon size="18" color="green"  />
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity className={"flex-row rounded-xl p-2  mx-2 space-x-3 border-b-2 border-gray-300"}>
                <View className={"rounded-full p-1 bg-white"}>
                    <Image source={require('../assets/images/chart.png')} style={{width:40,height:40}}/>
                </View>
                <View className={"flex justify-center flex-1"}>
                    <Text className={" text-gray-500 font-semibold "} >5kg  32cm 18cm</Text>
                    <View className={"flex-row items-center space-x-2"}>
                        <ClockIcon size="20" color="gray"  />
                        <Text className={" text-gray-500 text-sm"}> Today, July 11</Text>
                    </View>
                </View>
                <View className={"flex-row justify-center  space-x-3 "}>
                    <View className={"flex-row rounded-full p-2 border border-white space-x-1"} >
                        <Text className={" text-green-700 text-xs"}>16Days ago</Text>
                        <CheckCircleIcon size="18" color="green"  />
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity className={"flex-row rounded-xl p-2  mx-2 space-x-3 border-b-2 border-gray-300"}>
                <View className={"rounded-full p-1 bg-white"}>
                    <Image source={require('../assets/images/chart.png')} style={{width:40,height:40}}/>
                </View>
                <View className={"flex justify-center flex-1"}>
                    <Text className={" text-gray-500 font-semibold "} >5kg  32cm 18cm</Text>
                    <View className={"flex-row items-center space-x-2"}>
                        <ClockIcon size="20" color="gray"  />
                        <Text className={" text-gray-500 text-sm"}> Today, July 11</Text>
                    </View>
                </View>
                <View className={"flex-row justify-center  space-x-3 "}>
                    <View className={"flex-row rounded-full p-2 border border-white space-x-1"} >
                        <Text className={" text-green-700 text-xs"}>16Days ago</Text>
                        <CheckCircleIcon size="18" color="green"  />
                    </View>
                </View>
            </TouchableOpacity>

        </ScrollView>
    )
}
