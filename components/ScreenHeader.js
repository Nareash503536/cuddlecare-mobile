import {Image, Pressable, Text, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import React from "react";
import {useNavigation} from "@react-navigation/native";

export default function ScreenHeader({screen, screenName,image,BabyName}){
    const navigation = useNavigation();
    return(
        <View className={"flex flex-row w-full justify-between items-center px-6 py-2 my-3 border-b border-primary"}>
            <Pressable onPress={() => {navigation.navigate(screen)}}>
                <View>
                    <Icon name={"chevron-left"} size={20} />
                </View>
            </Pressable>
            <View className={"flex flex-col items-center ml-5"}>
                <Text className={"font-bold"}>{screenName}</Text>
                <Text>{BabyName}</Text>
            </View>
            <Image className={"h-8 w-8"} source={image} />
        </View>
    )
}