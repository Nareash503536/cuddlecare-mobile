import * as React from 'react';
import {View, useWindowDimensions, TouchableOpacity} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {ChartGenerator} from "../../components/GrowthChart/ChartGenerator";
import {themeColors} from "../../theme";
import {PlusSmallIcon} from "react-native-heroicons/solid";
import {useNavigation} from "@react-navigation/native";

const line_chart_Weightdata = [
    { month: 0, value: 3.5 },
    { month: 1, value: 4.5 },
    { month: 2, value: 5.6 },
    { month: 3, value: 6 },
    { month: 4, value: 6.2 },
    { month: 5, value: 7.9 },
    { month: 6, value: 8.8 },
    { month: 7, value: 10.3 },
    { month: 8, value: 10.7 },
    { month: 9, value: 11.4 },
    { month: 10, value: 12 },
];

const line_chart_Heightdata = [
    { month: 0, value: 50 },
    { month: 1, value: 55 },
    { month: 2, value: 63.5 },
    { month: 3, value: 64.2 },
    { month: 4, value: 66.2 },
    { month: 5, value: 68},
    { month: 6, value: 69.5 },
    { month: 7, value: 71 },
    { month: 8, value: 72.1 },
    { month: 9, value: 74.2 },
    { month: 10, value: 79 },
];

const line_chart_Headtdata = [
    { month: 0, value: 34.5 },
    { month: 1, value: 35.8 },
    { month: 2, value: 36.4 },
    { month: 3, value: 41.5 },
    { month: 4, value: 45.2 },
    { month: 5, value: 43.6},
    { month: 6, value: 44.7 },
    { month: 7, value: 46.8 },
    { month: 8, value: 47.2 },
    { month: 9, value: 48.4 },
    { month: 10, value: 50 },
];

const FirstRoute = () => (
    <ChartGenerator
        Gender="Boy"
        chartType="Weight"
        chartData={line_chart_Weightdata}
    />
);

const SecondRoute = () => (
    <ChartGenerator
        Gender="Boy"
        chartType="Height"
        chartData={line_chart_Heightdata}
    />
);
const ThirdRoute = () => (
    <ChartGenerator
        Gender="Boy"
        chartType="HeadCircum"
        chartData={line_chart_Headtdata}
    />
);

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
});

export default function GrowthChartScreen() {
    const navigation = useNavigation();
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Weight' },
        { key: 'second', title: 'Height' },
        { key: 'third', title: 'Head Circum' },
    ]);

    return (
        <>
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            tabBarStyle={{ backgroundColor: 'white' }}
            renderTabBar={(props) => (
                <TabBar
                    {...props}
                    indicatorStyle={{ backgroundColor: '#7AABAF' }} // Customize indicator color if needed
                    style={{ backgroundColor: 'white',paddingTop:20}} // Change tab bar color to white
                    labelStyle={{ color: '#7AABAF' }}
                />
            )}
        />
            <TouchableOpacity
                className={"absolute bottom-28 right-5 rounded-full p-1"}
                style={{backgroundColor:themeColors.btnColor}}
                onPress={() => navigation.navigate.goBack()}
            >
                <PlusSmallIcon size="40" color="white"  />
            </TouchableOpacity>
        </>
    );
}