import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import images from '../../../constants/images';

export default function OptionSet() {
    return (
        <View className={"flex-row flex-wrap justify-around m-5"}>
            <TouchableOpacity
                className={"flex-row justify-between items-center w-5/6"}
                style={{
                    height: 100,
                    backgroundColor: "#fff",
                    borderRadius: 20,
                    shadowColor: '#000',
                    elevation: 20,
                    padding: 20
                }}
            >
                <Image
                    className={"h-14 w-14"}
                    source={images.caregiver}
                />
                <Text className={"text-base font-semibold text-center"}>
                    Manage Caregivers
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                className={"flex-row justify-between items-center w-5/6 m-3"}
                style={{
                    height: 100,
                    backgroundColor: "#fff",
                    borderRadius: 20,
                    shadowColor: '#000',
                    elevation: 20,
                    padding:20
                }}
            >
                <Image
                    className={"h-14 w-14"}
                    source={images.baby}
                />
                <Text className={"text-base text-center font-semibold"}>
                    Manage Babies
                </Text>
            </TouchableOpacity>
        </View>
    )
}