import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { ArrowLongRightIcon } from 'react-native-heroicons/outline';
import { COLORS } from "../../../constants/theme";
import { useNavigation } from '@react-navigation/core';

export default function EditProfileCard() {

    let navigation = useNavigation();

    return (
        <TouchableOpacity
            className={"flex-row justify-around items-center"}
            style={{
                backgroundColor: "#fff",
                borderRadius: 10,
                shadowColor: '#000',
                padding: 10,
                elevation: 20,
                marginHorizontal: 20,
                marginBottom: 20,
                backgroundColor: COLORS.primary
            }}
            onPress={() => navigation.navigate("EditProfile")}
        >
            <Text className={"text-xl pr-5 font-bold"} style={{color:"#fff"}}>
                Edit Profile
            </Text>
            <ArrowLongRightIcon size="20" color="white"/>
        </TouchableOpacity>
    )
}