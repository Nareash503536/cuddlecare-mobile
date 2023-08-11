import React, {createContext, useState} from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {DateAndTime} from "./DateAndTime";
import {FoodList} from "./FoodList";
import {ReactionsList} from "./ReactionsList";
import {SafeAreaView} from "react-native-safe-area-context";
import Input from "../Form Component/Input";
import {themeColors} from "../../theme";
import {GlobalStyles} from "../../constants/styles";
import SelectDateTime from "./SelectDateTime";

export const solidfoodContext = createContext();
export function SolidFood() {

    const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
    const [startTime, setStartTime] = useState('');
    const inputStyles = [styles.input];
    const textInputConfig = {
        keyboardType: 'decimal-pad',
        placeholder:'0.0 ml',
        multiline: true,

    }
    if (textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.inputMultiline)
    }
    return (
        <solidfoodContext.Provider value={{
            isStartDatePickerVisible,
            setStartDatePickerVisible,
            startDate,
            setStartDate,
            isStartTimePickerVisible,
            setStartTimePickerVisible,
            startTime,
            setStartTime
        }}>
        <SafeAreaView className={"px-3"}>
            <ScrollView>
                <SelectDateTime />
                <Text style={[styles.label ]} className={"text-center mb-2"}>Pick a Category </Text>
                <FoodList/>
                <Text style={[styles.label ]} className={"text-center mb-2"}>Add a Reaction </Text>

                <ReactionsList/>
                <View>
                    <Input
                        label="Notes"
                        // invalid ={!inputs.notes.isValid}
                        textInputConfig={{
                            multiline: true,
                            // onChangeText: inputChangedHandler.bind(this, 'notes'),
                            // value: inputs.notes.value,


                        }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
        </solidfoodContext.Provider>
    )
}
const styles = StyleSheet.create({
    savebtn:{
        width: 200,
        height: 50,
        borderRadius: 4,
        padding: 8,
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: themeColors.colorDark,


    },
    buttonText: {
        color: 'white',
        fontSize: 20,

    },
    label: {
        color: themeColors.colorDark,
        fontSize: 18,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(128, 128, 128, 0.5)',
        borderRadius: 10,
    },
    input: {
        backgroundColor: themeColors.bgInput(0.1),
        color: GlobalStyles.colors.primary700,
        width: 300,
        alignSelf: 'center',
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
    },
    babyimg: {
        width: 200,
        height: 250,
        alignSelf: 'center',
        transform:[{scale:0.8}],
    },
    bottleDiv:{
        backgroundColor:themeColors.colorDark,
        borderRadius: 10,
        padding: 3,
        transform:[{scale:0.9}],
        width: 150,

    },
    bottleText:{
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        bottom: 10,
    }

});