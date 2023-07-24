import React from "react";
import {Text, View, Image, TouchableOpacity, Platform} from 'react-native';
import {StatusBar} from "expo-status-bar";
import {SafeAreaView} from "react-native-safe-area-context";
import {useNavigation} from "@react-navigation/native";
import {themeColors} from "../theme";



export function ReminderDetails() {

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Reminder Details</Text>
            </View>
        </SafeAreaView>
    )
}

