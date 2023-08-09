import { StyleSheet, View, Text, SafeAreaView} from 'react-native';

import Input from '../Growth/Input';
import React, {useState} from "react";
import Button from "../UI/Button";
import {GlobalStyles} from "../../constants/styles";
import DateTimePicker from "./DateTimePicker";
import DropdownComponent from "./DropdownComponent";
import {getFormattedDate} from "../../util/date";

// import {BudgetApiPost} from "../../api/BudgetApi";

import {BudgetApiPost} from "../../api/BudgetApi";

import {themeColors} from "../../theme";
import {useNavigation} from "@react-navigation/native";



export default function IncomeForm() {

    let navigation = useNavigation();


    const [inputs, setInputs] = useState({
        amount: {
            value: '',
            isValid: true,
        },
        budgetName: {
            value: '',
            isValid: true,
        },

        startdate: {
            value: new Date(),
            isValid: true,
        },
        enddate: {
            value: new Date(),
            isValid: true,
        },
    });
    function cancelHandler() {
        navigation.goBack();
    }

    const PostBudget = () => {
        console.log(inputs.amount.value, inputs.budgetName.value, inputs.startdate.value,inputs.enddate.value);
        BudgetApiPost({
            amount: +inputs.amount.value,
            budgetName: inputs.budgetName.value,
            startdate: inputs.startdate.value,
            enddate: inputs.enddate.value,

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
        const BudgetData = {
            amount:+inputs.amount.value,
            budgetName:inputs.budgetName.value,
            enddate:getFormattedDate(inputs.enddate.value),
            startdate:getFormattedDate(inputs.startdate.value),
        }
        console.log(BudgetData);
        const positiveNumberRegex = /^\d+(\.\d+)?$/;

        const budgetNameIsValid = (BudgetData.budgetName) && BudgetData.budgetName.length < 50;

        const amountIsValid = !isNaN(BudgetData.amount)&&positiveNumberRegex.test(BudgetData.amount);
        const enddateIsValid =  (BudgetData.enddate);


        const startdateIsValid = (BudgetData.startdate);
        console.log(budgetNameIsValid);
        if(!budgetNameIsValid || !amountIsValid || !enddateIsValid || !startdateIsValid){
            // Alert.alert('Invalid input', 'Please check your input values');
            setInputs((curInputs) => {
                return {
                    budgetName: { value: curInputs.budgetName.value, isValid: budgetNameIsValid },
                    amount: { value: curInputs.amount.value, isValid: amountIsValid },
                    enddate: { value: curInputs.enddate.value, isValid: enddateIsValid },
                    startdate: {
                        value: curInputs.startdate.value,
                        isValid: startdateIsValid,
                    },
                };
            });

            console.log("failed validation");
            return;
        }
        console.log("passed");
        PostBudget();
    }

    const formIsValid =
        !inputs.budgetName.isValid ||
        !inputs.amount.isValid ||
        !inputs.enddate.isValid ||
        !inputs.startdate.isValid;

    return (
        <SafeAreaView  className={"flex-1 relative mt-8"} >
            <View  className={" mt-5 "} >

            <View className={"flex-row justify-center "}>
                <Text className={"flex-row justify-center text-2xl text-gray-500"} style={{  color: themeColors.colorDark}}>Add Budget</Text>
            </View>

                <View className={"mt-5"}>
                    <Input
                        label="Title"
                        invalid ={!inputs.budgetName.isValid}
                        textInputConfig={{
                            keyboardType: 'default',
                            placeholder: 'Enter Title',
                            onChangeText: inputChangedHandler.bind(this, 'budgetName'),
                            value: inputs.budgetName.value,

                        }}
                    />

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

                    <DateTimePicker
                        mode='Date'
                        lable={"Pick Start Date"}
                        name = 'startdate'
                        inputHandler={inputChangedHandler}
                        value={getFormattedDate(new Date())}

                    />

                    <DateTimePicker
                        mode='Date'
                        lable={"Pick End Date"}
                        name = 'enddate'
                        inputHandler={inputChangedHandler}
                        value={getFormattedDate(new Date())}
                    />



                    {formIsValid &&
                        <Text className={"text-center text-red-500 my-2 "}
                        >Invalid input value - please check your entered data!</Text>}
                    <View style={styles.buttons}  className={"mt-10 "} >
                        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
                            Cancel
                        </Button>
                        <Button style={styles.button} onPress={submitHandler}>
                            {'Add'}
                        </Button>
                    </View>

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
    inbalidLable: {
        color: GlobalStyles.colors.error500
    },
    invalidInput: {
        backgroundColor:themeColors.bgInputDager(0.2),
    }
});
