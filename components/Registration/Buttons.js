import { TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import {Button} from "native-base";
import React from "react";
import {COLORS} from "../../constants/theme";
import { styles } from "./buttonStyles";

export function Buttons () {
    return (
        <View>
            <View>
                <TouchableOpacity style={styles.Button}>
                    <Text>
                        Register
                    </Text>
                </TouchableOpacity>
            </View>
            <View className={"m-2"} style={{ borderBottomColor: COLORS.primary, borderBottomWidth: 2 }} />
            <View>
                <TouchableOpacity style={styles.Button}>
                    <Text>
                        Continue with Google
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Button}>
                    <Text>
                        Continue with Email
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
    }

