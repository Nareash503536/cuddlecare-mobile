import {Text, View } from "react-native";
import UserInfo from "../../components/UserProfile/UserInfo";
import { SafeAreaView } from "react-native-safe-area-context";
import {COLORS} from "../../constants/theme"; 
import InfoCard from "../../components/UserProfile/InfoCard";
import EditProfileCard from "../../components/UserProfile/EditProfileCard";

export default function Profile(){
    return(
        <SafeAreaView
        className={"h-screen"}
            style={{
                backgroundColor: COLORS.primary,
                width: "100%",
                borderColor: '#000',
            }}
        >
            <View>
                <Text
                    className={"text-4xl font-bold text-left"}
                    style={{
                        fontSize: 30,
                        fontWeight: "bold",
                        color: "#fff",
                        marginHorizontal: 20,
                    }}
                >
                    Profile
                </Text>
            </View>
            <UserInfo/>
            <InfoCard/>
            <EditProfileCard/>
        </SafeAreaView>
    )
}