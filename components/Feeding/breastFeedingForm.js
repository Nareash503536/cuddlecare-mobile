import { StyleSheet, View, Text, SafeAreaView} from 'react-native';
import Input from '../Growth/Input';
import React, {useContext, useState} from "react";
import Button from "../UI/Button";
import {GlobalStyles} from "../../constants/styles";
import DateTimePicker from "./DateTimePicker";

import {getFormattedDate, getFormattedTime} from "../../util/date";
import {ExpenseApiPost, ExpenseEdit} from "../../Api/ExpenseApi";
import {themeColors} from "../../theme";
import {useNavigation, useRoute} from "@react-navigation/native";
import {TopBar} from "../TopBar";
import {AuthContext} from "../../Context/AuthContext";
import axios from "axios";
import {BASE_URL} from "../../config";
import Toast from "react-native-toast-message";
import {abs} from "react-native-reanimated";
import DropdownComponentBfeed from "./DropdownComponentBfeed";


export default function breastFeedingForm() {
    const {updateKeys} = useContext(AuthContext);
    let navigation = useNavigation();
    const route = useRoute();
    console.log("route params here",route.params);

    const { Editdata, title } = route.params ?? {};

    console.log("this and then");
    console.log("Editdata date is here",Editdata,"title is here",title);
    const [totalTime, setTotalTime] = useState(null);

    const datas = [
        { label: 'Left Side', value: 'Left' },
        { label: 'Right Side', value: 'Right' },


    ];


    const [inputs, setInputs] = useState({

        side: {
            value: Editdata?Editdata.expenseName:'koko',
            isValid: true,
        },

        stime: {
            value: Editdata?Editdata.date:new Date().getTime(),

            isValid: true,
        },
        etime: {
            value: Editdata?Editdata.date:new Date().getTime(),

            isValid: true,
        },
        date: {
            value: Editdata?Editdata.date:new Date(),

            isValid: true,
        },
    });
    function cancelHandler() {
        navigation.goBack();
    }

    const EditExpense = async () => {
        await updateKeys();
        let editExpenseData = {
            amount: +inputs.amount.value,
            expenseName: inputs.expenseName.value,
            notes: inputs.notes.value,
            date: inputs.date.value, //getFormattedDate(inputs.date.value)
        }
        const jsonData = JSON.stringify(editExpenseData);
        const apiURL = BASE_URL + "/expenses/edit/"+Editdata.expenseID;
        const response = await axios.put(apiURL,jsonData,{
            headers: {
                "Content-Type": "application/json",
            },

        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    }

    const PostExpense = async () => {
        await updateKeys();

       await calculateTotalTime(inputs.etime.value,inputs.stime.value);
        const apiURL = BASE_URL+ '/BreastFeeding/add';

        let bfeedData = {
            side: inputs.side.value,
            starttime: inputs.stime.value,
            endtime:inputs.etime.value,
            feedingDuration: totalTime,
            feedingDate: inputs.date.value
        }
        console.log("bfeedData",bfeedData)
        const jsonData = JSON.stringify(bfeedData);
        const response = await axios.post(apiURL, jsonData, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            Toast.show({
                type: "success",
                text1: "Record saved",
                text2: "Your Breast Feeding record have been saved successfully",
            })


        }).catch((err) => {
            Toast.show({
                type: "error",
                text1: "Error saving records",
                text2: "There was an error saving your feeding record. Please try again.",
            })
            console.log(err);
        });
    }
    function inputChangedHandler(inputIdentifier, enteredValue)
    {
        setInputs((curinputs) => {
            return {
                ...curinputs,
                [inputIdentifier]: {value:enteredValue, isValid:true},
            };
        });
    }

    const convertTimeToMilliseconds = (timeString) => {
        const [hours, minutes] = timeString.split(":").map(Number);
        return (hours * 60 + minutes) * 60 * 1000; // Convert to milliseconds
    };

    const calculateTotalTime = (endTime,startTime) => {
        const elapsedTime =  Math.abs(convertTimeToMilliseconds(endTime) - convertTimeToMilliseconds(startTime));
        console.log("elapsed time",elapsedTime,convertTimeToMilliseconds(endTime),convertTimeToMilliseconds(startTime));
        const seconds = Math.floor((elapsedTime / 1000) % 60);
        const minutes = Math.floor((elapsedTime / 1000 / 60) % 60);
        const hours = Math.floor((elapsedTime / 1000 / 3600) % 24);
        console.log("hours",hours,"minutes",minutes,"seconds",seconds);
        setTotalTime(`${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`);
    };
    const padTime = time => {
        return String(time).padStart(2, '0');
    };
    function submitHandler() {
        console.log("submit");
        console.log(+inputs.amount.value, inputs.expenseName.value, inputs.notes.value,inputs.date.value);
        const ExpenseData = {
            amount:+inputs.amount.value,
            expenseName:inputs.expenseName.value,
            notes:inputs.notes.value,
            date:inputs.date.value,
        }
        console.log("came to expense data",ExpenseData);
        const positiveNumberRegex = /^\d+(\.\d+)?$/;

        const expenseNameIsValid = (ExpenseData.expenseName) && ExpenseData.expenseName.length < 50;

        const amountIsValid = !isNaN(ExpenseData.amount)&&positiveNumberRegex.test(ExpenseData.amount);

        const notesIsValid = (ExpenseData.notes)? (ExpenseData.notes)&& ExpenseData.notes.length > 0: true;

        const dateIsValid = (ExpenseData.date);
        console.log(expenseNameIsValid);
        if(!expenseNameIsValid || !amountIsValid || !notesIsValid || !dateIsValid){
            // Alert.alert('Invalid input', 'Please check your input values');
            setInputs((curInputs) => {
                return {
                    expenseName: { value: curInputs.expenseName.value, isValid: expenseNameIsValid },
                    amount: { value: curInputs.amount.value, isValid: amountIsValid },
                    notes: { value: curInputs.notes.value, isValid: notesIsValid },
                    date: {
                        value: curInputs.date.value,
                        isValid: dateIsValid,
                    },
                };
            });

            console.log("failed validation");
            return;
        }
        console.log("passed");
        Editdata?EditExpense():PostExpense();
    }
    const formIsValid =
        !inputs.etime.isValid ||
        !inputs.stime.isValid ||
        !inputs.side.isValid ||
        !inputs.date.isValid;

    return (
        <SafeAreaView className={"flex-1 relative mt-8"}>
         <TopBar/><View  className={"mb-10"}></View>
            <View className={"flex-row justify-center my-5"}>

                <Text className={"flex-row justify-center text-2xl text-gray-500"} style={{  color: themeColors.colorDark}}>{title?title:"Add Breast Feeding details"}</Text>
            </View>

        <View className={"mt-5"} >


                    <View className={"flex-row my-8"}>

                        <DateTimePicker
                            mode='Date'
                            lable={"Pick a Date"}
                            value={Editdata?getFormattedDate(new Date(Editdata.date)).toString():getFormattedDate(new Date())}
                            inputHandler={inputChangedHandler}
                            name='date'
                        />
                        <View>
                            <Text style={styles.label} className={"text-xs text-center mb-1"}>Category</Text>
                            <DropdownComponentBfeed  onCategorySelect={inputChangedHandler} defaultName={"Side"} data={datas} name='side' defaultval = {Editdata?Editdata.side:null}  />
                        </View>
                    </View>
            <View className={"flex-row mb-5"}>

            <DateTimePicker
                mode='time'
                lable={"Pick Start time"}
                value={Editdata?getFormattedDate(new Date(Editdata.date)).toString():getFormattedTime(new Date())}
                name={'stime'}
                inputHandler={inputChangedHandler}
            />
                <DateTimePicker
                    mode='time'
                    lable={"Pick End time"}
                    value={Editdata?getFormattedDate(new Date(Editdata.date)).toString():getFormattedTime(new Date())}
                    name={'etime'}
                    inputHandler={inputChangedHandler}
                />
            </View>
                {formIsValid &&
                    <Text className={"text-center text-red-500 my-2"}
                    >Invalid input value - please check your entered data!</Text>}

                <View style={styles.buttons} className={"mt-5"}>
                    <Button style={styles.button} mode="flat" onPress={cancelHandler}>
                        Cancel
                    </Button>
                    <Button style={styles.button} onPress={PostExpense}>
                        {'Add'}
                    </Button>
                </View>
</View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
    label: {
        color: themeColors.colorDark,
    },
    input: {
        backgroundColor: themeColors.bgInput(0.1),
        color: GlobalStyles.colors.primary700,
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top'
    },
    invalidLable: {
        color: GlobalStyles.colors.error500
    },
    invalidInput: {
        backgroundColor:themeColors.bgInputDager(0.2),
    }
});
