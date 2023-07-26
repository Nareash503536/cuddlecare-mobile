import {View, Image} from "react-native";
import images from "../../../constants/images";

export function AppIntro() { 
    return (
        <View 
        >
            <Image
                source={images.appName}
                resizeMode="contain"
                className={"w-64 h-28 mx-auto"}
                />
            <Image
                source={images.logo}
                
                resizeMode="contain"
                className={"w-72 h-72 mx-auto"}
                />
        </View>
    );  
}