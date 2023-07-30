import {ScrollView, StyleSheet, View, Text, SafeAreaView} from 'react-native';

import Input from '../Growth/Input';
import React, {useState} from "react";
import Button from "../UI/Button";
import {GlobalStyles} from "../../constants/styles";
import DateTimePicker from "../Form Component/DateTimePicker";
import DropdownComponent from "./DropdownComponent";
import {getFormattedDate} from "../../util/date";
import {ExpenseApiPost} from "../../Api/ExpenseApi";
import {SafeAreaContext} from "react-native-safe-area-context";
import {themeColors} from "../../theme";
import {useNavigation} from "@react-navigation/native";


export default function ExpenseForm() {
    let navigation = useNavigation();


    const [inputs, setInputs] = useState({
        amount: {
            value: '',
            isValid: true,
        },
        expenseName: {
            value: '',
            isValid: true,
        },
        notes: {
            value: '',
            isValid: true,
        },
        category:{
            value:'Expense',
            isValid:true,
        },
        calendar: {
            value: false,
            isValid: true,
        },
        date: {
            value: new Date(),
            isValid: true,
        },
    });
    function cancelHandler() {
        navigation.goBack();
    }
    const PostExpense = () => {
        console.log(inputs.amount.value, inputs.expenseName.value, inputs.notes.value,inputs.date.value);
        ExpenseApiPost({
            amount: +inputs.amount.value,
            expenseName: inputs.expenseName.value,
            notes: inputs.notes.value,
            date: inputs.date.value,
            category:'Expense',
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    }
    function inputChangedHandler(inputIdentifier, enteredValue) {
        console.log("Selected item: " + inputIdentifier + " " + enteredValue);
        setInputs((curinputs) => {
            return {
                ...curinputs,
                [inputIdentifier]: {value:enteredValue, isValid:true},
            };
        });
    }

    function submitHandler() {
        console.log("submit");
        const ExpenseData = {
            amount:+inputs.amount.value,
            expenseName:inputs.expenseName.value,
            notes:inputs.notes.value,
            date:getFormattedDate(inputs.date.value),
        }
        console.log(ExpenseData);
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
        PostExpense();
    }

    const formIsValid =
        !inputs.expenseName.isValid ||
        !inputs.amount.isValid ||
        !inputs.notes.isValid ||
        !inputs.date.isValid;

    return (
        <SafeAreaView>
            <View className={"flex-row justify-center my-10"}>
                <Text className={"flex-row justify-center text-2xl text-gray-500"} style={{  color: themeColors.colorDark}}>tab bar</Text>
            </View>
            <ScrollView >
        <View >
                <Input
                    label="Amount"
                    invalid ={!inputs.amount.isValid}
                    textInputConfig={{
                        keyboardType: 'decimal-pad',
                        placeholder: '0.00',
                        onChangeText: inputChangedHandler.bind(this, 'amount'),
                        value: inputs.amount.value,

                    }}
                />
                <View>
                <Text style={styles.label} className={"text-xs ml-8"}>Category</Text>
                <DropdownComponent onCategorySelect={inputChangedHandler} />
                </View>
                <DateTimePicker
                    mode='Date'
                    lable={"Pick a Date"}
                    inputHandler={inputChangedHandler}

                />
                <Input
                    label="Notes"
                    invalid ={!inputs.notes.isValid}
                    textInputConfig={{
                        multiline: true,
                        onChangeText: inputChangedHandler.bind(this, 'notes'),
                        value: inputs.notes.value,

                    }}
                />


                {formIsValid &&
                    <Text className={"text-center text-red-500 my-2"}
                    >Invalid input value - please check your entered data!</Text>}

                <View style={styles.buttons} className={"mt-2"}>
                    <Button style={styles.button} mode="flat" onPress={cancelHandler}>
                        Cancel
                    </Button>
                    <Button style={styles.button} onPress={submitHandler}>
                        {'Add'}
                    </Button>
                </View>
</View>
            </ScrollView>

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
    inbalidLable: {
        color: GlobalStyles.colors.error500
    },
    invalidInput: {
        backgroundColor:themeColors.bgInputDager(0.2),
    }
});
