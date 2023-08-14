import { Calendar, LocaleConfig } from 'react-native-calendars';
import React, { useState } from 'react';
import { View, Text } from 'react-native';

export const SymptomCalendar = () => {
    const [selected, setSelected] = useState('');
    const date = new Date();
    const currentDate = date.toISOString().slice(0, 10)
    return (
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
            <Calendar
                style={{
                    height: 350,
                    borderRadius: 10,
                }}
                theme={{
                    todayTextColor: '#fff',
                    todayBackgroundColor: '#91C9CE',
                    arrowColor: '#91C9CE',
                }}
                current={currentDate}
                onDayPress={day => {
                    setSelected(day.dateString);
                }}
                markedDates={{
                    [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
                }}
            />
        </View>
    )
}