import { StyleSheet } from 'react-native';
import { COLORS } from "../../../constants/theme";

export const ButtonStyles = StyleSheet.create({
    Button: {
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