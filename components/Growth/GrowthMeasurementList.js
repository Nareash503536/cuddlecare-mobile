import {FlatList, View, Text, ScrollView} from "react-native";
import GrowthMeasurement from "./GrowthMeasurement";

function renderGrowthDetails(growthData) {
    return <GrowthMeasurement {...growthData.item} />;
}
export default function GrowthMeasurementList({growthData}) {

    return (
        <ScrollView showsVerticalScrollIndicator={false} className={"p-2 pb-3"}>
            <FlatList
                data={growthData}
                renderItem={renderGrowthDetails}
                keyExtractor={(growth) => growth.id}
            />
        </ScrollView>
    )
}
