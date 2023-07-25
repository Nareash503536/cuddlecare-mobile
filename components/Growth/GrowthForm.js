import {Alert, ScrollView, StyleSheet, View,Text} from 'react-native';

import Input from './Input';
import React, {useState} from "react";
import Button from "../UI/Button";
import {GlobalStyles} from "../../constants/styles";
import {useNavigation} from "@react-navigation/native";
import DateTimePicker from "../Form Component/DateTimePicker";
import {getFormattedDate, getFormattedTime} from "../../util/date";

export default function GrowthForm({onCancel,onSubmit}) {
    let navigation = useNavigation();

    const [inputs, setInputs] = useState({
        weight: {
            value: '',
            isValid: true,
        },
        height: {
            value: '',
            isValid: true,
        },
        headCircumference: {
            value: '',
            isValid: true,
        },
        date:{
            value: '',
            isValid: true,
        },
        description: {
            value: '',
            isValid: true,
        }
    });

    function inputChangedHandler(inputIdentifier, enteredValue) {
        setInputs((curinputs) => {
            return {
                ...curinputs,
                [inputIdentifier]: {value:enteredValue, isValid:true},
            };
        });
    }

    function submitHandler() {
        const growthData = {
            weight:+inputs.weight.value,
            height:+inputs.height.value,
            headCircumference:+inputs.headCircumference.value,
            date:getFormattedTime(inputs.date.value),
            description:inputs.description.value,
            // date:inputs.date.value,

        }
        // console.log("date",getFormattedDate(inputs.date.value)); //test

        const heightIsValid = !isNaN(growthData.height) && growthData.height > 0;
        const weightIsValid = !isNaN(growthData.weight)&& growthData.weight > 0
        const headCircumferenceIsValid = !isNaN(growthData.headCircumference) && growthData.headCircumference > 0;
        const descriptionIsValid = growthData.description.trim().length > 0;

        if(!heightIsValid || !weightIsValid || !headCircumferenceIsValid || !descriptionIsValid){
            // Alert.alert('Invalid input', 'Please check your input values');
            setInputs((curInputs) => {
                return {
                    height: { value: curInputs.height.value, isValid: heightIsValid },
                    weight: { value: curInputs.weight.value, isValid: weightIsValid },
                    headCircumference: { value: curInputs.headCircumference.value, isValid: headCircumferenceIsValid },
                    description: {
                        value: curInputs.description.value,
                        isValid: descriptionIsValid,
                    },
                };
            });
            return;

        }
        onSubmit(growthData);
    }

const formIsValid =
    !inputs.height.isValid ||
    !inputs.weight.isValid ||
    !inputs.headCircumference.isValid ||
    !inputs.description.isValid;

    return (
        <ScrollView >
            <Input
                label="Weight(kg)"
                invalid ={!inputs.weight.isValid}
                textInputConfig={{
                    keyboardType: 'decimal-pad',
                    placeholder: 'Weight',
                    onChangeText: inputChangedHandler.bind(this, 'weight'),
                    value: inputs.weight.value,

                }}
            />
            <Input
                label="Height(cm)"
                invalid ={!inputs.height.isValid}
                textInputConfig={{
                    keyboardType: 'decimal-pad',
                    placeholder: 'Height',
                    onChangeText: inputChangedHandler.bind(this, 'height'),
                    value: inputs.height.value,

                }}
            />
            <Input
                label="Head Circumference(cm)"
                invalid ={!inputs.headCircumference.isValid}
                textInputConfig={{
                    keyboardType: 'decimal-pad',
                    placeholder: 'Head Circumference',
                    onChangeText: inputChangedHandler.bind(this, 'headCircumference'),
                    value: inputs.headCircumference.value,

                }}
            />
            <DateTimePicker
                mode='time'
                lable={"Date"}
                inputHandler={inputChangedHandler}
            />

            <Input
                label="Description"
                invalid ={!inputs.description.isValid}
                textInputConfig={{
                    multiline: true,
                    onChangeText: inputChangedHandler.bind(this, 'description'),
                    value: inputs.description.value,

                    // autoCapitalize: 'none'
                    // autoCorrect: false // default is true
                }}
            />

            {formIsValid &&
            <Text className={"text-center text-red-500 my-2"}
            >Invalid input value - please check your entered data!</Text>}

            <View style={styles.buttons} className={"mt-2"}>
                <Button style={styles.button} mode="flat" onPress={onCancel}>
                    Cancel
                </Button>
                <Button style={styles.button} onPress={submitHandler}>
                    {'Add'} {/*{isEditing ? 'Update' : 'Add'}*/}
                </Button>
            </View>

        </ScrollView>
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
});
