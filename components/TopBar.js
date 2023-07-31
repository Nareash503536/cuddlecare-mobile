import {Image, TouchableOpacity, View} from "react-native";
import {themeColors} from "../theme";
import {Bars3CenterLeftIcon} from "react-native-heroicons/mini";
import {BellIcon} from "react-native-heroicons/outline";
import React from "react";

export function TopBar () {
    return(
        <View className="mx-4  mt-3 flex-row  items-center">
            <TouchableOpacity className={"rounded-full p-1"} style={{backgroundColor:themeColors.btnColor}}>
                <Bars3CenterLeftIcon size="27" color="white" />
            </TouchableOpacity>

            <View className=" flex-1 space-x-2 items-center">
                <Image source={require('../assets/images/appName.png')}
                       style={{width:150,height:30}} />
            </View>
            <TouchableOpacity className={"rounded-full p-1"} style={{backgroundColor:themeColors.btnColor}}>
                <BellIcon size="27" color="white" />
            </TouchableOpacity>
        </View>
        )


}