import {View, Text, FlatList, Image, Pressable, TouchableOpacity} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import SleepHeader from "../components/sleepHeader";
import React, {useEffect} from "react";
import {ClockIcon} from "react-native-heroicons/solid";
import { PieChart } from 'react-native-chart-kit';
import {useNavigation} from "@react-navigation/native";
import {AuthContext} from "../Context/AuthContext";
import {BASE_URL} from "../config";
import axios from "axios";
import {themeColors} from "../theme";
import {ChartBarSquareIcon} from "react-native-heroicons/outline";
export function SleepTimelineScreen() {
    const { updateKeys } = React.useContext(AuthContext);
    const [sleepList, setSleepList] = React.useState([]);
    const [totalSleep, setTotalSleep] = React.useState(0);
    const navigation = useNavigation();
    useEffect(() => {
        getAll();
        totalTime();
    }, []);

    const totalTime = async () => {
        const currentDate = new Date().toISOString().slice(0, 10);
        const apiURL = BASE_URL + "/Api/sleep/total-sleep-duration/" + currentDate;
        try {
            await updateKeys();
            // const response = await SleepApiGetTotal();
            const response = await axios.get(apiURL, null);
            if (response.data === "") {
                setTotalSleep(0);
                return;
            }else {
                const totalMilliseconds = parseDurationToMilliseconds(response.data);
                setTotalSleep(totalMilliseconds);
            }
            // console.log(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    const parseDurationToMilliseconds = (durationString) => {
        const [hours, minutes, seconds] = durationString.split(':');
        return (parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds)) * 1000;
    };

    const formatDuration = (totalMilliseconds) => {
        const totalSeconds = totalMilliseconds / 1000;
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        return `${hours} hours and ${minutes} minutes`;
    };

    const getAll = async () => {
        const currentDate = new Date().toISOString().slice(0, 10);
        const apiURL = BASE_URL + "/Api/sleep/all-sleeps/" + currentDate;
        try {
            await updateKeys();
            // const response = await SleepApiGetAll();
            const response = await axios.get(apiURL, null);
            // console.log(response.data);
            const sleeps = response.data;
            const sleepDuration = (time) => {
                const totalSleepTime = time;
                const [hoursStr, minutesStr, secondsStr] = totalSleepTime.split(':');
                const hours = parseInt(hoursStr, 10);
                const minutes = parseInt(minutesStr, 10);
                if (hours === 0) {
                    return "Duration " + `${minutes}` + " minutes";
                }else if (hours === 1) {
                    return "Duration " + `${hours}` + " hour and " + `${minutes}` + " minutes";
                } else {
                    return "Duration " + `${hours}` + " hours and " + `${minutes}` + " minutes";
                }
            }
            setSleepList({
                sleeps: sleeps.map((sleep) => ({
                    id: sleep.sleepID,
                    lastSleepTime: new Date(sleep.sleepStartTime).toLocaleString(undefined, {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                    }),
                    sleepDuration: sleepDuration(sleep.sleepDuration),
                })),
            });
            // console.log(sleepList);
        } catch (e) {
            console.log(e);
        }
    }

    let requiredSleep = 16 * 60 * 60 * 1000;
    const percentageSleep = ((totalSleep / requiredSleep) * 100).toFixed(2);
    const data = [
        { key: 1, name: 'Sleep', amount: totalSleep, color: '#91C9CE' },
        { key: 2, name: 'Remaining', amount: requiredSleep - totalSleep, color: '#e7e7e7' },
    ];
    const renderItem = ({ item }) => (
            <View className={"flex flex-row items-center px-2 border m-2 rounded-2xl border-secondary"}>
                <Image className={"h-8 w-8"} source={require("../assets/images/sleeping.png")}/>
                <View className={"flex-1 flex-col p-2"}>
                    <View>
                        <Text className={"text-2xl font-bold opacity-70"}>{item.lastSleepTime}</Text>
                    </View>
                    <View className={"flex flex-row items-center"}>
                        <ClockIcon size="15" color="gray"/>
                        <Text className={"px-1"}>{item.sleepDuration}</Text>
                    </View>
                </View>
            </View>
    );

    return(
        <SafeAreaView>
            <SleepHeader screen={"Baby"} />
            <View className={"flex flex-row justify-center"}>
                <Text className={"font-bold text-2xl"}>Sleep Timeline</Text>
            </View>
            <FlatList
                style={{height: "58%"}}
                data={sleepList.sleeps}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
            <View className={"border border-primary shadow rounded-t-3xl pb-2"}>
                <View className={"flex flex-row items-center"}>
                    <View className={"p-1"}>
                        <PieChart
                            data={data}
                            width={140}
                            height={170}
                            chartConfig={{
                                color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                            }}
                            accessor="amount"
                            backgroundColor="transparent"
                            paddingLeft="35"
                            absolute
                            hasLegend={false}
                        />
                    </View>
                    <View>
                        <Text>Recommended Sleep : 16 Hours</Text>
                        <Text className={"text-2xl font-bold"}>Daily Sleep Time</Text>
                        <Text>Baby Slept {formatDuration(totalSleep)}</Text>
                        <Text>Baby gets {percentageSleep}% of required sleep</Text>
                    </View>
                </View>
                <Pressable onPress={() => navigation.navigate("Sleeping")}>
                    <View className={"flex items-center h-50 border-2 bg-primary p-2 mx-8 my-1 rounded-full border-secondary"}>
                        <View className={"flex flex-row items-center justify-center"}>
                            <Text className={"pl-4 font-bold text-base"} style={{color:"white"}}>Add New Sleeping Activity</Text>
                        </View>
                    </View>
                </Pressable>
            </View>
            <TouchableOpacity
                className={"absolute bottom-64 right-5 rounded-full p-1"}
                style={{backgroundColor:themeColors.btnColor}}
                onPress={() => navigation.navigate('SleepChart')}
            >
                <ChartBarSquareIcon size="40" color="white" />
            </TouchableOpacity>
        </SafeAreaView>
    )
}