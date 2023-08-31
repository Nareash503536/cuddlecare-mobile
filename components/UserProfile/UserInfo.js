import React from 'react';
import { Image, SafeAreaView } from 'react-native';
import { View, Text } from 'react-native';
import images from '../../constants/images';
import { COLORS } from "../../constants/theme";

export default function UserInfo() {
    return (
        <View
            style={{
                backgroundColor: "#fff",
                shadowColor: '#000',
                elevation: 20,
                borderRadius: 10,
                margin: 20,
                width: "90%",
                padding: 20,
            }}
        >
            <View
                className={"rounded-full"}
                style={{
                    backgroundColor: COLORS.primary,
                    position: "absolute",
                    height: 100,
                    width: 100,
                    opacity: 0.3,
                    bottom: 180,
                }}
            >
            </View>
            <View
                className={"rounded-full"}
                style={{
                    backgroundColor: COLORS.primary,
                    position: "absolute",
                    height: 200,
                    width: 200,
                    opacity: 0.3,
                    left: 150,
                    top: 240
                }}
            >
            </View>

            <View
                className={"rounded-full"}
                style={{
                    backgroundColor: COLORS.primary,
                    position: "absolute",
                    height: 150,
                    width: 150,
                    opacity: 0.3,
                    bottom: 280,
                    left: 220,
                }}
            >
            </View>
            <Image
                source={images.UserImage}
                className={"w-48 h-48 rounded-full mx-auto"}
            />
            <Text className={"text-4xl font-bold text-center"}>Shamika Fernando</Text>
            <Text className={"text-2xl font-normal text-center"}>Parent</Text>
        </View>
    )
}