import * as React from 'react';
import {View, useWindowDimensions, TouchableOpacity} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {ChartGenerator} from "../../components/GrowthChart/ChartGenerator";
import {themeColors} from "../../theme";
import {PlusSmallIcon} from "react-native-heroicons/solid";
import {useNavigation} from "@react-navigation/native";
import {ClipboardDocumentListIcon} from "react-native-heroicons/outline";
import {getFormattedDate} from "../../util/date";

const line_chart_Weightdata = [
    { month: 0, value: 3.5, date:getFormattedDate(new Date(2022, 9, 27))},
    { month: 1, value: 4.6, date: getFormattedDate(new Date(2022, 10, 28)) },
    { month: 2, value: 5.6, date: getFormattedDate(new Date(2022, 11, 29)) },
    { month: 3, value: 6 , date: getFormattedDate(new Date(2022, 12, 27))},
    { month: 4, value: 6.6, date: getFormattedDate(new Date(2023, 1, 24))},
    { month: 5, value: 7.9, date: getFormattedDate(new Date(2023, 2, 27))},
    { month: 6, value: 8.8, date: getFormattedDate(new Date(2023, 3, 26))},
    { month: 7, value: 10.3, date: getFormattedDate(new Date(2023, 4, 29))},
    { month: 8, value: 10.7, date: getFormattedDate(new Date(2023, 5, 25))},
    { month: 9, value: 11.4, date: getFormattedDate(new Date(2023, 6, 24))},
    // { month: 10, value: 12 },
];

const line_chart_Heightdata = [
    { month: 0, value: 50.6, date: getFormattedDate(new Date(2022, 9, 27)), },
    { month: 1, value: 55.2, date: getFormattedDate(new Date(2022, 10, 28)), },
    { month: 2, value: 63.5, date: getFormattedDate(new Date(2022, 11, 29)), },
    { month: 3, value: 64.2, date: getFormattedDate(new Date(2022, 12, 27))},
    { month: 4, value: 66.2, date: getFormattedDate(new Date(2023, 1, 24))},
    { month: 5, value: 68, date: getFormattedDate(new Date(2023, 2, 27))},
    { month: 6, value: 69.5, date: getFormattedDate(new Date(2023, 3, 26))},
    { month: 7, value: 71, date: getFormattedDate(new Date(2023, 4, 29))},
    { month: 8, value: 72.1, date: getFormattedDate(new Date(2023, 5, 25))},
    { month: 9, value: 74.2, date: getFormattedDate(new Date(2023, 6, 24))}
    // { month: 10, value: 79 },
];

const line_chart_Headtdata = [
    { month: 0, value: 34.5, date: getFormattedDate(new Date(2022, 9, 27))},
    { month: 1, value: 35.8, date: getFormattedDate(new Date(2022, 10, 28)) },
    { month: 2, value: 36.4, date: getFormattedDate(new Date(2022, 11, 29)) },
    { month: 3, value: 41.5, date: getFormattedDate(new Date(2022, 12, 27)) },
    { month: 4, value: 42.2, date: getFormattedDate(new Date(2023, 1, 24))},
    { month: 5, value: 43.6, date: getFormattedDate(new Date(2023, 2, 27))},
    { month: 6, value: 44.7,date: getFormattedDate(new Date(2023, 3, 26)) },
    { month: 7, value: 46.8,date: getFormattedDate(new Date(2023, 4, 29)) },
    { month: 8, value: 47.2,date: getFormattedDate(new Date(2023, 5, 25))},
    { month: 9, value: 48.4, date: getFormattedDate(new Date(2023, 6, 24)) },
    // { month: 10, value: 50 },
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
const FourthRoute = () => (
    <ChartGenerator
        Gender="Boy"
        chartType="BMI"
        chartData={line_chart_Headtdata}
    />
);

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: FourthRoute,
});

export default function GrowthChartScreen() {
    const navigation = useNavigation();
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Weight' },
        { key: 'second', title: 'Height' },
        { key: 'third', title: 'Head Circum' },
        { key: 'fourth', title: 'BMI' },
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
                onPress={() => navigation.goBack()}
            >
                <ClipboardDocumentListIcon size="40" color="white"  />
            </TouchableOpacity>
        </>
    );
}