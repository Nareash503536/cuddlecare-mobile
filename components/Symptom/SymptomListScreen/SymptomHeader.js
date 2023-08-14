import { Image, Pressable, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import images from "../../../constants/images";
// import { goBack } from "@react-navigation/routers/lib/typescript/src/CommonActions";

export default function SymptomHeader() {
    const navigation = useNavigation();
    return (
        <View className={"top-0 left-0 right-0 flex flex-row w-full justify-between items-center px-6 py-2 my-3 border-b border-primary"}>
            <Pressable onPress={() => { navigation.goBack() }}>
                <View>
                    <Icon name={"chevron-left"} size={20} />
                </View>
            </Pressable>
            <View className={"flex flex-col items-center ml-5"}>
                <Text className={"font-bold"}>Symptom Activity</Text>
                <Text>Baby Name</Text>
            </View>
            <Image className={"h-8 w-8"} source={images.sick} />
        </View>
    )
}