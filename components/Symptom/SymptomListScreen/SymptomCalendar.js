import { Calendar, LocaleConfig } from 'react-native-calendars';
import React, { useState, useContext, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { AuthContext } from "../../../Context/AuthContext"
import SymptomsAPI from '../../../Api/SymptomsApi';
import { COLORS } from '../../../constants/theme';
import { useNavigation } from '@react-navigation/core';

export function SymptomCalendar() {

    const { updateKeys, baby } = useContext(AuthContext);
    const [markedDatesSymptoms, setMarkedDatesSymptoms] = useState([]);
    const [markedDates, setMarkedDates] = useState({});
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Assuming updateKeys and SymptomsAPI().getSymptoms are both async functions
                await updateKeys();
                const symptomDates = await SymptomsAPI().getSymptomDates(baby.babyID);
                setMarkedDatesSymptoms(symptomDates);
            } catch (error) {
                // Handle errors if needed
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    useEffect(() => {
        console.log("markedDatesSymptoms");
        console.log(markedDatesSymptoms);
        let updatedDates = {};
        for (let i = 0; i < markedDatesSymptoms.length; i++) {
            let date = markedDatesSymptoms[i];
            updatedDates = {
                ...updatedDates,
                [date]: { selected: true, selectedDotColor: '#BADEE3' }
            };
        }
        setMarkedDates(prevMarkedDates => ({ ...prevMarkedDates, ...updatedDates }));
    }, [markedDatesSymptoms]);

    const [selected, setSelected] = useState('');
    const date = new Date();
    const currentDate = date.toISOString().slice(0, 10);
    const Navigation = useNavigation();

    return (
        <>
            {
                isLoading ?
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        {/* <LottieView source={animation.Spinner} autoPlay loop /> */}
                        <ActivityIndicator size="large" color={COLORS.primary} />
                    </View> :
                    <View
                        style={{
                            backgroundColor: "#fff",
                            shadowColor: '#000',
                            elevation: 20,
                            borderRadius: 10,
                            marginHorizontal: 20,
                            marginBottom: 20,
                        }}
                    >
                        <Text
                            className={"text-center font-bold text-base my-5"}
                        >
                            Symptom Calendar
                        </Text>
                        <View className={"flex-1 left-4"}>
                            <View className={"flex-1 flex-row"}>
                                <View className="h-3 w-3 rounded-full m-3" style={{ backgroundColor: "#91C9CE" }}></View>
                                <Text>Today</Text>
                            </View>
                            <View className={"flex-1 flex-row"}>
                                <View className="h-3 w-3  rounded-full m-3" style={{ backgroundColor: "#BADEE3" }}></View>
                                <Text>Symptom recorded days</Text>
                            </View>
                        </View>
                        <Calendar
                            style={{
                                height: 350,
                                borderRadius: 10,
                            }}
                            current={currentDate}
                            onDayPress={day => {
                                Navigation.navigate("SymptomTimelineScreen", { date: day.dateString });
                            }}
                            markedDates={markedDates}
                            theme={{
                                todayTextColor: '#fff',
                                todayBackgroundColor: '#91C9CE',
                                arrowColor: '#91C9CE',
                                selectedDayBackgroundColor: '#BADEE3',
                                selectedDayTextColor: '#ffffff'
                            }}
                        />
                    </View>
            }
        </>

    )
}