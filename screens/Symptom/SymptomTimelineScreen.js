import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, ActivityIndicator, View, TouchableOpacity } from 'react-native';
import React, { createContext, useState } from "react";
import SymptomHeader from "../../components/Symptom/SymptomListScreen/SymptomHeader";
import { SymptomTimeline } from '../../components/Symptom/SymptomListScreen/SymptomTimeline';
import { COLORS } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import images from "../../constants/images";
import { Image } from "react-native";
import { themeColors } from "../../theme";

export const timelineContext = createContext();

export default function SymptomTimelineScreen() {
    const [isLoading, setIsLoading] = useState(false);

    navigation = useNavigation();

    const SymptomAddButton = () => {

        const navigation = useNavigation();

        return (
            <TouchableOpacity
                className={"absolute bottom-20 right-5 shadow-2xl rounded-full p-2"}
                style={{ backgroundColor: themeColors.btnColor, shadowColor: "#000" }}
                onPress={() => navigation.navigate('SymptomList')}
            >
                <Image
                    source={images.view}
                    className="h-8 w-8"
                />
            </TouchableOpacity>
        )
    }

    return (
        <>
            {
                isLoading ?
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }
                    } >
                        {/* <LottieView source={animation.Spinner} autoPlay loop /> */}
                        < ActivityIndicator size="large" color={COLORS.primary} />
                    </View > :
                    <SafeAreaView>

                        <SymptomHeader />
                        <View>
                            <timelineContext.Provider
                                value={{
                                    setIsLoading,
                                    isLoading
                                }}
                            >
                                <SymptomTimeline />
                            </timelineContext.Provider>
                        </View>
                        {/* <SymptomAddButton /> */}
                    </SafeAreaView>
            }
        </>
    )
}