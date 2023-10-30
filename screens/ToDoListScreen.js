import {SafeAreaView} from "react-native-safe-area-context";
import {View, Text} from "react-native";
import ToDoHeader from "../components/toDoHeader";
import {Calendar} from "react-native-calendars";
import React from "react";
import {useNavigation} from "@react-navigation/core";

export function ToDoListScreen(){
    const date = new Date();
    const currentDate = date.toISOString().slice(0, 10);
    const Navigation = useNavigation();

    return(
        <SafeAreaView>
            <ToDoHeader screen={"CaregiverList"}/>
            <View>
                <Text className={"text-center font-bold text-2xl"}>Select Date</Text>
            </View>
            <View className={"py-40"}>
                <Calendar
                    style={{
                        height: 350,
                        borderRadius: 10,
                    }}
                    current={currentDate}
                    onDayPress={day => {
                        Navigation.navigate("AddTask", { date: day.dateString });
                    }}
                    // markedDates={markedDates}
                    theme={{
                        todayTextColor: '#fff',
                        todayBackgroundColor: '#91C9CE',
                        arrowColor: '#91C9CE',
                        selectedDayBackgroundColor: '#BADEE3',
                        selectedDayTextColor: '#ffffff'
                    }}
                />
            </View>
        </SafeAreaView>
    );
}