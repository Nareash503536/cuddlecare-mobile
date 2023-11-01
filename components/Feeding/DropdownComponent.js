import React, { useState } from 'react';
import {StyleSheet, View} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import {themeColors} from "../../theme";
import {GlobalStyles} from "../../constants/styles";


const DropdownComponent = ({onCategorySelect,data,name,defaultval=null}) => {

    const handleCategoryChange = (value) => {
        // Call the onCategorySelect function here with the new value
        onCategorySelect(name ,value);
    };

    const [value, setValue] = useState(defaultval);

    return (
        <View className={"my-1 mx-8 "}>
        <Dropdown
            className={"p-2 rounded-xl"}
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="mg"
            searchPlaceholder="Search..."
            value={value}
            onChange={item => {
                setValue(item.value);
                handleCategoryChange(item.value);

                console.log("Selected item: " + item.value);
            }}
            renderLeftIcon={() => (
                <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
            )}
        />
        </View>
    );
};

export default DropdownComponent;

const styles = StyleSheet.create({
    dropdown: {
        padding: 10,
        marginTop: 20,
        width:90,
        backgroundColor: themeColors.bgInput(0.1),
        color: GlobalStyles.colors.primary700,


    },
    icon: {
        marginRight: 5,
        color: 'gray',
    },
    placeholderStyle: {
        fontSize: 16,
        color: 'gray',
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});