import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { ArrowLongRightIcon } from 'react-native-heroicons/outline';
import { COLORS } from "../../constants/theme";
import { useNavigation } from '@react-navigation/core';

export default function EditProfileCard() {

    let navigation = useNavigation();

    return (
        <TouchableOpacity
            className={"flex-row justify-around items-center"}
            style={{
                backgroundColor: "#fff",
                borderRadius: 20,
                shadowColor: '#000',
                elevation: 20,
                height: 100,
                marginHorizontal: 20,
                marginBottom: 20,
            }}
            onPress={() => navigation.navigate("EditProfile")}
        >
            <Text className={"text-xl font-extrabold"}>
                Edit Profile
            </Text>
            <ArrowLongRightIcon size="40" color={COLORS.secondary}/>
        </TouchableOpacity>
    )
}