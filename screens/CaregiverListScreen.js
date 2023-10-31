import {View, Text, Pressable, Image} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import React, {useContext, useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {AuthContext} from "../Context/AuthContext";
import GeneralAPI from "../Api/GeneralAPI";
import images from "../constants/images";
import FilledButton from "../components/filledButton";

export function CaregiverListScreen(){
    let navigation = useNavigation();
    const { updateKeys, baby } = useContext(AuthContext);
    const [currentCaregiverName, setCurrentCaregiverName] = useState(null);
    const [currentCaregiverPicture, setCurrentCaregiverPicture] = useState(null);

    useEffect(() => {
        getCaregiver();
    }, [])

    const getCaregiver = async () => {
        await updateKeys();
        const response = await GeneralAPI().returnCurrentCaregivers(baby.babyID);
        setCurrentCaregiverName(response.data.user.username);
        setCurrentCaregiverPicture(response.data.user.profilePicture);
    }

    const addList = () => {
        navigation.navigate("ToDoList");
    }

    return (
        <SafeAreaView>
            <View className={"flex flex-row w-full justify-between items-center px-6 py-2 my-3 border-b border-primary"}>
                <Pressable onPress={() => {navigation.navigate("Baby")}}>
                    <View>
                        <Icon name={"chevron-left"} size={20} />
                    </View>
                </Pressable>
                <View className={"flex flex-col items-center ml-5"}>
                    <Text className={"font-bold"}>Caregiver List</Text>
                    <Text>Baby Name</Text>
                </View>
                <Image className={"h-8 w-8"} source={require("../assets/images/caregiver.png")} />
            </View>
            <View
                className={"m-5 p-5 flex-col justify-around rounded-xl"}
                style={{
                    backgroundColor: "#fff",
                    shadowColor: '#000',
                    elevation: 20,
                }}
            >
                <View className="flex-row justify-between align-middle">
                    <View className={"justify-center"}>
                        <Image
                            source={currentCaregiverPicture ? { uri: currentCaregiverPicture } : images.AddImage}
                            className={"rounded-full w-20 h-20"}
                        />
                    </View>
                    <FilledButton title={"Add To Do List"} icon={"plus"} onPress={addList}/>
                </View>
                <View className={"m-2"}>
                    <Text className={""}>Caregiver Name</Text>
                    <Text className={"font-extrabold text-base"}>{currentCaregiverName}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}