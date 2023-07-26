import { View, Image, Text, TouchableOpacity, TextInput } from "react-native";
import images from "../../../constants/images";
import { styles } from "./textInputStyle";
import { Formik } from 'formik';
import { useContext, useState } from "react";
import { handleNavigateContext } from "../../../screens/Registration/RegisterPage";

export function ParentForm() {

    const { setRegistrationInfo, registrationInfo } = useContext(handleNavigateContext);

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
                            value={(registrationInfo.ParentName)}
                            onChangeText={(ParentName) => setRegistrationInfo({ ...registrationInfo, ParentName: ParentName })}
                        />
                        <TextInput
                            keyboardType="numeric"
                            style={styles.textInput}
                            placeholder="Phone Number"
                            value={(registrationInfo.ParentPhoneNumber)}
                            onChangeText={(ParentPhoneNumber) => setRegistrationInfo({ ...registrationInfo, ParentPhoneNumber: ParentPhoneNumber })}
                        />

                    </View>
                </Formik>
            </View>
        </>
    )
}