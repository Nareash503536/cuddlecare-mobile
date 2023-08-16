import {SafeAreaView} from "react-native-safe-area-context";
import DiaperHeader from "../components/diaperHeader";
import {View, Text, Pressable, TextInput, Alert, TouchableOpacity, StyleSheet} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import React, {useState} from "react";
import moment from "moment/moment";
import {AuthContext} from "../Context/AuthContext";
import FilledButton from "../components/filledButton";

export function DiaperScreen(){
    const {updateKeys} = React.useContext(AuthContext);
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [note, setNote] = useState('');
    const [isTimePickerVisible, setTimePickerVisible] = useState(false);
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [isCheckedPee, setIsCheckedPee] = useState(false);
    const [isCheckedPoo, setIsCheckedPoo] = useState(false);
    const showDatePicker = () => {
        setDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisible(false);
    };

    const handleDateConfirm = (date) => {
        const selectedDate = moment(date, 'MMM DD, YYYY');
        const currentDate = moment();
        const twoDaysAgo = currentDate.clone().subtract(2, 'day');

        if (selectedDate.isBefore(twoDaysAgo)) {
            Alert.alert('Invalid Start Date', 'Date cannot be more than two days ago');
        } else if (selectedDate.isAfter(currentDate)) {
            Alert.alert('Invalid Start Date', 'Date cannot be in the future');
        } else {
            setDate(selectedDate.format('MMM DD, YYYY'));
        }
        hideDatePicker();
    };

    const showTimePicker = () => {
        setTimePickerVisible(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisible(false);
    };

    const handleTimeConfirm = (time) => {
        const selectedTime = moment(time, 'h:mm A');
        const currentDate = moment();
        const selectedDateTime = moment(date + ' ' + selectedTime.format('h:mm A'), 'MMM DD, YYYY h:mm A');

        if (selectedDateTime.isBefore(currentDate)) {
            setTime(selectedTime.format('h:mm A'));
        } else {
            Alert.alert('Invalid Time', 'Time cannot be in the future');
        }
        hideTimePicker();
    };

    const toggleCheckboxPee = () => {
        setIsCheckedPee(!isCheckedPee);
        if (isCheckedPoo) {
            setIsCheckedPoo(!isCheckedPoo);
        }
    };

    const toggleCheckboxPoo = () => {
        setIsCheckedPoo(!isCheckedPoo);
        if (isCheckedPee) {
            setIsCheckedPee(!isCheckedPee);
        }
    };

    const [selectedColor, setSelectedColor] = useState('#FF5733');
    const predefinedColors = ['#000000', '#DAE8F1', '#43DD0D', '#FAF809', '#FA1F09', '#925237'];

    const handleColorSelect = (color) => {
        setSelectedColor(color);
    };

    const ColorSelection = ({ colors, selectedColor, onSelect }) => {
        return (
            <View style={styles.colorContainer}>
                {colors.map((color, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => onSelect(color)}
                        style={[
                            styles.colorCircle,
                            { backgroundColor: color, borderColor: selectedColor === color ? '#91C9CE' : 'transparent' },
                        ]}
                    />
                ))}
            </View>
        );
    };


    return(
        <SafeAreaView>
            <View>
                <DiaperHeader screen={"Baby"} />
                <View>
                    <View className={"flex flex-row px-8 justify-between"}>
                        <View className={"w-2/5 border-b-2 border-primary m-2 mx-2"}>
                            <Pressable onPress={showDatePicker}>
                                <TextInput
                                    value={date.toString()}
                                    placeholder="Date of Changing"
                                    editable={false}
                                />
                            </Pressable>
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={handleDateConfirm}
                                onCancel={hideDatePicker}
                            />
                        </View>
                        <View className={"w-2/5 border-b-2 border-primary m-2 mx-4"}>
                            <Pressable onPress={showTimePicker}>
                                <TextInput
                                    value={time.toString()}
                                    placeholder="Time of Changing"
                                    editable={false}
                                />
                            </Pressable>
                            <DateTimePickerModal
                                isVisible={isTimePickerVisible}
                                mode="time"
                                onConfirm={handleTimeConfirm}
                                onCancel={hideTimePicker}
                            />
                        </View>
                    </View>
                    <TextInput
                        className={"border-primary border h-20 p-1 m-2 mx-10 rounded"}
                        placeholder="Add a note (Optional)"
                        value={note}
                        onChangeText={text => setNote(text)}
                    />
                    <Text className={"text-center py-2"}>What's in the Diaper</Text>
                    <View className={"flex flex-row m-5 mt-4"}>
                        <View className={"flex-1 mx-5"}>
                            <Pressable onPress={toggleCheckboxPee}>
                                {isCheckedPee ? (
                                    <View className={"border border-primary p-2 bg-primary"}>
                                        <Text className={"text-center"} style={{color:"white"}}>Pee</Text>
                                    </View>
                                ) : (
                                    <View className={"border border-primary p-2"}>
                                        <Text className={"text-center text-primary"}>Pee</Text>
                                    </View>
                                )}
                            </Pressable>
                        </View>
                        <View className={"flex-1 mx-5"}>
                            <Pressable onPress={toggleCheckboxPoo}>
                                {isCheckedPoo ? (
                                    <View className={"border border-primary p-2 bg-primary"}>
                                        <Text className={"text-center"} style={{color:"white"}}>Poo</Text>
                                    </View>
                                ) : (
                                    <View className={"border border-primary p-2"}>
                                        <Text className={"text-center text-primary"}>Poo</Text>
                                    </View>
                                )}
                            </Pressable>
                        </View>
                    </View>
                    {isCheckedPoo && (
                        <View className>
                            <Text className={"text-center"}>Style the poo (optional) :</Text>
                            <ColorSelection colors={predefinedColors} selectedColor={selectedColor} onSelect={handleColorSelect} />
                        </View>
                    )}
                    <FilledButton title={"Save"} icon={"save"}/>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
    },
    colorPreview: {
        width: 50,
        height: 50,
        marginTop: 10,
    },
    selectedColorText: {
        marginTop: 10,
        fontSize: 16,
    },
    colorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    colorCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 3,
        borderColor: '',
        marginHorizontal: 10,
    },
});