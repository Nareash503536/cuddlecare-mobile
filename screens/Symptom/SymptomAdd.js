import { SafeAreaView } from "react-native-safe-area-context";
import SymptomHeader from "../../components/Symptom/SymptomListScreen/SymptomHeader";
import SelectDateTime from "../../components/Symptom/SymptomAddScreen/SelectDateTime";
import SymptomContainerWrap from "../../components/Symptom/SymptomAddScreen/SymptomContainerWrap";
import { ScrollView } from 'react-native';
import React, { createContext, useState } from "react";

export const symptomContext = createContext();

export default function SymptomAdd() {
    const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
    const [startTime, setStartTime] = useState('');
    return (
        <symptomContext.Provider value={{
            isStartDatePickerVisible,
            setStartDatePickerVisible,
            startDate,
            setStartDate,
            isStartTimePickerVisible,
            setStartTimePickerVisible,
            startTime,
            setStartTime
        }}>
            <SafeAreaView>
                <ScrollView>
                    <SymptomHeader />
                    <SelectDateTime />
                    <SymptomContainerWrap />
                </ScrollView>
            </SafeAreaView>
        </symptomContext.Provider>
    )
}