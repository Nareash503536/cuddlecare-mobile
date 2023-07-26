import { View, Image, Text} from "react-native";
import images from "../../../constants/images";
import COLORS from "../../../constants/theme";

export function Intro() {
    return (
        <View
        >
            <Image
                source={images.appName}
                resizeMode="contain"
                className={"w-64 h-28 mx-auto"}
            />
        </View>
    );
}