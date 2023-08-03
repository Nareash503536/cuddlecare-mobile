import { View, Image, Text, TouchableOpacity, TextInput, Button } from "react-native";
import images from "../../../constants/images";
import { styles } from "./textInputStyle";
import { ButtonStyles } from "./ButtonStyle";
import { Formik } from 'formik';
import { Dropdown } from 'react-native-element-dropdown';
import { COLORS } from "../../../constants/theme";
import { useContext, useState, useCallback } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
import { handleNavigateContext } from "../../../screens/Registration/RegisterPageCaregiver";

export function CaregiverForm() {

    const { registrationInfo, setRegistrationInfo, setCurrentComponent } = useContext(handleNavigateContext);

    const [value, setValue] = useState("");

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
                        />

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
                    })
                }}
                disabled={CaregiverInfo.CaregiverName === "" ||
                    CaregiverInfo.CaregiverDOB === "" ||
                    CaregiverInfo.CaregiverGender === "" ||
                    CaregiverInfo.CaregiverContactNumber === "" ? true : false}
            >
                <Text className="text-white">
                    Next
                </Text>
            </TouchableOpacity>

        </>
    )
}