import {Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import {COLORS} from "../../constants/theme";
import {themeColors} from "../../theme";

function Button({ children, onPress, mode, style }) {
  return (
    <View style={style}>
      <TouchableOpacity
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
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

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: themeColors.colorDark,

  },
  flat: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: themeColors.colorDark,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  flatText: {
    color: themeColors.colorDark,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 4,

  },
});
