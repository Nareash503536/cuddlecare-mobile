import { Text, TextInput, View,StyleSheet } from 'react-native';
import {GlobalStyles} from "../../constants/styles";
import {themeColors} from "../../theme";
import {COLORS} from "../../constants/theme";

function Input({ label, textInputConfig ,invalid}) {

    const inputStyles = [styles.input];

    return (
        <View  className={"my-1 flex-1Z"}>
            <Text  className={"text-xs mb-2"}>{label}</Text>
            <TextInput className={"p-2 rounded-xl text-base"} style={inputStyles} placeholder="What's on your mind?" />
        </View>
    );
}

export default Input;

const styles = StyleSheet.create({

    label: {
        color: themeColors.colorDark,
    },
    input: {
        backgroundColor: "white",
        color: GlobalStyles.colors.primary700,
    },
    inputMultiline: {
        // minHeight: 100,
        textAlignVertical: 'top'
    },
    inbalidLable: {
        color: GlobalStyles.colors.error500
    },
    invalidInput: {
        backgroundColor:themeColors.bgInputDager(0.2),
    }
});