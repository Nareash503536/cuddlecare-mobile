import {Pressable, Text, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function FilledButton(props){
    return(
        <Pressable onPress={props.onPress}>
            <View className={"flex items-center h-50 m-5 border-2 bg-primary p-4 mx-8 rounded-full border-secondary"}>
                <View className={"flex flex-row items-center justify-center"}>
                        <Icon name={props.icon} size={20} color="white" />
                        <Text className={"pl-4 font-bold text-base"} style={{color:"white"}}>{props.title}</Text>
                </View>
            </View>
        </Pressable>
    );
}