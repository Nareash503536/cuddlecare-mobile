import DateTimePickerModal from 'react-native-modal-datetime-picker';
import React, { useContext } from 'react';
import { View, Text, Pressable, TextInput, TouchableOpacity, Image } from 'react-native';
import images from '../../constants/images';
import {solidfoodContext} from "./SolidFood";

export default function SelectDateTime() {

    const {
        isStartDatePickerVisible,
        setStartDatePickerVisible,
        startDate,
        setStartDate,
        isStartTimePickerVisible,
        setStartTimePickerVisible,
        startTime,
        setStartTime
    } = useContext(solidfoodContext);

    const showStartDatePicker = () => {
        setStartDatePickerVisible(true);
    };

    const hideStartDatePicker = () => {
        setStartDatePickerVisible(false);
    };

    const showStartTimePicker = () => {
        setStartTimePickerVisible(true);
    };

    const hideStartTimePicker = () => {
        setStartTimePickerVisible(false);
    };

    const handleStartDateConfirm = (date) => {
        let inputDate = date.toISOString().slice(0, 10);
        setStartDate(inputDate);
        hideStartDatePicker();
    };

    const handleStartTimeConfirm = (time) => {
        let inputTime = time.toISOString().slice(11, 16);
        //convert time to digital clock
        let hour = parseInt(inputTime.slice(0, 2));
        let minute = inputTime.slice(3, 5);
        if (hour > 12) {
            hour = hour - 12;
            inputTime = hour.toString() + ":" + minute + " PM";
        }
        else if (hour == 12) {
            inputTime = hour.toString() + ":" + minute + " PM";
        }
        else if (hour == 0) {
            hour = 12;
            inputTime = hour.toString() + ":" + minute + " AM";
        }
        else {
            inputTime = hour.toString() + ":" + minute + " AM";
        }
        console.log(inputTime);
        setStartTime(inputTime);
        //
        hideStartTimePicker();
    };

    return (
        <View className={"flex-1 flex-row justify-around my-10"}>
            <TouchableOpacity
                onPress={showStartDatePicker}
                className={"border-b-2 pl-8"}
            >
                {/* <TextInput
                    value={startDate}
                    placeholder="Date of check"
                    editable={false}
                /> */}
                <Text className="opacity-50">
                    {startDate ? startDate.toString() : "Date of check"}
                </Text>
                <Image
                    source={images.calendarInSymptoms}
                    className={"absolute left-1 bottom-1 w-5 h-5"}
                    />
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isStartDatePickerVisible}
                mode="date"
                onConfirm={handleStartDateConfirm}
                onCancel={hideStartDatePicker}
            />
            <TouchableOpacity
                onPress={showStartTimePicker}
                className="border-b-2 pl-8"
                >
                {/* <TextInput
                    value={startTime.toString()}
                    placeholder="Time of check"
                    editable={false}
                /> */}
                <Text className="opacity-50">
                    {startTime ? startTime.toString() : "Time of check"}
                </Text>
                <Image
                    source={images.time}
                    className={"absolute left-1 bottom-1 w-5 h-5"}
                    />
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isStartTimePickerVisible}
                mode="time"
                onConfirm={handleStartTimeConfirm}
                onCancel={hideStartTimePicker}
                timeZoneOffsetInMinutes={0}
            />
        </View>
    )
}