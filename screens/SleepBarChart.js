import {SafeAreaView} from "react-native-safe-area-context";
import SleepHeader from "../components/sleepHeader";
import {useEffect, useState} from "react";
import {BarChart} from "react-native-chart-kit";
import {View, Text} from "react-native";

export function SleepBarChart(){
    const [data, setData] = useState([]);
    const [averageSleep, setAverageSleep] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        // Fetch data from the backend or use mock data
        const mockData = [
            { date: 'Mon', sleepDuration: 450 },
            { date: 'Tue', sleepDuration: 540 },
            { date: 'Wed', sleepDuration: 420 },
            { date: 'Thu', sleepDuration: 510 },
            { date: 'Fri', sleepDuration: 480 },
            { date: 'Sat', sleepDuration: 600 },
            { date: 'Sun', sleepDuration: 570 },
        ];

        const totalSleep = mockData.reduce((total, item) => total + item.sleepDuration, 0);
        const average = totalSleep / mockData.length;

        setData(mockData);
        setAverageSleep(average);
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