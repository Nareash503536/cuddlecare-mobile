import  React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { RadioButton } from 'react-native-paper';
import {themeColors} from "../theme";
import {GlobalStyles} from "../constants/styles";
// import Dropdown from './Dropdown';

const RadioBtn = ({handleRadioChange}) => {
  const [selected, setSelected] = React.useState('once');


  return (
    <View className={"flex-row space-x-10"} >
        <View>
        <RadioButton
        value="once"
        label = "once"
        status={ selected === 'once' ? 'checked' : 'unchecked' }
        onPress={() => {
            setSelected('once')
            handleRadioChange(false)}
        }
        />
          <Text style={styles.label} className={"text-xs"}>Once</Text>

        </View>

        <View>
            <RadioButton
                value="repeat"
                status={ selected === 'repeat' ? 'checked' : 'unchecked' }
                onPress={() => {
                    setSelected('repeat')
                    handleRadioChange(true)}
                }
            />
            <Text style={styles.label} className={"text-xs"}>Repeat</Text>
        </View>
    </View>
  
  );
};

export default RadioBtn

const styles = StyleSheet.create({
    label: {
        color: themeColors.colorDark,
    },
});