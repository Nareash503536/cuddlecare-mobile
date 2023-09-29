import {SafeAreaView} from "react-native-safe-area-context";
import {useEffect, useState} from "react";
import {BarChart} from "react-native-chart-kit";
import {View, Text} from "react-native";
import DiaperHeader from "../components/diaperHeader";

export function DiaperBarChart(){
    const [data, setData] = useState([]);
    const [averageCount, setAverageCount] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        // Fetch data from the backend or use mock data
        const mockData = [
            { date: 'Mon', diaperChanges: 5 },
            { date: 'Tue', diaperChanges: 7 },
            { date: 'Wed', diaperChanges: 4 },
            { date: 'Thu', diaperChanges: 6 },
            { date: 'Fri', diaperChanges: 0 },
            { date: 'Sat', diaperChanges: 0 },
            { date: 'Sun', diaperChanges: 0 },
        ];

        const totalCount = mockData.reduce((total, item) => total + item.diaperChanges, 0);
        const average = totalCount / mockData.length;

        setData(mockData);
        setAverageCount(average);
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
                                data: data.map(item => item.diaperChanges),
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