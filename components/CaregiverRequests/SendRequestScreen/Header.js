import React, { useContext } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { themeColors } from "../../../theme";
import { Bars3CenterLeftIcon } from "react-native-heroicons/mini";
import { BellIcon } from "react-native-heroicons/outline";
import { RequestContext } from '../../../screens/CaregiverRequests/SendRequestScreen';

export default function Header(){

    const {setOpen} = useContext(RequestContext);

    return (
        <View className="m-4 flex-row  items-center">
            <TouchableOpacity className={"rounded-full p-1"} style={{ backgroundColor: themeColors.btnColor }}
                onPress={() => setOpen((prevOpen) => !prevOpen)}
            >
                <Bars3CenterLeftIcon size="27" color="white" />
            </TouchableOpacity>

            <View className=" flex-1 space-x-2 items-center">
                <Image source={require('../../../assets/images/appName.png')}
                    style={{ width: 150, height: 30 }} />
            </View>
            <TouchableOpacity className={"rounded-full p-1"} style={{ backgroundColor: themeColors.btnColor }}>
                <BellIcon size="27" color="white" />
            </TouchableOpacity>
        </View>
    )
}