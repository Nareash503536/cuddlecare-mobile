import { useNavigation } from "@react-navigation/native";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { ButtonStyles } from "./ButtonStyle";

export function VerifyButton({ phoneNumber, email, password }) {

    let navigation = useNavigation();
    return (
        <View>
            <TouchableOpacity
                className={"flex-row mt-8"}
                style={ButtonStyles.Button}
                name="next"
                onPress={() => navigation.navigate("OTPscreen", {
                    phoneNumber: phoneNumber,
                    email: email,
                    password: password
                })}
            >
                <Text className="text-white text-2xl">
                    Verify
                </Text>
            </TouchableOpacity>
        </View>
    );
}