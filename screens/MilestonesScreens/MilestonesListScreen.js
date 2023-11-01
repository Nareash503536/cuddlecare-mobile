import * as React from 'react';
import {View, useWindowDimensions, TouchableOpacity} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {useNavigation} from "@react-navigation/native";
import {ClipboardDocumentListIcon} from "react-native-heroicons/outline";
import {themeColors} from "../../theme";
import MilestonesGenerator from "../../components/Milestones/MilestonesGenerator";
import {twoMonthMilestones} from "../../constants/MilestonesDetails/MilestonesData";


const FirstRoute = () => (
    <MilestonesGenerator
        {...twoMonthMilestones}
    />
);

const SecondRoute = () => (
    <MilestonesGenerator
        Type="MONTH 4"
    />
);
const ThirdRoute = () => (
    <MilestonesGenerator
        Type="MONTH 6"
    />
);
const FourthRoute = () => (
    <MilestonesGenerator
        Type="MONTH 8"
    />
);

const FifthRoute = () => (
    <MilestonesGenerator
        Type="MONTH 8"
    />
);

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: FourthRoute,
});

export default function MilestonesListScreen() {
    const navigation = useNavigation();
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'MONTH 2' },
        { key: 'second', title: 'MONTH 4' },
        { key: 'third', title: 'MONTH 6' },
        { key: 'fourth', title: 'MONTH 9' },

    ]);

    return (
        <View>
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
        </View>
    );
}