import React, { createContext, useState } from 'react';
import { SafeAreaView, TouchableOpacity, Text } from 'react-native';
import SymptomHeader from "../../components/Symptom/SymptomListScreen/SymptomHeader";
import SymptomContainer from "../../components/Symptom/SymptomListScreen/SymptomContainer";
import { PlusSmallIcon } from "react-native-heroicons/solid";
import { themeColors } from "../../theme";
import { useNavigation } from "@react-navigation/native";
import { View, ScrollView, RefreshControl } from 'react-native';
import { SymptomCalendar } from '../../components/Symptom/SymptomListScreen/SymptomCalendar';
import { COLORS } from '../../constants/theme';
import { ActivityIndicator } from 'react-native';

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


export const SymptomListContext = createContext();

export const SymptomList = () => {
    const [isLoading, setLoading] = useState(false);

    return (
        <SymptomListContext.Provider value={{
            setLoading
        }}>
            {isLoading ? 
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    {/* <LottieView source={animation.Spinner} autoPlay loop /> */}
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View> :
                <SafeAreaView>
                    <ScrollView
                        refreshControl = {
                            <RefreshControl
                                refreshing={isLoading}
                                onRefresh={() => {
                                    setLoading(true);
                                    setTimeout(() => {
                                        setLoading(false);
                                    }, 2000);
                                }}
                            />
                        }>
                        <SymptomHeader />
                        <SymptomContainer />
                        <SymptomCalendar />
                    </ScrollView>
                    <SymptomAddButton />
                </SafeAreaView>
            }
        </SymptomListContext.Provider>
    )
}