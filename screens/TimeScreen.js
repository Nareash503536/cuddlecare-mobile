import {View, TextInput, Alert, Pressable, Text, Image} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import React, {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import FilledButton from "../components/filledButton";
import SleepHeader from "../components/sleepHeader";
import {ClockIcon} from "react-native-heroicons/solid";
import {SleepApi, SleepApiGetLast} from "../Api/SleepApi";
import {AuthContext} from "../Context/AuthContext";
import axios from "axios";
import {BASE_URL} from "../config";
import moment from "moment/moment";

export function TimeScreen(){
    const {updateKeys} = React.useContext(AuthContext);
    const [startTime, setStartTime] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endTime, setEndTime] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
    const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
    const [isEndTimePickerVisible, setEndTimePickerVisible] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);
    const [lastSleepTime, setLastSleepTime] = useState(null);
    const [sleepDuration, setSleepDuration] = useState(null);
    const [timeGap, setTimeGap] = useState(null);
    const [sleepNotes, setSleepNotes] = useState('');
    const [isCheckedNap, setIsCheckedNap] = useState(false);
    const [isCheckedNight, setIsCheckedNight] = useState(false);
    const moment = require('moment');
    moment.suppressDeprecationWarnings = true;
    const navigation = useNavigation();

    useEffect(() => {
        lastSleep();
    }, []);

    const showStartDatePicker = () => {
        setStartDatePickerVisible(true);
    };

    const hideStartDatePicker = () => {
        setStartDatePickerVisible(false);
    };

    const handleStartDateConfirm = (date) => {
        const selectedDate = moment(date, 'MMM DD, YYYY');
        const currentDate = moment();
        const twoDaysAgo = currentDate.clone().subtract(2, 'day');

        if (selectedDate.isBefore(twoDaysAgo)) {
            Alert.alert('Invalid Start Date', 'Start date cannot be more than two days ago');
        } else if (selectedDate.isAfter(currentDate)) {
            Alert.alert('Invalid Start Date', 'Start date cannot be in the future');
        } else {
            setStartDate(selectedDate.format('MMM DD, YYYY'));
        }

        hideStartDatePicker();
    };

    const showStartTimePicker = () => {
        setStartTimePickerVisible(true);
    };

    const hideStartTimePicker = () => {
        setStartTimePickerVisible(false);
    };

    const handleStartTimeConfirm = (time) => {
        const selectedTime = moment(time, 'h:mm A');
        const currentDate = moment();
        const selectedDateTime = moment(startDate + ' ' + selectedTime.format('h:mm A'), 'MMM DD, YYYY h:mm A');

        if (selectedDateTime.isBefore(currentDate)) {
            setStartTime(selectedTime.format('h:mm A'));
        } else {
            Alert.alert('Invalid Start Time', 'Start time cannot be in the future');
        }

        hideStartTimePicker();
    };

    const showEndDatePicker = () => {
        setEndDatePickerVisible(true);
    };

    const hideEndDatePicker = () => {
        setEndDatePickerVisible(false);
    };

    const handleEndDateConfirm = (date) => {
        const selectedDate = moment(date, 'MMM DD, YYYY');
        const currentDate = moment();

        if (selectedDate.isBefore(currentDate)) {
            setEndDate(selectedDate.format('MMM DD, YYYY'));
        } else {
            Alert.alert('Invalid End Date', 'End date cannot be in the future');
        }

        hideEndDatePicker();
    };

    const showEndTimePicker = () => {
        setEndTimePickerVisible(true);
    };

    const hideEndTimePicker = () => {
        setEndTimePickerVisible(false);
    };

    const handleEndTimeConfirm = (time) => {
        const selectedTime = moment(time, 'h:mm A');
        const selectedDateTime = moment(endDate + ' ' + selectedTime.format('h:mm A'), 'MMM DD, YYYY h:mm A');
        const startDateTime = moment(startDate + ' ' + startTime, 'MMM DD, YYYY h:mm A');
        const currentDate = moment();

        if (startDate === endDate && selectedDateTime.isBefore(startDateTime)) {
            Alert.alert('Invalid End Time', 'End time cannot be before the start time');
            // Revert to the previous end time
            setEndTime(moment(endTime, 'h:mm A').format('h:mm A'));
        } else if (selectedDateTime.isAfter(currentDate)) {
            Alert.alert('Invalid End Time', 'End time cannot be in the future');
            // Revert to the previous end time
            setEndTime(moment(endTime, 'h:mm A').format('h:mm A'));
        } else {
            // Valid end time, update the state
            setEndTime(selectedTime.format('h:mm A'));
        }

        hideEndTimePicker();
    };

    const calculateTotalTimeSlept = () => {
        const startDateTime = moment(startDate + ' ' + startTime, 'MMM DD, YYYY h:mm A');
        const sleep_start_time = startDateTime.add(5.5, 'hours');
        const endDateTime = moment(endDate + ' ' + endTime, 'MMM DD, YYYY h:mm A');
        const sleep_end_time = endDateTime.add(5.5, 'hours');
        const duration = moment.duration(sleep_end_time.diff(sleep_start_time));
        const hours = duration.hours();
        const minutes = duration.minutes();
        if (hours >= 24) {
            const days = Math.floor(hours / 24);
            const remainingHours = hours % 24;
            return days + ' days ' + remainingHours + ' hours ' + minutes + ' minutes';
        } else {
            return hours + ' hours ' + minutes + ' minutes';
        }
        //TODO: Add logic to handle if the user sleeps for more than 24 hours
    };

    const padTime = time => {
        return String(time).padStart(2, '0');
    };

    const totalSleepTime = () => {
        const startDateTime = moment(startDate + ' ' + startTime, 'MMM DD, YYYY h:mm A');
        const endDateTime = moment(endDate + ' ' + endTime, 'MMM DD, YYYY h:mm A');
        const elapsedTime = endDateTime - startDateTime;
        const seconds = Math.floor((elapsedTime / 1000) % 60);
        const minutes = Math.floor((elapsedTime / 1000 / 60) % 60);
        const hours = Math.floor((elapsedTime / 1000 / 3600) % 24);
        const duration = `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`;
        return duration;
    }

    const storeData = async (data) => {
        const apiURL = BASE_URL + "/api/sleep/save";
        try {
            await updateKeys();
            const response = await axios.post(apiURL, data);
            // const response = await SleepApi(data);
            console.log(response.data);
            navigation.navigate("SleepTimeline");
        } catch (error) {
            console.log(error);
            console.log(data);
        }
    };

    const handleSave = () => {
        const startDateTime = moment(startDate + ' ' + startTime, 'MMM DD, YYYY h:mm A');
        const sleepStartTime = startDateTime.add(5.5, 'hours');
        const endDateTime = moment(endDate + ' ' + endTime, 'MMM DD, YYYY h:mm A');
        const sleepEndTime = endDateTime.add(5.5, 'hours');

        const currentDateTime = moment();
        const currentDateTimeLocal = currentDateTime.add(5.5, 'hours');

        const sleepDuration = totalSleepTime();
        console.log('Start Date:', sleepStartTime);
        console.log('Current Time:', currentDateTimeLocal);
        console.log('End Date:', sleepEndTime);
        console.log('Total Time Slept:', sleepDuration);

        const data = {
            sleepStartTime,
            sleepEndTime,
            sleepDuration,
            sleepNotes,
            sleepType: isCheckedNap ? 'Nap' : 'Night Sleep'
        };
        storeData(data).then(r => console.log(r));
    };

    const lastSleep = async () => {
        const currentDate = new Date().toISOString().slice(0, 10);
        const apiURL = BASE_URL + "/api/sleep/last-sleep/" + currentDate;
        try {
            await updateKeys();
            const response = await axios.get(apiURL, null);
            console.log(response.data);
            const sleepStartTime = response.data.sleepStartTime;
            // const timeString = sleepStartTime.substr(11, 5);
            // const [hour, minute] = timeString.split(':').map(Number);
            // const period = hour >= 12 ? 'PM' : 'AM';
            // const formattedTime = `${(hour % 12) || 12}:${minute.toString().padStart(2, '0')} ${period}`;
            const dateObj = new Date(sleepStartTime);
            const formattedTime = dateObj.toLocaleString(undefined, {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            });
            if (response.data.sleepStartTime == null) {
                setLastSleepTime("No Data Found for Today");
            }else {
                setLastSleepTime(lastSleep?("Last Sleep at " + formattedTime):"No Data Found for Today");
            }

            const totalSleepTime = response.data.sleepDuration;
            const [hoursStr, minutesStr, secondsStr] = totalSleepTime.split(':');
            const hours = parseInt(hoursStr, 10);
            const minutes = parseInt(minutesStr, 10);
            const sleepDuration = () => {
                if (hours === 0) {
                    return "Duration " + `${minutes}` + " minutes";
                }else if (hours === 1) {
                    return "Duration " + `${hours}` + " hour and " + `${minutes}` + " minutes";
                } else {
                    return "Duration " + `${hours}` + " hours and " + `${minutes}` + " minutes";
                }
            }
            setSleepDuration(sleepDuration);

            const sleepEndTime = new Date(response.data.sleepEndTime);
            const currentTime = new Date();
            const timeDifferenceInMillis = currentTime - sleepEndTime;
            const timeDifferenceInHours = timeDifferenceInMillis / (1000 * 60 * 60);
            const timeDifferenceRounded = Math.round(timeDifferenceInHours);
            const timeDifference = () => {
                if (timeDifferenceRounded === 0 || timeDifferenceRounded === 1) {
                    return `${timeDifferenceRounded}` + " hour ago";
                }else {
                    return `${timeDifferenceRounded}` + " hours ago";
                }
            }
            setTimeGap(timeDifference);
        } catch (e) {
            console.log(e);
        }
    };

    const toggleCheckboxNap = () => {
        setIsCheckedNap(!isCheckedNap);
        if (isCheckedNight) {
            setIsCheckedNight(!isCheckedNight);
        }
    };

    const toggleCheckboxNight = () => {
        setIsCheckedNight(!isCheckedNight);
        if (isCheckedNap) {
            setIsCheckedNap(!isCheckedNap);
        }
    };

    return (
        <SafeAreaView>
            <SleepHeader screen={"Baby"} />
            <View className={"flex flex-row items-center px-2 border m-2 rounded-2xl border-secondary"}>
                <Image className={"h-8 w-8"} source={require("../assets/images/sleeping.png")} />
                <View className={"flex-1 flex-col p-2"}>
                    <View className={"flex flex-row justify-between items-center"}>
                        <Text className={"text-2xl font-bold opacity-70"}>{lastSleepTime}</Text>
                        <Text className={"opacity-50"}>{timeGap}</Text>
                    </View>
                    {sleepDuration ? (
                            <View className={"flex flex-row items-center"}>
                                <ClockIcon size="15" color="gray" />
                                <Text className={"px-1"}>{sleepDuration}</Text>
                            </View> )
                        : null}
                </View>
            </View>
            <View>
                <View className={"py-12"}>
                    <View className={"flex flex-row px-8 justify-between"}>
                        <View className={"w-2/5 border-b-2 border-primary m-2 mx-2"}>
                            <Pressable onPress={showStartDatePicker}>
                                <TextInput
                                    value={startDate.toString()}
                                    placeholder="Start Date"
                                    editable={false}
                                />
                            </Pressable>
                            <DateTimePickerModal
                                isVisible={isStartDatePickerVisible}
                                mode="date"
                                onConfirm={handleStartDateConfirm}
                                onCancel={hideStartDatePicker}
                            />
                        </View>
                        <View className={"w-2/5 border-b-2 border-primary m-2 mx-4"}>
                            <Pressable onPress={showStartTimePicker}>
                                <TextInput
                                    value={startTime.toString()}
                                    placeholder="Start Time"
                                    editable={false}
                                />
                            </Pressable>
                            <DateTimePickerModal
                                isVisible={isStartTimePickerVisible}
                                mode="time"
                                onConfirm={handleStartTimeConfirm}
                                onCancel={hideStartTimePicker}
                            />
                        </View>
                    </View>
                    <View className={"flex flex-row px-8 justify-between"}>
                        <View className={"w-2/5 border-b-2 border-primary m-2 mx-2"}>
                            <Pressable onPress={showEndDatePicker}>
                                <TextInput
                                    value={endDate.toString()}
                                    placeholder="End Date"
                                    editable={false}
                                />
                            </Pressable>
                            <DateTimePickerModal
                                isVisible={isEndDatePickerVisible}
                                mode="date"
                                onConfirm={handleEndDateConfirm}
                                onCancel={hideEndDatePicker}
                            />
                        </View>
                        <View className={"w-2/5 border-b-2 border-primary m-2 mx-4"}>
                            <Pressable onPress={showEndTimePicker}>
                                <TextInput
                                    value={endTime.toString()}
                                    placeholder="End Time"
                                    editable={false}
                                />
                            </Pressable>
                            <DateTimePickerModal
                                isVisible={isEndTimePickerVisible}
                                mode="time"
                                onConfirm={handleEndTimeConfirm}
                                onCancel={hideEndTimePicker}
                            />
                        </View>
                    </View>
                </View>
                <Text className={"text-center font-bold py-2"}>Select Sleep Type</Text>
                <View className={"flex flex-row m-5 mt-4"}>
                    <View className={"flex-1 mx-5"}>
                        <Pressable onPress={toggleCheckboxNap}>
                            {isCheckedNap ? (
                                <View className={"border border-primary p-2 bg-primary"}>
                                    <Text className={"text-center"} style={{color:"white"}}>Nap</Text>
                                </View>
                            ) : (
                                <View className={"border border-primary p-2"}>
                                    <Text className={"text-center text-primary"}>Nap</Text>
                                </View>
                            )}
                        </Pressable>
                    </View>
                    <View className={"flex-1 mx-5"}>
                        <Pressable onPress={toggleCheckboxNight}>
                            {isCheckedNight ? (
                                <View className={"border border-primary p-2 bg-primary"}>
                                    <Text className={"text-center"} style={{color:"white"}}>Night Sleep</Text>
                                </View>
                            ) : (
                                <View className={"border border-primary p-2"}>
                                    <Text className={"text-center text-primary"}>Night Sleep</Text>
                                </View>
                            )}
                        </Pressable>
                    </View>
                </View>
                <View className={"m-4"}>
                    <TextInput
                        className={"border-primary rounded border h-20 p-1 my-1"}
                        placeholder="Add a note (Optional)"
                        value={sleepNotes}
                        onChangeText={text => setSleepNotes(text)}
                    />
                </View>
                <Pressable className={"py-2"} onPress={() => navigation.navigate("Sleeping")}>
                    <View className={"flex flex-row justify-center"}>
                        {/*<Icon name={""} />*/}
                        <Text className={"text-secondary"}>Start Timer</Text>
                    </View>
                </Pressable>
                <FilledButton title={"Save"} onPress={handleSave} icon={"save"}/>
            </View>
        </SafeAreaView>
    )
}