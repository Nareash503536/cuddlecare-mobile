import React from 'react';
import { View, Text } from 'react-native';
import { Card } from "native-base";

export default function InfoCard() {
    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
            }}
        >
            <View
                className={"flex-col justify-center items-center"}
                style={{
                    width: 100,
                    height: 100,
                    backgroundColor: "#fff",
                    borderRadius: 20,
                    shadowColor: '#000',
                    elevation: 20,
                    marginHorizontal: 20,
                    marginBottom: 20,
                }}
            >
                <Text className={"text-sm font-semibold"}
                    style={{
                        opacity: 0.5
                    }}>
                Babies
                </Text>
                <Text className={"text-2xl font-extrabold"}>3</Text>
            </View>
            <View
                className={"flex-col justify-center items-center"}
                style={{
                    width: 100,
                    height: 100,
                    backgroundColor: "#fff",
                    borderRadius: 20,
                    shadowColor: '#000',
                    elevation: 20,
                    marginHorizontal: 20,
                    marginBottom: 20,
                }}
            >
                <Text className={"text-sm font-semibold"}
                    style={{
                        opacity: 0.5
                    }}>
                    Caregivers
                </Text>
                <Text className={"text-2xl font-extrabold"}>2</Text>
            </View>
        </View>
    )
}