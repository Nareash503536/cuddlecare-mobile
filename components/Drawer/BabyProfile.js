import { FlatList, View, Image, Text, TouchableOpacity } from "react-native";
import { AuthContext } from "../../Context/AuthContext";
import React, { useContext } from "react";
import images from "../../constants/images";
import { useNavigation } from "@react-navigation/native";



function renderBabyProfile({ ...babyDetails }) {
    return (
        <View className={"flex mx-2 items-center"}>
            <Image source={babyDetails.item.babyPicture ? { uri: babyDetails.item.babyPicture } : images.AddImage} style={{ borderWidth: 2, borderColor: "#8AADB2" }} className={"w-12 h-12 rounded-full"} />
            <Text className={"text-xs"} style={{ color: "gray" }}>{(babyDetails.item.babyName)}</Text>
        </View>
    );
}

export default function BabyProfile(props) {

    const navigation = useNavigation();

    const additionalComponent = (
        <TouchableOpacity className={"flex mx-2 items-center"} onPress={() => navigation.navigate("AddBabyScreen")}>
            <Image source={require("../../assets/images/babyAddBtn.png")} className={"w-12 h-12 rounded-full"} />
            <Text className={"text-xs"} style={{ color: "gray" }}>Add Baby</Text>
        </TouchableOpacity>
    );

    const { babySet } = useContext(AuthContext);

    return (
        <View className={"flex mt-3 justify-center"}>
            <FlatList
                contentContainerStyle={{ paddingBottom: 20 }}
                data={babySet}
                renderItem={renderBabyProfile}
                keyExtractor={(baby) => baby.babyID}
                horizontal
                ListFooterComponent={additionalComponent}
            />
        </View>
    )
}