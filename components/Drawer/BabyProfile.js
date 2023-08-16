import {FlatList, View,Image,Text} from "react-native";
import {babyDetails} from "../../constants";

function renderBabyProfile({...babyDetails}) {
    return (
        <View className={"flex mx-2 items-center"}>
            <Image source={babyDetails.item.image} style={{borderWidth:2, borderColor:"#8AADB2"}} className={"w-12 h-12 rounded-full"}/>
            <Text className={"text-xs"} style={{color:"gray"}}>{(babyDetails.item.name).split(" ")[0]}</Text>
        </View>
    );
}

const additionalComponent = (
    <View className={"flex mx-2 items-center"}>
        <Image source={require("../../assets/images/babyAddBtn.png")}  className={"w-12 h-12 rounded-full"}/>
        <Text className={"text-xs"} style={{color:"gray"}}>Add Baby</Text>
    </View>
);


export default function BabyProfile(){
    return(
        <View className={"flex mt-3 justify-center"}>
        <FlatList
                  contentContainerStyle={{ paddingBottom: 20 }}
                  data={babyDetails}
                  renderItem={renderBabyProfile}
                  keyExtractor={(baby) => baby.id}
                  horizontal
                  ListFooterComponent={additionalComponent}
        />
        </View>
    )
}