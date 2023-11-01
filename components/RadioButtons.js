import  React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { RadioButton } from 'react-native-paper';
import {themeColors} from "../theme";
import {GlobalStyles} from "../constants/styles";
// import Dropdown from './Dropdown';
// {handleRadioChange}

const RadioBtn = ({inputHandler}) => {
    const [selected, setSelected] = React.useState('RingOnce');

    const handleRadioChange = (value) => {
        setSelected(value);
        inputHandler('ringing_fr',value);
    }
    return (
        <View className={"flex-row space-x-10"} >
            <View>
                <RadioButton
                    value="RingOnce"
                    label = "RingOnce"
                    status={ selected === 'RingOnce' ? 'checked' : 'unchecked' }
                    onPress={() =>
                        handleRadioChange('RingOnce')
                    }


                />
                <Text style={styles.label} className={"text-xs"}>Ring Once</Text>

            </View>

            <View>
                <RadioButton
                    value="keepRinging"
                    status={ selected === 'keepRinging' ? 'checked' : 'unchecked' }
                    onPress={() => {

                        handleRadioChange('keepRinging')
                    }
                    }
                />
                <Text style={styles.label} className={"text-xs"}>keep Ringing</Text>
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