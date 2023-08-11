import React from 'react';
import { SafeAreaView, TouchableOpacity, Text } from 'react-native';
import SymptomHeader from "../../components/Symptom/SymptomListScreen/SymptomHeader";
import SymptomContainer from "../../components/Symptom/SymptomListScreen/SymptomContainer";
import { PlusSmallIcon } from "react-native-heroicons/solid";
import { themeColors } from "../../theme";
import { useNavigation } from "@react-navigation/native";
import { SymptomData } from '../../components/Symptom/SymptomData';
import Timeline from 'react-native-timeline-flatlist';
import { View, ScrollView } from 'react-native';

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
                <Timeline
                    data={SymptomData}
                    circleSize={40}
                    circleColor='#477276'
                    lineColor='#477276'
                    timeContainerStyle={{ minWidth: 52}}
                    timeStyle={{
                        textAlign: 'center',
                        backgroundColor: '#91C9CE',
                        color: 'white', padding: 5,
                        borderRadius: 13,
                        marginBottom: 10,
                        marginLeft: 10,
                        marginRight: 10,
                    }}
                    descriptionStyle={{ color: 'gray', marginLeft: 10 }}
                    titleStyle={{ color: '#477276', fontWeight: 'bold', bottom: 5, marginLeft: 10 }}
                    options={{
                        style: { paddingTop: 5 }
                    }}
                    isUsingFlatlist={true}
                    innerCircle={'icon'}
                />
            </ScrollView>
            <SymptomAddButton />

        </SafeAreaView>
    )
}