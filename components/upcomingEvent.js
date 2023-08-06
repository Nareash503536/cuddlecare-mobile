import {Image, Text, TouchableOpacity, View} from "react-native";
import {themeColors} from "../theme";
import {ClockIcon, CalendarDaysIcon, CheckIcon} from "react-native-heroicons/solid";
import {useNavigation} from "@react-navigation/native";

export function UpcomingEvent() {

    return (
        <View className={"flex-row rounded-xl p-3 shadow-2xl  mx-2 space-x-3"} style={{backgroundColor:themeColors.colornormal,shadowColor: "#000"}}>
            <View className={"rounded-full p-1 bg-white"}>
                <Image source={require('../assets/images/syringe.png')} style={{width:40,height:40}}/>
            </View>
            <View className={"flex justify-center flex-1"}>
                <Text className={" text-gray-500 text-lg text-white font-semibold"} style={{letterSpacing:1}} >Vaccination</Text>
                <View className={"flex-row items-center space-x-2"} >
                    <ClockIcon size="27" color="white" />
                    <Text className={" text-white"}> 12 Days more</Text>
                </View>
            </View>
            <View className={"flex-row justify-center items-center space-x-3"}>
                <TouchableOpacity className={"rounded-full p-2 border border-white"} style={{backgroundColor:themeColors.btnColorop(1)}} >
                    <CalendarDaysIcon size="27" color="white"  />
                </TouchableOpacity>
                <TouchableOpacity className={"rounded-full p-2 border border-white"} >
                    <CheckIcon size="27" color="white"  />
                </TouchableOpacity>
            </View>

        </View>
    )
}
