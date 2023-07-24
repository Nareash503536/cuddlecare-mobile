import {FlatList, View,Text} from "react-native";
import GrowthMeasurement from "./GrowthMeasurement";

function renderGrowthDetails(growthData) {
    return <GrowthMeasurement {...growthData.item} />;
}
export default function GrowthMeasurementList({growthData}) {
    // console.log("growthData",growthData)

    return (
        <View>
            <View className={"flex-row justify-between px-3 py-3 items-center"}>
                <Text className={"w-2/5 flex-row text-center "}>Date</Text>
                <Text className={"w-1/5 text-center"}>Weight  (kg)</Text>
                <Text className={"w-1/5 text-center"}>Height (cm)</Text>
                <Text className={"w-1/5 text-center"}>Head Circum. (cm)</Text>
            </View>

            <FlatList
                data={growthData}
                renderItem={renderGrowthDetails}
                keyExtractor={(growth) => growth.id}
            />
        </View>
    )
}
