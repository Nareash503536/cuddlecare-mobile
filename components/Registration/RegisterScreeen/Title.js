import { View, Text, Image} from "react-native";
import images from "../../../constants/images";

export function Title () {
    return (
        <View
        >
            <Image
                className={"w-64 h-20 mx-auto"}
                resizeMode="contain"
                source={images.appName}
            />        
        </View>
    );
}