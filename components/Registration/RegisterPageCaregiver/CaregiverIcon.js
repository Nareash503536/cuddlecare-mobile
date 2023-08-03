import { View, Image, Text, TouchableOpacity } from "react-native";
import images from "../../../constants/images";
import { ButtonStyles } from "./ButtonStyle";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { handleNavigateContext } from "../../../screens/Registration/RegisterPageCaregiver";

export function CaregiverIcon() {

    const navigation = useNavigation();

    const { setCurrentComponent } = useContext(handleNavigateContext);

    return (
        <View
        >
            <Text className={"text-[#477276] text-xl text-center font-bold"}>
                Get started as Caregiver
            </Text>
            <Image
                source={images.caregiverForRegistration}
                resizeMode="contain"
                className={"h-64 w-44 mx-auto"}
            />
            <TouchableOpacity
                className={"flex-row mt-8"}
                style={ButtonStyles.Button}
                name="next"
                onPress={() => setCurrentComponent("second")}
            >
                <Text className="text-white">
                    Next
                </Text>
            </TouchableOpacity>
        </View>
    );
}