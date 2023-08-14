import React, {useState} from 'react';
import { SafeAreaView, TouchableOpacity, Text } from 'react-native';
import SymptomHeader from "../../components/Symptom/SymptomListScreen/SymptomHeader";
import SymptomContainer from "../../components/Symptom/SymptomListScreen/SymptomContainer";
import { PlusSmallIcon } from "react-native-heroicons/solid";
import { themeColors } from "../../theme";
import { useNavigation } from "@react-navigation/native";
import { View, ScrollView } from 'react-native';
import { SymptomTimeline } from '../../components/Symptom/SymptomListScreen/SymptomTimeline';
import { SymptomCalendar } from '../../components/Symptom/SymptomListScreen/SymptomCalendar';

const SymptomAddButton = () => {

    const navigation = useNavigation();

    return (
        <TouchableOpacity
            className={"absolute bottom-12 right-5 shadow-2xl rounded-full p-1"}
            style={{ backgroundColor: themeColors.btnColor, shadowColor: "#000" }}
            onPress={() => navigation.navigate('SymptomAdd')}
        >
            <PlusSmallIcon size="40" color="white" />
        </TouchableOpacity>
    )
}

export const SymptomList = () => {
    return (
        <SafeAreaView>
            <ScrollView>
                <SymptomHeader />
                <SymptomContainer />
                {/* <SymptomTimeline /> */}
                <SymptomCalendar/>
            </ScrollView>
            <SymptomAddButton />

        </SafeAreaView>
    )
}