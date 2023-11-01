import React, {useEffect, useState} from 'react';
import { View, TextInput,Text,Image,TouchableOpacity,StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import RadioBtn from '../components/RadioButtons';
import Input from "../components/Growth/Input";
import DateTimePicker from "../components/Reminder Component/DateTimePicker";
import Dropdown from "../components/Reminder Component/Dropdown";
import Button from "../components/UI/Button";
import {ArrowLeftIcon} from "react-native-heroicons/outline";
import {getFormattedTime} from "../util/date";
import {getFormattedDate} from "../util/date";
import {faRectangleList} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
// import axios from "axios";
// import {RemindersApi,RemindersApiPost} from "../Api/RemindersAPI";
import {useContext} from "react";
import {AuthContext} from "../Context/AuthContext";
// import {BASE_URL} from "../config";
// import {addGrowth, selectGrowth} from "../slices/growthSlice";
import {useDispatch, useSelector} from "react-redux";
import {addReminder, selectReminders} from "../slices/reminderSlice";



export function Reminders() {
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const navigation = useNavigation();
    const [selectedOption, setSelectedOption] = useState('once');
    const [mintime, setMinTime] = useState(new Date())
    const [isVisibleDropdown, setisVisibleDropdown] = useState(false);
    const dispatch = useDispatch();

    let reminderDetails = useSelector(selectReminders);

    const {updateKeys} = useContext(AuthContext);

    useEffect(() => {
        const currentTime = new Date();
        setMinTime(currentTime);
    }, []);


    const [inputs, setInputs] = useState({
        title: {
            value: '',
            isValid: true,
        },
        date: {
            value: '',
            isValid: true,
        },
        time: {
            value: '',
            isValid: true,
        },
        type: {
            value: '',
            isValid: true,
        },
        ringing_fr: {
            value: '',
            isValid: true,
        },
        repeat_fr: {
            value: '',
            isValid: true,
        }
    });

    function inputChangedHandler(inputIdentifier, enteredValue) {
        if(inputIdentifier == "ringing_fr" && enteredValue == "keepRinging"){
            console.log("say hellow");
            setisVisibleDropdown(true);
        }
        setInputs((prevInputs) => {
            return {
                ...prevInputs,
                [inputIdentifier]: {
                    value: enteredValue,
                    isValid: true,
                },
            };
        });

    }

    function submitHandler() {


        let reminderData = {
            title: inputs.title.value,
            date: inputs.date.value,
            time: getFormattedTime(inputs.time.value),
            reminderType: inputs.type.value,
            ringingFrequency: inputs.ringing_fr.value,
            repeatFrequency: inputs.repeat_fr.value,

        }
        let id = Math.floor(Math.random() * 100) + 1;
        console.log({...reminderData,id:id})
        dispatch(addReminder({...reminderData,id:id}));
        console.log("hello",reminderDetails);

        navigation.navigate('RemindersList')
    }
    const object = [
        {key: 'Daily', value: 'Daily'},
        {key: 'Once a week', value: 'Once a week'},
        {key: 'Once a month', value: 'Once a month'},
        {key: 'Once a year', value: 'Once a year'},
        {key: 'Never', value: 'Never'},
    ]

    const object2 = [
        {key: "personal", value: 'personal'},
        {key: 'Milestone', value: 'Milestone'},
        {key: 'Vaccine', value: 'Vaccine'}]

    return (
        <SafeAreaView>
            {/*Title*/}

            <View className={"flex-row justify-around  mt-5 "}>
                <TouchableOpacity
                    className={" rounded-full p-1 m-1"}
                    style={{backgroundColor: themeColors.colorDark}}
                    onPress={() => navigation.goBack()}>
                    <ArrowLeftIcon size="22" color="white"/>
                </TouchableOpacity>
                <Text className={"flex-3 flex-row justify-center text-2xl text-gray-500"}
                      style={styles.title}
                >Create Event</Text>
                <View className={"" }>
                    <TouchableOpacity onPress={() => navigation.navigate('RemindersList')}>
                        <FontAwesomeIcon icon={faRectangleList} size={40} style={{color: themeColors.colorDark}}/>
                    </TouchableOpacity>
                </View>
            </View>

            {/*className={"items-end"}*/}

            {/*Main Form*/}
            <View className={'mt-5 flex space-y-3'}>
                <Input
                    label="Title"
                    // invalid ={!inputs.weight.isValid}
                    textInputConfig={{
                        placeholder: 'Title',
                        onChangeText: inputChangedHandler.bind(this, 'title'),
                    }}
                />

                {/*Date time picker*/}
                <View className={''}>

                    <DateTimePicker
                        mode='date'
                        lable={"Date"}
                        inputHandler={inputChangedHandler}
                        maxdate={new Date()}
                    />

                    <DateTimePicker
                        mode='time'
                        lable={"Time"}
                        inputHandler={inputChangedHandler}
                        // maxdate={new Date()}
                    />

                </View>


                {/*first Dropdown*/}
                <View className={" my-1 mx-8 flex-1Z"}>
                    <Text style={[styles.label]} className={"text-xs mb-2"}>Reminder Type</Text>
                    <Dropdown data={object2} inputHandler={inputChangedHandler} keyName={"type"}/>
                </View>

                {/*/!*Radio button*!/*/}
                <View className=" my-1 mx-8 flex-1Z">
                    <Text style={[styles.label]} className={"text-xs mb-2"}>Ringing frequency</Text>
                    <RadioBtn selectedOption={selectedOption} inputHandler={inputChangedHandler}/>
                </View>

                {/*handleRadioChange={handleRadioChange}*/}

                {/*second Dropdown*/}
                {isVisibleDropdown &&
                    <View className=" my-4 mx-8 flex-1Z">
                        <Text style={[styles.label]} className={"text-xs mb-2"}>Repeat Frequency</Text>
                        <Dropdown data={object} inputHandler={inputChangedHandler} keyName={"repeat_fr"}/>
                    </View>
                }

            </View>


            {/*Confirmation button*/}
            <View className="mt-5 flex-row items-center justify-center space-x-4 px-8">
                <Button className={"flex-1"} style={styles.button} mode="flat">
                    Cancel
                </Button>

                <Button
                    title=""
                    className={'flex-1'}
                    onPress={submitHandler}>
                    Save
                </Button>
            </View>

            {/*Back button on the top left corner*/}


        </SafeAreaView>

    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        // backgroundColor: GlobalStyles.colors.primary800,
    },
    title: {
        color: themeColors.colorDark,
    },
    label: {
        color: themeColors.colorDark,
    }
});
