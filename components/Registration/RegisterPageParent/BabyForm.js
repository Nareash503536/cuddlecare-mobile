import { View, Image, Text, TouchableOpacity, TextInput, KeyboardAvoidingView } from "react-native";
import images from "../../../constants/images";
import { styles } from "./textInputStyle";
import { ButtonStyles } from "./ButtonStyle";
import { Formik } from 'formik';
import { Dropdown } from 'react-native-element-dropdown';
import { COLORS } from "../../../constants/theme";
import { useContext, useState, useCallback } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
import { handleNavigateContext } from "../../../screens/Registration/RegisterPageParent";

export function BabyForm() {

    const { registrationInfo, setRegistrationInfo, setCurrentComponent } = useContext(handleNavigateContext);

    const [value, setValue] = useState("");

    const [BabyInfo, setBabyInfo] = useState({
        BabyName: "",
        BabyGender: "",
        BabyDOB: "",
        BabyRelationship: "",
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
        setBabyInfo({ ...BabyInfo, BabyDOB: inputDate })
        hideDatePicker();
    };

    return (
        <>
            {/*<KeyboardAvoidingView style={{ flex: 1 }} behavior={"position"}>*/}
                <View>
                    <Text className={"text-center text-3xl font-bold"}>
                        Registration
                    </Text>
                </View>
                <View>
                    <Text className={"text-[#477276] text-xl text-center font-bold my-10"}>
                        Tell us about your baby
                    </Text>
                    <Formik
                        initialValues={{}}>
                        <View>
                            <TextInput
                                keyboardType='default'
                                style={styles.textInput}
                                placeholder="Name"
                                value={BabyInfo.BabyName}
                                onChangeText={(BabyName) => setBabyInfo({ ...BabyInfo, BabyName: BabyName })}
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
                                    {BabyInfo.BabyDOB ? BabyInfo.BabyDOB : "Date of Birth"}
                                </Text>
                            </TouchableOpacity>
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                                maximumDate={new Date(Date.now() - 86400000)}
                            />

                            <Dropdown
                                style={styles.textInput}
                                placeholderStyle={{ color: "#000", opacity: 0.4, fontSize: 15 }}
                                data={genderLabels}
                                valueField={"value"}
                                placeholder={"Gender"}
                                labelField={"label"}
                                value={BabyInfo.BabyGender}
                                maxHeight={200}
                                onChangeText={item => { setValue(item.value); setBabyInfo({ ...BabyInfo, BabyGender: item.value }) }}
                                onChange={item => setBabyInfo({ ...BabyInfo, BabyGender: item.value })}
                            />
                            <Dropdown
                                style={styles.textInput}
                                placeholderStyle={{ color: "#000", opacity: 0.4, fontSize: 15 }}
                                data={relationshipLabels}
                                valueField={"value"}
                                placeholder={"Relationship"}
                                labelField={"label"}
                                value={(BabyInfo.BabyRelationship)}
                                maxHeight={200}
                                onChangeText={item => { setValue(item.value); }}
                                onChange={item => setBabyInfo({ ...BabyInfo, BabyRelationship: item.value })}
                            // onBlur={() => setRegistrationInfo({...registrationInfo, BabyRelationship: BabyInfo.BabyRelationship})}
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
                            BabyName: BabyInfo.BabyName,
                            BabyGender: BabyInfo.BabyGender,
                            BabyRelationship: BabyInfo.BabyRelationship,
                            BabyDOB: BabyInfo.BabyDOB
                        })
                    }}
                    disabled={BabyInfo.BabyName === "" ||
                        BabyInfo.BabyGender === "" ||
                        BabyInfo.BabyRelationship === "" ||
                        BabyInfo.BabyDOB === ""}
                >
                    <Text className="text-white">
                        Next
                    </Text>
                </TouchableOpacity>
            {/*</KeyboardAvoidingView>*/}
        </>
    )
}