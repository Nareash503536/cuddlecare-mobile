import React, { useState } from "react";
import {Button, View, Text, TouchableOpacity, StyleSheet} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {themeColors} from "../../theme";
import {GlobalStyles} from "../../constants/styles";
import {getFormattedDate, getFormattedTime} from "../../util/date";

export function DateTimePicker ({inputHandler,mode,value,lable,invalid,mindate=new Date('2023-07-26'),maxdate=new Date('2300-07-26')}) {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [dateTimePicker, setDateTimePicker] = useState(value);
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (data) => {
        if(mode =="time"){
            setDateTimePicker(getFormattedTime(data))
            inputHandler(name,data);
        }else
        {
            setDateTimePicker(getFormattedDate(data))
            inputHandler(name,data);
        }
        hideDatePicker();
    };

    const inputStyles = [styles.input];
    if(invalid){
        inputStyles.push(styles.invalidInput)
    }

    return (
        <View className={"my-1 mx-8 flex-1Z"}>
            <Text style={[styles.label,invalid && styles.inbalidLable ]} className={"text-xs mb-2 ml-1"} >{lable}</Text>
            {/*<Button title="Show Date Picker" onPress={showDatePicker} />*/}
            <TouchableOpacity
                className={"p-2 rounded-xl text-lg"} style={inputStyles}
                onPress={showDatePicker}
            >
                <Text className={' text-lg'} style={styles.grayinput}>{dateTimePicker}</Text>
            </TouchableOpacity>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode={mode}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                maximumDate={maxdate}
                minimumDate={mindate}


            />
        </View>
    );
};

const styles = StyleSheet.create({

    label: {
        color: themeColors.colorDark,
        textAlign:'center',
    },
    input: {
        backgroundColor: themeColors.bgInput(0.1),
        color: GlobalStyles.colors.primary700,
        width: 150,

    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top'
    },
    inbalidLable: {
        color: GlobalStyles.colors.error500
    },
    invalidInput: {
        backgroundColor:themeColors.bgInputDager(0.2),
    },
    grayinput:{
        color:'gray',
        textAlign:'center',
    }
});

export default DateTimePicker;



// How to access the component
// <DateTimePicker
//     mode='time' mode='date'
//     lable={"Date"}
//     inputHandler={inputChangedHandler}
// />

// How to use the inputHandler
// function inputChangedHandler(inputIdentifier, enteredValue) {
//     setInputs((curinputs) => {
//         return {
//             ...curinputs,
//             [inputIdentifier]: {value:enteredValue, isValid:true},
//         };
//     });
// }