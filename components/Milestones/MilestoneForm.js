import {Alert, ScrollView, StyleSheet, View, Text, Image} from 'react-native';

import Input from './Input';
import React, {useState} from "react";
import Button from "../UI/Button";
import {GlobalStyles} from "../../constants/styles";
import {useNavigation} from "@react-navigation/native";
import DateTimePicker from "../Form Component/DateTimePicker";
import {getFormattedDate} from "../../util/date";
import {themeColors} from "../../theme";

export default function MilestoneForm({onCancel,onSubmit,milestone}) {
    let navigation = useNavigation();
    const [inputs, setInputs] = useState({
        milestone: {
            value: milestone,
            isValid: true,
        },
        description: {
            value: '',
            isValid: true,
        },
        date:{
            value: '',
            isValid: true,
        },
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
        const completeMilestoneData = {
            milestone:inputs.milestone.value,
            description:inputs.description.value,
            date:inputs.date.value,
        }


        const milestoneIsValid = completeMilestoneData.milestone.trim().length > 0;
        const descriptionIsValid = completeMilestoneData.description.trim().length > 0;

        if(!milestoneIsValid || !descriptionIsValid){
            // Alert.alert('Invalid input', 'Please check your input values');
            setInputs((curInputs) => {
                return {
                    milestone: {
                        value: curInputs.milestone.value,
                        isValid: milestoneIsValid,
                    },
                    description: {
                        value: curInputs.description.value,
                        isValid: descriptionIsValid,
                    },
                    date: {
                        value: curInputs.description.value,
                        isValid: true,
                    },
                };
            });
            return;

        }
        onSubmit(completeMilestoneData);
    }

const formIsValid =
    !inputs.milestone.isValid ||
    !inputs.description.isValid;

    return (
        <ScrollView>
            <View className={"flex-1 pb-2 pl-8"}>
                <View>
                    <Text style={{color: themeColors.colorDark}}>Event Image</Text>
                </View>
                <View className={"flex-1 "}>
                    <Image className={'w-20 h-20'} source={require('../../assets/images/imagePicker.png')}/>
                </View>
            </View>
            <Input
                label="Milestone"
                invalid ={!inputs.milestone.isValid}
                textInputConfig={{
                    onChangeText: inputChangedHandler.bind(this, 'milestone'),
                    value: inputs.milestone.value,

                    // autoCapitalize: 'none'
                    // autoCorrect: false // default is true
                }}
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
            <DateTimePicker
                mode='date'
                lable={"Date"}
                inputHandler={inputChangedHandler}
                maxdate={new Date()}
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
