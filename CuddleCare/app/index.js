import { COLORS, icons, images, SIZES } from "../constants";
// import LinearGradient from 'react-native-linear-gradient'
import { LinearGradient } from 'expo-linear-gradient';
import {View, Image, Text, ScrollView, SafeAreaView} from "react-native";

const SlashScreen = () => {
    return (
        <SafeAreaView className={"flex-1"}>
            <LinearGradient className={"flex-1"} colors={['white', COLORS.primary]}>
                <View className={"flex-1 justify-center bg-gradient from-[#FFFFFF] to-[#000000]"}>
                    <Image
                        source={images.appName}
                        resizeMode="contain"
                        className={"mx-auto"}/>
                    <Image
                        source={images.logo}
                        resizeMode="contain"
                        className={"w-80 h-80 mx-auto"}/>
                </View>
            </LinearGradient>
        </SafeAreaView>
  );
}

export default SlashScreen;