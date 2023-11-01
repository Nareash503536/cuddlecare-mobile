import {Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import {COLORS} from "../../constants/theme";
import {themeColors} from "../../theme";

function DeleteBtn({ children, onPress, mode, style }) {
    return (
        <View style={style}>
            <TouchableOpacity
                onPress={onPress}
            >
                <View style={[styles.button, mode === 'flat' && styles.flat]}>
                    <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>
                        {children}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default DeleteBtn;

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
        padding: 8,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: themeColors.colorDanger,

    },
    buttonText: {
        color: themeColors.colorDanger,
        textAlign: 'center',
    },
    flatText: {
        color: themeColors.colorDanger,
    },
});
