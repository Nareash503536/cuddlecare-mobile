import { View, Image, Text, TouchableOpacity, TextInput } from "react-native";
import images from "../../../constants/images";
import { styles } from "./textInputStyle";
import { ButtonStyles } from "./ButtonStyle";
import { Formik } from 'formik';
import { useContext, useState, useEffect } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { COLORS } from "../../../constants/theme";
import { handleNavigateContext } from "../../../screens/Registration/RegisterPageParent";

export function ParentForm() {

    const CONTACTNUMBER_REGEX = /^(?:\+94|0)?(?:\(\d{3}\)|\d{3})\d{7}$/;

    const { setRegistrationInfo, registrationInfo, setCurrentComponent } = useContext(handleNavigateContext);

    const [ParentInfo, setParentInfo] = useState({
        ParentName: "",
        ParentContactNumber: "",
        ParentDOB: ""
    })

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [validContactNumber, setValidContactNumber] = useState(false);

    useEffect(() => {
        const result = CONTACTNUMBER_REGEX.test(ParentInfo.ParentContactNumber);
        setValidContactNumber(result);
    }, [ParentInfo.ParentContactNumber]);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        let inputDate = date.toISOString().slice(0, 10);
        setParentInfo({ ...ParentInfo, ParentDOB: inputDate })
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
                <Text className={"text-[#477276] text-xl text-center font-bold"}>
                    Tell us about you
                </Text>
                <Formik
                    initialValues={{}}>
                    <View>

                        <TextInput
                            keyboardType='default'
                            style={styles.textInput}
                            placeholder="Name"
                            value={ParentInfo.ParentName}
                            onChangeText={(ParentName) => setParentInfo({ ...ParentInfo, ParentName: ParentName })}
                        />
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
                                {ParentInfo.ParentDOB ? ParentInfo.ParentDOB : "Date of Birth"}
                            </Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                            maximumDate={new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000)}
                        />
                        <TextInput
                            keyboardType="numeric"
                            style={styles.textInput}
                            placeholder="Phone Number"
                            value={ParentInfo.ParentContactNumber}
                            onChangeText={(ParentPhoneNumber) => setParentInfo({ ...ParentInfo, ParentContactNumber: ParentPhoneNumber })}
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
                    setCurrentComponent("fourth");
                    setRegistrationInfo({
                        ...registrationInfo,
                        ParentName: ParentInfo.ParentName,
                        ParentPhoneNumber: ParentInfo.ParentContactNumber,
                        ParentDOB: ParentInfo.ParentDOB
                    })
                }}
                disabled={ParentInfo.ParentName === "" ||
                    ParentInfo.ParentContactNumber === "" ||
                    ParentInfo.ParentDOB === "" ? true : false
                }
            >
                <Text className="text-white">
                    Next
                </Text>
            </TouchableOpacity>
        </>
    )
} 