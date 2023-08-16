import { SafeAreaView } from "react-native-safe-area-context";
import SymptomHeader from "../../components/Symptom/SymptomListScreen/SymptomHeader";
import SelectDateTime from "../../components/Symptom/SymptomAddScreen/SelectDateTime";
import SymptomContainerWrap from "../../components/Symptom/SymptomAddScreen/SymptomContainerWrap";
import { ScrollView } from 'react-native';
import React, { createContext, useState } from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native";
import { COLORS } from "../../constants/theme";

export const symptomContext = createContext();

export default function SymptomAdd() {
    const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
    const [startTime, setStartTime] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    return (
        <symptomContext.Provider value={{
            isStartDatePickerVisible,
            setStartDatePickerVisible,
            startDate,
            setStartDate,
            isStartTimePickerVisible,
            setStartTimePickerVisible,
            startTime,
            setStartTime,
            setIsLoading
        }}>
            {
                isLoading ?
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        {/* <LottieView source={animation.Spinner} autoPlay loop /> */}
                        <ActivityIndicator size="large" color={COLORS.primary} />
                    </View> :
                    <SafeAreaView>
                        <ScrollView>
                            <SymptomHeader />
                            <SelectDateTime />
                            <SymptomContainerWrap />
                        </ScrollView>
                    </SafeAreaView>

            }
        </symptomContext.Provider>
    )
}