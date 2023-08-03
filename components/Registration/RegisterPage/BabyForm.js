import { View, Image, Text, TouchableOpacity, TextInput, Button } from "react-native";
import images from "../../../constants/images";
import { styles } from "./textInputStyle";
import { Formik } from 'formik';
import { Dropdown } from 'react-native-element-dropdown';
import { useContext, useState, useCallback} from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import {handleNavigateContext} from "../../../screens/Registration/RegisterPage";

export function BabyForm() {

    const { registrationInfo, setRegistrationInfo, BabyName, setBabyName } = useContext(handleNavigateContext);
    // const [registrationInfo, setRegistrationInfo] = useState({
    //     BabyName: "",
    //     BabyGender: null,
    //     BabyDOB: null,
    //     BabyRelationship: null,
    //     ParentName: null,
    //     ParentPhoneNumber: null,
    //     ParentDOB: null,
    //     ParentEmail: null,
    //     ParentPassword: null,
    //     ParentConfirmPassword: null
    // })

    const genderLabels = [
        {label: 'Male', value: 'male'},
        {label: 'Female', value: 'female'}
    ]

    const relationshipLabels = [
        { label: 'Father', value: 'father' },
        { label: 'Mother', value: 'mother' }
    ]

    const [value, setValue] = useState('');

    const onChangeBabyName = (BabyName) => {
        setRegistrationInfo({ ...registrationInfo, BabyName: BabyName })
    }

    return (
        <>
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
                            value={BabyName}
                            onChangeText={onChangeBabyName}
                            // onChangeText={(BabyName) => setBabyName(BabyName)}
                        />
                        <Text>
                            {registrationInfo.BabyName}
                        </Text>
                        <Dropdown
                            style={styles.textInput}
                            placeholderStyle={{ color: "#000", opacity: 0.4, fontSize: 15}}
                            data={genderLabels}
                            valueField={"value"}
                            placeholder={"Gender"}
                            labelField={"label"}
                            value={(registrationInfo.BabyGender)}
                            maxHeight={200}
                            onChangeText={item => {setValue(item.value); setRegistrationInfo({ ...registrationInfo, BabyGender: item.value })}}
                        />

                        

                        <Dropdown
                            style={styles.textInput}
                            placeholderStyle={{ color: "#000", opacity: 0.4, fontSize: 15 }}
                            data={relationshipLabels}
                            valueField={"value"}
                            placeholder={"Relationship"}
                            labelField={"label"}
                            value={(registrationInfo.BabyRelationship)}
                            maxHeight={200}
                            onChangeText={item => {setValue(item.value) ; setRegistrationInfo({ ...registrationInfo, BabyRelationship: item.value })}}
                        />
                    </View>
                </Formik>
            </View>
        </>
    )
}