import { StyleSheet } from 'react-native';
import {COLORS} from "../../../constants/theme";

export const styles = StyleSheet.create({
    textInput: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        borderColor: COLORS.tertiary,
        borderWidth: 2,
        backgroundColor: "white",
        height: 50,
        margin: 5,
        padding: 10,
        paddingLeft: 20,
    },

    loginButton: {
        alignItems: 'center',
        backgroundColor: COLORS.secondary,
        height: 50,
        justifyContent: 'center',
        margin: 12,
        borderRadius: 50,
        borderColor: COLORS.tertiary,
        borderWidth: 2,
    }
});