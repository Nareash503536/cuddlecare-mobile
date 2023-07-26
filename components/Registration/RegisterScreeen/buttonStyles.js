import { StyleSheet } from 'react-native';
import {COLORS} from "../../../constants/theme";

export const styles = StyleSheet.create({
    Button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        height: 50,
        justifyContent: 'center',
        margin: 5,
        borderRadius: 50,
        borderColor: COLORS.tertiary,
        borderWidth: 2,
        backgroundColor: "white",
    }
});