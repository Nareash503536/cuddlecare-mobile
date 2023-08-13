import {Text, View} from "react-native";
import DateTimePicker from "./DateTimePicker";
import {getFormattedDate} from "../../util/date";
import React from "react";

export function DateAndTime() {
    return (
        <View  className={"flex-row justify-around mb-6"} >
            <DateTimePicker
                mode='Date'
                lable={"Pick a Date"}
                value={getFormattedDate(new Date())}
                name={'date'}
            />
            <DateTimePicker
                mode='time'
                lable={"Pick a time"}
                value='02:30 pm'
                name={'time'}
            />
        </View>
    )
}