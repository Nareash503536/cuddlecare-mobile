import { View, Image, Text, TouchableOpacity } from "react-native";
import images from "../../../constants/images";
import { styles } from "./ButtonStyle";
import { useNavigation } from "@react-navigation/native";

export function BabyIcon() {

    const navigation = useNavigation();

    return (
        <View
        >
            <Text className={"text-[#477276] text-xl text-center font-bold"}>
                Tell us about your baby
            </Text>
            <Image
                source={images.baby}
                resizeMode="contain"
                className={"h-64 w-44 mx-auto"}
            />
            
        </View>
    );
}