import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from 'react-native';
import React, { createContext, useState } from "react";
import SymptomHeader from "../../components/Symptom/SymptomListScreen/SymptomHeader";
import { SymptomTimeline } from '../../components/Symptom/SymptomListScreen/SymptomTimeline';

export const symptomContext = createContext();

export default function SymptomTimelineScreen() {
    return (
        <SafeAreaView>
            <SymptomHeader />
            <ScrollView>
                <SymptomTimeline />
            </ScrollView>
        </SafeAreaView>
    )
}