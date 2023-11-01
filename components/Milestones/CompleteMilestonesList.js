import {FlatList, View, Text, ScrollView} from "react-native";
import Milestone from "./Milestone";
import CompletedMilestone from "./CompletedMilestone";

function renderMilestonesDetails(milestoneData) {
    return <CompletedMilestone {...milestoneData.item} />;
}
export default function CompleteMilestonesList({milestoneData}) {
    return (
            <FlatList
                contentContainerStyle={{paddingBottom: 100}}
                data={milestoneData}
                renderItem={renderMilestonesDetails}
                keyExtractor={(milestone) => milestone.id}
            />
    )
}
