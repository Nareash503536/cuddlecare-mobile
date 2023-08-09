import { View, Image, Text, TouchableOpacity } from "react-native";
import { useContext } from "react";
import images from "../../../constants/images";
import { styles } from "./ButtonStyle";
import { handleNavigateContext } from "../../../screens/Registration/RegisterPage";
import axios from "../../../Api/axios";

export function RegisterButton() {

    const { handleNavigate, registrationInfo } = useContext(handleNavigateContext);

    const sendRegistrationInfo = async() => {
        handleNavigate(); 
        console.log(registrationInfo);
        try{
            let response = await axios.post("/register", registrationInfo);
            console.log(response);
        
        } catch(error){
            console.log(error);
        }
    }

    return (
        <View
        >
            <TouchableOpacity
                className={"flex-row mt-8"}
                style={styles.Button}
                name="next"
                onPress={sendRegistrationInfo}
            >
                <Text className="text-white">
                    Submit
                </Text>
            </TouchableOpacity>

        </View>
    );
}








