import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {themeColors} from "../theme";
import {CalendarDaysIcon, ClockIcon} from "react-native-heroicons/solid";
import {CheckCircleIcon} from "react-native-heroicons/outline";

export function Logs() {
    return (
        <ScrollView className={"flex space-y-2"}>
            <TouchableOpacity className={"flex-row rounded-xl p-2  mx-2 space-x-3 border-b-2 border-gray-300"}>
                <View className={"rounded-full p-1 bg-white"}>
                    <Image source={require('../assets/images/sleep.png')} style={{width:40,height:40}}/>
                </View>
                <View className={"flex justify-center flex-1"}>
                    <Text className={" text-gray-500 font-semibold "} >Sleeping</Text>
                    <View className={"flex-row items-center space-x-2"}>
                        <ClockIcon size="20" color="gray"  />
                        <Text className={" text-gray-500 text-sm"}> 7.32 PM</Text>
                        <Text className={" text-gray-500 text-sm"}> Today, July 11</Text>
                    </View>
                </View>
                <View className={"flex-row justify-center  space-x-3 "}>
                    <View className={"flex-row rounded-full p-2 border border-white space-x-1"} >
                        <Text className={" text-green-700 text-xs"}>30min ago</Text>
                        <CheckCircleIcon size="18" color="green"  />
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity className={"flex-row rounded-xl p-2  mx-2 space-x-3 border-b-2 border-gray-300"}>
                <View className={"rounded-full p-1 bg-white"}>
                    <Image source={require('../assets/images/milkBottle.png')} style={{width:40,height:40}}/>
                </View>
                <View className={"flex justify-center flex-1"}>
                    <Text className={" text-gray-500 font-semibold "} >Feeding</Text>
                    <View className={"flex-row items-center space-x-2"}>
                        <ClockIcon size="20" color="gray"  />
                        <Text className={" text-gray-500 text-sm"}> 3.48 PM</Text>
                        <Text className={" text-gray-500 text-sm"}> Today, July 11</Text>
                    </View>
                </View>
                <View className={"flex-row justify-center  space-x-3 "}>
                    <View className={"flex-row rounded-full p-2 border border-white space-x-1"} >
                        <Text className={" text-green-700 text-xs"}>3h ago</Text>
                        <CheckCircleIcon size="18" color="green"  />
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity className={"flex-row rounded-xl p-2  mx-2 space-x-3 border-b-2 border-gray-300"}>
                <View className={"rounded-full p-1 bg-white"}>
                    <Image source={require('../assets/images/diaper.png')} style={{width:40,height:40}}/>
                </View>
                <View className={"flex justify-center flex-1"}>
                    <Text className={" text-gray-500 font-semibold "} >Diper Change</Text>
                    <View className={"flex-row items-center space-x-2"}>
                        <ClockIcon size="20" color="gray"  />
                        <Text className={" text-gray-500 text-sm"}> 11.32 AM</Text>
                        <Text className={" text-gray-500 text-sm"}> Today, July 11</Text>
                    </View>
                </View>
                <View className={"flex-row justify-center  space-x-3 "}>
                    <View className={"flex-row rounded-full p-2 border border-white space-x-1"} >
                        <Text className={" text-green-700 text-xs"}>7h ago</Text>
                        <CheckCircleIcon size="18" color="green"  />
                    </View>
                </View>
            </TouchableOpacity>

        </ScrollView>
    )
}