import {SafeAreaView} from "react-native-safe-area-context";
import SleepHeader from "../components/sleepHeader";
import React, {useEffect, useState} from "react";
import {BarChart} from "react-native-chart-kit";
import {View, Text} from "react-native";
import {BASE_URL} from "../config";
import axios from "axios";
import {AuthContext} from "../Context/AuthContext";

export function SleepBarChart(){
    const { updateKeys } = React.useContext(AuthContext);
    const [data, setData] = useState([]);
    const [averageSleep, setAverageSleep] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const apiURL = BASE_URL + "/api/sleep/weeklySleepData";
        try {
            await updateKeys();
            const response = await axios.get(apiURL, null);
            const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
            const dataMap = new Map(response.data.map(item => [item.date, item.sleepDuration]));
            const result = daysOfWeek.map(day => ({
                date: day,
                sleepDuration: dataMap.get(day) || 0
            }));
            const totalSleep = result.reduce((acc, day) => acc + day.sleepDuration, 0);
            const average = totalSleep / 7;
            setData(result);
            setAverageSleep(average);
        } catch (e) {
            console.log(e);
        }
    };
    return(
        <SafeAreaView>
            <SleepHeader screen={"SleepTimeline"} />
            <Text className={"flex text-center text-2xl p-2 text-primary font-bold"}>Sleep Pattern of a Week</Text>
            <View className={"flex items-center p-2"}>
                <BarChart
                    data={{
                        labels: data.map(item => item.date),
                        datasets: [
                            {
                                data: data.map(item => item.sleepDuration),
                            },
                        ],
                    }}
                    width={390}
                    height={250}
                    yAxisLabel=""
                    fromZero={true}
                    chartConfig={{
                        backgroundColor: '#f0f0f1',
                        backgroundGradientFrom: '#ffffff',
                        backgroundGradientTo: '#f0f0f1',
                        decimalPlaces: 0,
                        color: () => `#91C9CE`,
                        labelColor: () => `#7AABAF`,
                        style: {
                            borderRadius: 16,
                        },
                    }}
                />
                <Text className={"p-2 py-4"}>Average Sleep Baby Got in the Last Week : {averageSleep.toFixed(0)} minutes</Text>
            </View>
        </SafeAreaView>
    )
}