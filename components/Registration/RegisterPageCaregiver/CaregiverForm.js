import { View, Image, Text, TouchableOpacity, TextInput, Button } from "react-native";
import images from "../../../constants/images";
import { styles } from "./textInputStyle";
import { ButtonStyles } from "./ButtonStyle";
import { Formik } from 'formik';
import { Dropdown } from 'react-native-element-dropdown';
import { COLORS } from "../../../constants/theme";
import { useContext, useState, useEffect } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Toast from 'react-native-toast-message';
// import DateTimePickerModal from "react-native-modal-datetime-picker";
import { handleNavigateContext } from "../../../screens/Registration/RegisterPageCaregiver";

export function CaregiverForm() {

    const { registrationInfo, setRegistrationInfo, setCurrentComponent } = useContext(handleNavigateContext);

    const CONTACTNUMBER_REGEX = /^(?:\+94|0)?(?:\(\d{3}\)|\d{3})\d{7}$/;


    const [value, setValue] = useState("");
    const [validContactNumber, setValidContactNumber] = useState(false);


    const [CaregiverInfo, setCaregiverInfo] = useState({
        CaregiverName: "",
        CaregiverDOB: "",
        CaregiverGender: "",
        CaregiverContactNumber: ""
    })

    const genderLabels = [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' }
    ]

    const relationshipLabels = [
        { label: 'Father', value: 'father' },
        { label: 'Mother', value: 'mother' }
    ]

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        let inputDate = date.toISOString().slice(0, 10);
        setCaregiverInfo({ ...CaregiverInfo, CaregiverDOB: inputDate })
        hideDatePicker();
    };

    useEffect(() => {
        const result = CONTACTNUMBER_REGEX.test(CaregiverInfo.CaregiverContactNumber);
        setValidContactNumber(result);
    }, [CaregiverInfo.CaregiverContactNumber]);

    return (
        <>
            <View>
                <Text className={"text-center text-3xl font-bold"}>
                    Registration
                </Text>
            </View>
            <View>
                <Text className={"text-[#477276] text-xl text-center font-bold my-10"}>
                    Tell us about you
                </Text>
                <Formik
                    initialValues={{}}>
                    <View>
                        <TextInput
                            keyboardType='default'
                            style={styles.textInput}
                            placeholder="Name"
                            value={CaregiverInfo.CaregiverName}
                            onChangeText={(CaregiverName) => setCaregiverInfo({ ...CaregiverInfo, CaregiverName: CaregiverName })}
                        />

                        {/* <Button title="Show Date Picker" onPress={showDatePicker} /> */}
                        <TouchableOpacity
                            style={{
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                borderRadius: 50,
                                borderColor: COLORS.tertiary,
                                borderWidth: 2,
                                backgroundColor: "white",
                                height: 50,
                                margin: 5,
                                padding: 10,
                                paddingLeft: 20,
                            }}
                            onPress={showDatePicker}
                        >
                            <Text className="opacity-50">
                                {CaregiverInfo.CaregiverDOB ? CaregiverInfo.CaregiverDOB : "Date of Birth"}
                            </Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                            maximumDate={new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000)}
                        />

                        <Dropdown
                            style={styles.textInput}
                            placeholderStyle={{ color: "#000", opacity: 0.4, fontSize: 15 }}
                            data={genderLabels}
                            valueField={"value"}
                            placeholder={"Gender"}
                            labelField={"label"}
                            value={CaregiverInfo.CaregiverGender}
                            maxHeight={200}
                            onChangeText={item => { setValue(item.value); setCaregiverInfo({ ...CaregiverInfo, CaregiverGender: item.value }) }}
                            onChange={item => setCaregiverInfo({ ...CaregiverInfo, CaregiverGender: item.value })}
                        />
                        <TextInput
                            keyboardType="numeric"
                            style={styles.textInput}
                            placeholder="Phone Number"
                            value={CaregiverInfo.CaregiverContactNumber}
                            onChangeText={(CaregiverContactNumber) => setCaregiverInfo({ ...CaregiverInfo, CaregiverContactNumber: CaregiverContactNumber })}
                            onBlur={() => !validContactNumber ? Toast.show({
                                type: 'error',
                                text1: 'Error',
                                text2: 'Please enter a valid phone number'
                            }) : null}
                        />
                        <Text className={"text-center font-extrabold text-red-600"}>
                            {!validContactNumber ? 
                        "Please enter a valid phone number" : null    
                        }</Text>
                    </View>

                </Formik>

            </View>
            <TouchableOpacity
                className={"flex-row mt-8"}
                style={ButtonStyles.Button}
                name="next"
                onPress={() => {
                    setCurrentComponent("third"), setRegistrationInfo({
                        ...registrationInfo,
                        CaregiverName: CaregiverInfo.CaregiverName,
                        CaregiverGender: CaregiverInfo.CaregiverGender,
                        CaregiverDOB: CaregiverInfo.CaregiverDOB,
                        CaregiverPhoneNumber: CaregiverInfo.CaregiverContactNumber
                    });
                }}
                disabled={CaregiverInfo.CaregiverName === "" ||
                    CaregiverInfo.CaregiverDOB === "" ||
                    CaregiverInfo.CaregiverGender === "" ||
                    CaregiverInfo.CaregiverContactNumber === "" ||
                    validContactNumber === false
                    ? true : false}
            >
                <Text className="text-white">
                    Next
                </Text>
            </TouchableOpacity>

        </>
    )
}