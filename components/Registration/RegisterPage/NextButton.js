import { View, Image, Text, TouchableOpacity } from "react-native";
import images from "../../../constants/images";
import { styles } from "./ButtonStyle";
import { useContext } from "react";
import {handleNavigateContext} from "../../../screens/Registration/RegisterPage";

export function NextButton() {

    const { handleNavigate } = useContext(handleNavigateContext);

    return (
        <View
        >
            <TouchableOpacity
                className={"flex-row mt-8"}
                style={styles.Button}
                name="next"
                onPress={() => handleNavigate()}
            >
                <Text className="text-white">
                    Next
                </Text>
            </TouchableOpacity>

        </View>
    );
}








