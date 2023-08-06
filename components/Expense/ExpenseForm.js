import { StyleSheet, View, Text, SafeAreaView} from 'react-native';
import Input from '../Growth/Input';
import React, {useState} from "react";
import Button from "../UI/Button";
import {GlobalStyles} from "../../constants/styles";
import DateTimePicker from "./DateTimePicker";
import DropdownComponent from "./DropdownComponent";
import {getFormattedDate} from "../../util/date";
import {ExpenseApiPost, ExpenseEdit} from "../../api/ExpenseApi";
import {themeColors} from "../../theme";
import {useNavigation, useRoute} from "@react-navigation/native";
import {TopBar} from "../TopBar";


export default function ExpenseForm() {
    let navigation = useNavigation();
    const route = useRoute();
    console.log("route params here",route.params);

    const { Editdata, title } = route.params ?? {};

    console.log("this and then");
    console.log("Editdata date is here",Editdata,"title is here",title);

    const datas = [
        { label: 'Food', value: 'Food' },
        { label: 'Diaper', value: 'Diaper' },
        { label: 'Cloths', value: 'Cloths' },
        { label: 'Medical', value: 'Medical' },
        { label: 'Travel', value: 'Travel' },
        { label: 'Others', value: 'Others' },

    ];


    const [inputs, setInputs] = useState({
        amount: {
            value: Editdata?Editdata.amount:'',
            isValid: true,
        },
        expenseName: {
            value: Editdata?Editdata.expenseName:'',
            isValid: true,
        },
        notes: {
            value: Editdata?Editdata.notes:'',
            isValid: true,
        },

        calendar: {
            value: false,
            isValid: true,
        },
        date: {
            value: Editdata?Editdata.date:new Date(),

            isValid: true,
        },
    });
    console.log("notes",inputs.notes.value);
    function cancelHandler() {
        navigation.goBack();
    }

    const EditExpense = () => {
        console.log("came to me");
        ExpenseEdit({
            amount: +inputs.amount.value,
            expenseName: inputs.expenseName.value,
            notes: inputs.notes.value,
            date: inputs.date.value, //getFormattedDate(inputs.date.value)

        },Editdata.expenseID).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    }

    const PostExpense = () => {
        console.log(inputs.amount.value, inputs.expenseName.value, inputs.notes.value,inputs.date.value);
        ExpenseApiPost({
            amount: +inputs.amount.value,
            expenseName: inputs.expenseName.value,
            notes: inputs.notes.value,
            date: inputs.date.value,

        }).then((res) => {
            console.log(res);
        }).catch((err) => {
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
        !inputs.expenseName.isValid ||
        !inputs.amount.isValid ||
        !inputs.notes.isValid ||
        !inputs.date.isValid;

    return (
        <SafeAreaView className={"flex-1 relative mt-8"}>
            {Editdata&&<><TopBar/><View  className={"mb-10"}></View></>}
            <View className={"flex-row justify-center my-5"}>

                <Text className={"flex-row justify-center text-2xl text-gray-500"} style={{  color: themeColors.colorDark}}>{title?title:"Add expense"}</Text>
            </View>

        <View >
                <Input
                    label="Amount"
                    invalid ={!inputs.amount.isValid}
                    textInputConfig={{
                        keyboardType: 'decimal-pad',
                        placeholder: Editdata?(Editdata.amount).toString():'0.00',
                        onChangeText: inputChangedHandler.bind(this, 'amount'),
                        value: inputs.amount.value,

                    }}
                />
                <View>
                <Text style={styles.label} className={"text-xs ml-8"}>Category</Text>
                    <DropdownComponent  onCategorySelect={inputChangedHandler} data={datas} name='expenseName' defaultval = {Editdata?Editdata.expenseName:null}  />
                </View>
                <DateTimePicker
                    mode='Date'
                    lable={"Pick a Date"}
                    value={Editdata?getFormattedDate(new Date(Editdata.date)).toString():getFormattedDate(new Date())}
                    inputHandler={inputChangedHandler}
                    name={'date'}
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

                <View style={styles.buttons} className={"mt-5"}>
                    <Button style={styles.button} mode="flat" onPress={cancelHandler}>
                        Cancel
                    </Button>
                    <Button style={styles.button} onPress={submitHandler}>
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
