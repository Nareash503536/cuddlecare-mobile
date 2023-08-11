import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Modal, TextInput, Pressable, Image} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {useNavigation} from "@react-navigation/native";
import axios from "axios";
import FilledButton from "../components/filledButton";
import Icon from "react-native-vector-icons/FontAwesome";
import SleepHeader from "../components/sleepHeader";
import {ClockIcon} from "react-native-heroicons/solid";
import {SleepApi, SleepApiGetLast} from "../Api/SleepApi";
import {AuthContext} from "../Context/AuthContext";
import {BASE_URL} from "../config";
// import BottomNavbar from "../components/bottomNavbar";

export function SleepScreen() {

    const {updateKeys} = React.useContext(AuthContext);
    const [startTime, setStartTime] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [totalTime, setTotalTime] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [note, setNote] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [countdown, setCountdown] = useState('00:00:00');
    const [sleepStartTime, setSleepStartTime] = useState(null);
    const [sleepEndTime, setSleepEndTime] = useState(null);
    const [lastSleepTime, setLastSleepTime] = useState(null);
    const [sleepDuration, setSleepDuration] = useState(null);
    const [timeGap, setTimeGap] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        if (isRunning) {
            const interval = setInterval(() => {
                setEndTime(new Date());
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [isRunning]);

    useEffect(() => {
        if (isRunning) {
            const interval = setInterval(() => {
                updateCountdown();
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [isRunning, endTime]);

    useEffect(() => {
        lastSleep();
    }, []);


    const addHoursAndMinutesToDateTime = (dateTime, hours, minutes) => {
        const adjustedDateTime = new Date(dateTime);
        adjustedDateTime.setHours(adjustedDateTime.getHours() + hours);
        adjustedDateTime.setMinutes(adjustedDateTime.getMinutes() + minutes);
        return adjustedDateTime;
    };

    const lastSleep = async () => {
        const currentDate = new Date().toISOString().slice(0, 10);
        const apiURL = BASE_URL + "/api/sleep/last-sleep/" + currentDate;
        try {
            await updateKeys();
            // const response = await SleepApiGetLast();
            const response = await axios.get(apiURL, null);
            console.log(response.data);
            const sleepStartTime = response.data.sleepStartTime;
            const dateObj = new Date(sleepStartTime);
            const formattedTime = dateObj.toLocaleString(undefined, {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            });
            if (response.data.sleepStartTime == null) {
                setLastSleepTime("No data found");
            }else {
                setLastSleepTime(lastSleep?("Last Sleep at " + formattedTime):"No data found");
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
            const timeDifferenceInMillis = sleepEndTime - currentTime;
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

    const startTimer = () => {
        const currentDate = new Date();
        // const adjustedStartTime = addHoursAndMinutesToDateTime(currentDate, 5, 30);
        setSleepStartTime(currentDate);
        setStartTime(currentDate);
        setStartDate(currentDate.toLocaleDateString());
        setIsRunning(true);
        updateCountdown();
    };

    const stopTimer = () => {
        setIsRunning(false);
        const currentDate = new Date();
        // const adjustedEndTime = addHoursAndMinutesToDateTime(currentDate, 5, 30);
        setSleepEndTime(currentDate);
        setEndTime(currentDate);
        setTotalTime(endTime - startTime);
        calculateTotalTime();
        setModalVisible(true);
    };

    const calculateTotalTime = () => {
        const elapsedTime = endTime - startTime;
        const seconds = Math.floor((elapsedTime / 1000) % 60);
        const minutes = Math.floor((elapsedTime / 1000 / 60) % 60);
        const hours = Math.floor((elapsedTime / 1000 / 3600) % 24);
        setTotalTime(`${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`);
    };

    const intervalRef = useRef(null);

    const resetTimer = () => {
        clearInterval(intervalRef.current);
        setStartTime(null);
        setStartDate(null);
        setEndTime(null);
        setEndDate(null);
        setTotalTime(null);
        setCountdown('00:00:00');
        setIsRunning(false);
    };

    const storeData = async (data) => {
        console.log("sleep data: "+data);
        const apiURL = BASE_URL + "/api/sleep/save";
        try {
            await updateKeys();
            const response = await axios.post(apiURL, data);
            // const response = await SleepApi(data);
            navigation.navigate("SleepTimeline");
            console.log(response.data);
        } catch (error) {
            console.log(error);
            console.log(data);
        }
    };

    const saveTimerData = () => {
        const sleepDuration = totalTime;
        const data = {
            sleepStartTime,
            sleepEndTime,
            sleepDuration,
            note,
        };
        console.log(data);
        storeData(data).then(r => console.log(r));
        console.log(sleepStartTime);
        console.log(sleepEndTime);
        console.log(totalTime);
        console.log(note);
        resetTimer();
    };

    const updateCountdown = () => {
        if (isRunning) {
            const currentTime = new Date();
            const elapsedTime = currentTime - startTime;
            const seconds = Math.floor((elapsedTime / 1000) % 60);
            const minutes = Math.floor((elapsedTime / 1000 / 60) % 60);
            const hours = Math.floor((elapsedTime / 1000 / 3600) % 24);
            setCountdown(`${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`);
        } else {
        setCountdown('00:00:00');
        }
    };

    const padTime = time => {
        return String(time).padStart(2, '0');
    };

    const previewTime = () => {
        const currentTime = new Date();
        const elapsedTime = currentTime - startTime;
        const seconds = Math.floor((elapsedTime / 1000) % 60);
        const minutes = Math.floor((elapsedTime / 1000 / 60) % 60);
        const hours = Math.floor((elapsedTime / 1000 / 3600) % 24);

        return (
            <View className={"flex flex-row my-32 justify-center p-5"}>
                <Text className={"font-bold text-7xl"}>{padTime(hours)}</Text>
                <Text className={"font-bold text-7xl"}>:</Text>
                <Text className={"font-bold text-7xl"}>{padTime(minutes)}</Text>
                <Text className={"font-bold text-7xl"}>:</Text>
                <Text className={"font-bold text-7xl"}>{padTime(seconds)}</Text>
            </View>
        );
    };

    const renderTime = () => {
        if (isRunning) {
            return previewTime();
        } else {
            return (
                <View className={"flex flex-row my-32 justify-center p-5"}>
                    <Text className={"font-bold text-7xl"}>00</Text>
                    <Text className={"font-bold text-7xl"}>:</Text>
                    <Text className={"font-bold text-7xl"}>00</Text>
                    <Text className={"font-bold text-7xl"}>:</Text>
                    <Text className={"font-bold text-7xl"}>00</Text>
                </View>
            );
        }
    };

    return (
        <SafeAreaView className={"flex-1 relative"}>
            <View>
                <SleepHeader screen={"Baby"} />
                <View className={"flex flex-row items-center px-2 border m-2 rounded-2xl border-secondary"}>
                    <Image className={"h-8 w-8"} source={require("../assets/images/sleeping.png")} />
                    <View className={"flex-1 flex-col p-2"}>
                        <View className={"flex flex-row justify-between items-center"}>
                            <Text className={"text-2xl font-bold opacity-70"}>{lastSleepTime}</Text>
                            <Text className={"opacity-50"}>{timeGap}</Text>
                        </View>
                        <View className={"flex flex-row items-center"}>
                            <ClockIcon size="15" color="gray" />
                            <Text className={"px-1"}>{sleepDuration}</Text>
                        </View>
                    </View>
                </View>
                {renderTime()}
                {!isRunning ? (
                    <View>
                        <Pressable className={"mt-8 py-2"} onPress={() => navigation.navigate("Time")}>
                            <View className={"flex flex-row justify-center items-center"}>
                                <Icon name={"i-cursor"} color={"#7AABAF"}/>
                                <Text className={"text-secondary px-2"}>Enter Time Manually</Text>
                            </View>
                        </Pressable>
                        <FilledButton title={"Start"} onPress={startTimer} icon={"play"}/>
                    </View>
                ) : (
                    <View>
                        <Pressable className={"mt-8 py-2 opacity-50"}>
                            <View className={"flex flex-row justify-center items-center opacity-50"}>
                                <Icon name={"i-cursor"} color={"#7AABAF"}/>
                                <Text className={"text-secondary px-2"}>Enter Time Manually</Text>
                            </View>
                        </Pressable>
                        <FilledButton title={"Stop"} onPress={stopTimer} icon={"stop"}/>
                    </View>
                )}
                    <View>
                        <Modal visible={modalVisible} animationType="slide">
                            <View className={"flex-1 justify-center"}>
                                <View className={"m-4 rounded-3xl p-2 border border-primary"}>
                                    {/*<Text>Total Time Slept: {totalTime}</Text>*/}
                                    <TextInput
                                        className={"border-primary rounded-2xl border h-20 p-1 my-1"}
                                        placeholder="Add a note (Optional)"
                                        value={note}
                                        onChangeText={text => setNote(text)}
                                    />
                                    <FilledButton title={"Save"} onPress={saveTimerData} icon={"save"}/>
                                </View>
                            </View>
                        </Modal>
                    </View>
            </View>
        </SafeAreaView>
    )
}