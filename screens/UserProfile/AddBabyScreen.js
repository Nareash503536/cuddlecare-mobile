import { Alert, ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import Input from '../../components/UserProfile/AddBabyScreen/Input';
import React, { useEffect, useState, useContext } from "react";
import Button from "../../components/UI/Button";
import { GlobalStyles } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";
import { getFormattedDate, getFormattedTime } from "../../util/date";
import { themeColors } from '../../theme';
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/theme';
import DateTimePicker from "../../components/Form Component/DateTimePicker";
import { Dropdown } from 'react-native-element-dropdown';
import { AuthContext } from '../../Context/AuthContext';
import UpdateProfileAPI from '../../Api/UpdateProfileAPI';
import { ALERT_TYPE, Dialog, AlertNotificationRoot } from 'react-native-alert-notification';
import Toast from 'react-native-toast-message';


export default function AddBabyScreen() {
    let navigation = useNavigation();

    const { user, updateKeys, setBabySet, babySet } = useContext(AuthContext);

    const genderLabels = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' }
    ]

    const [inputs, setInputs] = useState({
        name: {
            value: '',
            isValid: true,
        },
        gender: {
            value: '',
            isValid: true,
        },
        date: {
            value: '',
            isValid: true,
        }
    });

    // useEffect(() => {
    //     console.log(inputs);
    // }, [inputs])

    const submitHandler = async () => {
        if (inputs.date.value == '') {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Error',
                text2: 'Please select a date',
                visibilityTime: 4000,
            });
            return;
        } else if (inputs.gender.value == '') {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Error',
                text2: 'Please select the gender'
            });
            return;
        } else if (inputs.name.value == '') {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Error',
                text2: 'Please enter the name'
            });
            return;
        }

        await updateKeys();
        let response = await UpdateProfileAPI().addBaby(user.email, inputs);
        if (response) {
            Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Success',
                textBody: 'Baby added Successfully',
                button: 'Continue',
                onPressButton: () => navigation.navigate("Baby")
            })
            if (!babySet)
                setBabySet([response]);
            else
                setBabySet([...babySet, response]);
        } else {
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: 'Something went wrong',
                button: 'Continue',
            })
        }
    }

    function inputChangedHandler(inputIdentifier, enteredValue) {
        setInputs((curinputs) => {
            return {
                ...curinputs,
                [inputIdentifier]: { value: enteredValue, isValid: true },
            };
        });
    }

    return (
            <AlertNotificationRoot>

                <SafeAreaView className={"h-screen justify-center"}>
                    <View className={"absolute top-0 m-5 my-10 w-10 h-10 rounded-full justify-center items-center"} style={{ backgroundColor: COLORS.secondary }}>
                        <ArrowLeftIcon
                            size="22"
                            color={"white"}
                            onPress={() => navigation.goBack()}
                        />
                    </View>
                     <Input
                         label="Baby Name"
                         invalid={!inputs.name.isValid}
                         textInputConfig={{
                             keyboardType: 'default',
                             placeholder: 'Baby Name',
                             onChangeText: inputChangedHandler.bind(this, 'name'),
                             value: inputs.name.value,

                         }}
                     />
                    <View className={"mx-8"}>
                        <Text style={[styles.label]} className={"text-xs mb-2"}>Gender</Text>
                        <Dropdown
                            className={"p-2 rounded-xl text-lg"}
                            style={styles.input}
                            placeholderStyle={{ color: "#000", opacity: 0.4, fontSize: 15 }}
                            data={genderLabels}
                            valueField={"value"}
                            placeholder={"Gender"}
                            labelField={"label"}
                            value={(inputs.gender.value)}
                            maxHeight={200}
                            onChange={item => setInputs(
                                {
                                    ...inputs,
                                    gender: { value: item.value, isValid: true }
                                }
                            )}
                        />

                    </View>
                    <DateTimePicker
                        mode='date'
                        lable={"Birthday"}
                        inputHandler={inputChangedHandler}
                        maxdate={new Date()}
                    />

                    <View style={styles.buttons} className={"mt-10"}>
                        <Button style={styles.button} mode="flat" onPress={() => navigation.navigate("Baby")}>
                            Cancel
                        </Button>
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: COLORS.secondary, padding: 10, borderRadius: 5 }]}
                            onPress={() => submitHandler()}
                        >
                            <Text className={"text-center"} style={{color:"white"}}>Add</Text>
                        </TouchableOpacity>
                    </View>

                </SafeAreaView>
            </AlertNotificationRoot>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
    label: {
        color: themeColors.colorDark,
    },
    input: {
        backgroundColor: themeColors.bgInput(0.1),
        color: GlobalStyles.colors.primary700,
    },
});
