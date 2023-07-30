import {Dimensions, View} from "react-native";
import {LineChart} from "react-native-chart-kit";
import React from "react";


export function HeadCircumChart() {
    return (
        <View className={"pt-5"}>
            <View className={"flex-row flex-1 justify-center items-center"}>
                <LineChart
                    data={{
                        labels: ["January", "February", "March", "April", "May", "June","May", "June","May", "June"],
                        datasets: [
                            {
                                data: [
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100
                                ]
                            }
                        ]
                    }}
                    width={Dimensions.get("window").width*0.96} // from react-native
                    height={450}
                    yAxisLabel=""
                    yAxisSuffix=""
                    yAxisInterval={1} // optional, defaults to 1
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
