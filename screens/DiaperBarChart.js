import {SafeAreaView} from "react-native-safe-area-context";
import React, {useEffect, useState} from "react";
import {BarChart} from "react-native-chart-kit";
import {View, Text} from "react-native";
import DiaperHeader from "../components/diaperHeader";
import {BASE_URL} from "../config";
import axios from "axios";
import {AuthContext} from "../Context/AuthContext";

export function DiaperBarChart(){
    const { updateKeys } = React.useContext(AuthContext);
    const [data, setData] = useState([]);
    const [averageCount, setAverageCount] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const apiURL = BASE_URL + "/api/diaper/weeklyDiaperCount";
        try {
            await updateKeys();
            const response = await axios.get(apiURL, null);
            const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
            const dataMap = new Map(response.data.map(item => [item.date, item.count]));
            const result = daysOfWeek.map(day => ({
                date: day,
                count: dataMap.get(day) || 0
            }));
            const totalCount = result.reduce((acc, day) => acc + day.count, 0);
            const average = totalCount / 7;
            setData(result);
            setAverageCount(average);
        } catch (e) {
            console.log(e);
        }
    };
    return(
        <SafeAreaView>
            <DiaperHeader screen={"DiaperTimeline"} />
            <Text className={"flex text-center text-2xl p-2 text-primary font-bold"}>Diaper Change Pattern of a Week</Text>
            <View className={"flex items-center p-2"}>
                <BarChart
                    data={{
                        labels: data.map(item => item.date),
                        datasets: [
                            {
                                data: data.map(item => item.count),
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
                <Text className={"p-2 py-4 font-bold"}>Average Diaper Change Count Got in the Last Week : {averageCount.toFixed(0)}</Text>
            </View>
        </SafeAreaView>
    )
}