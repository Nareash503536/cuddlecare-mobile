import {Dimensions, View,Text} from "react-native";
import {LineChart} from "react-native-chart-kit";
import React from "react";


export function HeightChart() {
    return (
        <View className={'flex justify-center pt-10'}>
            <Text className={"pl-2 font-semibold text-gray-500 text-center"} style={{letterSpacing:1,fontSize:20}}>HEIGHT</Text>
            <View className={"pl-1"}>
                <LineChart
                    data={{
                        labels: ["1", "2", "3", "4", "5", "6","7", "8","9", "10","11","12"],
                        datasets: [
                            {
                                data: ["5", "5", "7", "10", "11", "11","11", "13","14", "16","17"]
                            }
                        ]
                    }}
                    width={Dimensions.get("window").width*0.96} // from react-native
                    height={450}
                    yAxisLabel=""
                    yAxisSuffix=""
                    yAxisInterval={5} // optional, defaults to 1
                    chartConfig={{
                        backgroundColor: "#eee",
                        backgroundGradientFrom: "#7AABAF",
                        backgroundGradientTo: "#7AABAF",
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            backgroundColor: "#7AABAF",
                            stroke: "#fff"
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />
            </View>
        </View>
    )
}
