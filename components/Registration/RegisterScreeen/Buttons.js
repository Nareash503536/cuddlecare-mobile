import { TouchableOpacity } from "react-native";
import { View, Text, Image } from "react-native";
import React from "react";
import {COLORS} from "../../../constants/theme";
import { styles } from "./buttonStyles";
import icons from "../../../constants/icons";
import { useNavigation } from "@react-navigation/native";

export function Buttons () {
    const navigation = useNavigation();
    
    return (
        <View
        >
            <View>
                <TouchableOpacity style={styles.Button}
                    onPress={() => navigation.navigate("SelectUser")}
                    >
                    <Text>
                        Register
                    </Text>
                </TouchableOpacity>
                
            </View>
            <View className={"m-2"} style={{ borderBottomColor: COLORS.primary, borderBottomWidth: 2 }} />
                
                <View className="text-center flex-row justify-center">
                    <Text>
                        Already have an account?
                    </Text>
                    <Text className={"underline underline-offset-"} onPress={() => navigation.navigate("Login")}>
                        Login
                    </Text>
                </View>
        </View>
    );
    }

