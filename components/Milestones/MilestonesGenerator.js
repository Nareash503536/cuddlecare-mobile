import {View, Text, FlatList, ScrollView} from "react-native";
import Milestone from "./Milestone";

function renderMilestonesDetails(Social_Milestones) {
    return <Milestone {...Social_Milestones.item} />;
}
export default function MilestonesGenerator({Social_Milestones,Communication_Milestones,Cognitive_Milestones,Physical_Development_Milestones}) {
console.log(Social_Milestones)
    return(
        <ScrollView className={"bg-white"} style={{backgroundColor:"white"}}>
            <View>
                <Text style={{color:"gray"}} className={"text-lg"}> Social Milestones</Text>
                <FlatList className={"pb-5"}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    data={Social_Milestones}
                    renderItem={renderMilestonesDetails}
                    keyExtractor={(milestone) => milestone.id}
                />
            </View>
            <View>
                <Text style={{color:"gray"}} className={"text-lg"}>Communication Milestones</Text>
                <FlatList
                    contentContainerStyle={{ paddingBottom: 20}}
                        data={Communication_Milestones}
                    renderItem={renderMilestonesDetails}
                    keyExtractor={(milestone) => milestone.id}
                />
            </View>
            <View>
                <Text style={{color:"gray"}} className={"text-lg"}>Physical Development Milestones</Text>
                <FlatList
                    contentContainerStyle={{ paddingBottom: 20}}
                    data={Physical_Development_Milestones}
                    renderItem={renderMilestonesDetails}
                    keyExtractor={(milestone) => milestone.id}
                />
            </View>
            <View>
                <Text style={{color:"gray"}} className={"text-lg"}>Cognitive Milestones</Text>
                <FlatList
                    contentContainerStyle={{ paddingBottom: 20}}
                    data={Cognitive_Milestones}
                    renderItem={renderMilestonesDetails}
                    keyExtractor={(milestone) => milestone.id}
                />
            </View>
        </ScrollView>
    )
}