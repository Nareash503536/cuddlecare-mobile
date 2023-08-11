import {FlatList, View, Text, ScrollView} from "react-native";
import Milestone from "./Milestone";

function renderMilestonesDetails(growthData) {
    return <Milestone {...growthData.item} />;
}
export default function MilestonesList({growthData}) {

    return (
            <FlatList
                data={growthData}
                renderItem={renderMilestonesDetails}
                keyExtractor={(growth) => growth.id}
            />
    )
}
