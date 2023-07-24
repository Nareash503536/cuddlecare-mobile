import { Text, TextInput, View,StyleSheet } from 'react-native';
import {GlobalStyles} from "../../constants/styles";
import {themeColors} from "../../theme";
import {COLORS} from "../../constants/theme";

function Input({ label, textInputConfig ,invalid}) {

    const inputStyles = [styles.input];

    if (textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.inputMultiline)
    }
    if(invalid){
        inputStyles.push(styles.invalidInput)
    }
    return (
        <View  className={"my-1 mx-8 flex-1Z"}>
            <Text style={[styles.label,invalid && styles.inbalidLable ]} className={"text-xs mb-2"}>{label}</Text>
            <TextInput className={"p-2 rounded-xl text-lg"} style={inputStyles} {...textInputConfig} />
        </View>
    );
}

export default Input;

const styles = StyleSheet.create({

    label: {
        color: themeColors.colorDark,
    },
    input: {
        backgroundColor: themeColors.bgInput(0.1),
        color: GlobalStyles.colors.primary700,
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top'
    },
    inbalidLable: {
        color: GlobalStyles.colors.error500
    },
    invalidInput: {
        backgroundColor:themeColors.bgInputDager(0.2),
    }
});