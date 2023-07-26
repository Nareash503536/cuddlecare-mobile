import { View, Image, Text, TouchableOpacity, TextInput } from "react-native";
import images from "../../../constants/images";
import { styles } from "./textInputStyle";
import { Formik } from 'formik';
import { useEffect } from "react";
import { handleNavigateContext } from "../../../screens/Registration/RegisterPage";
import { useContext } from "react";

export function ProfileForm() {

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
                    Set your pofile
                </Text>
                <Formik
                    initialValues={{}}>
                    <View>

                        <TextInput
                            keyboardType='email-address'
                            style={styles.textInput}
                            placeholder="Email"
                            value={(registrationInfo.ParentEmail)}
                            onChangeText={(ParentEmail) => setRegistrationInfo({ ...registrationInfo, ParentEmail: ParentEmail })}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Password"
                            value={(registrationInfo.ParentPassword)}
                            onChangeText={(ParentPassword) => setRegistrationInfo({ ...registrationInfo, ParentPassword: ParentPassword })}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Confirm Password"
                            value={(registrationInfo.ParentConfirmPassword)}
                            onChangeText={(ParentConfirmPassword) => setRegistrationInfo({ ...registrationInfo, ParentConfirmPassword: ParentConfirmPassword })}
                        />

                    </View>
                </Formik>
            </View>
        </>
    )
}