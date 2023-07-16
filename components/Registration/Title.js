import { View, Text, Image} from "react-native";
import images from "../../constants/images";

export function Title () {
    return (
        <View 
            style={
                {
                    borderColor: "black",
                    borderWidth: 1,
                }
            }
        >
            <Image
                className={"w-64 mx-auto"}
                style={
                    {
                        borderColor: "black",
                        borderWidth: 1,
                    }
                }
                resizeMode="contain"
                source={images.appName}
            />        
            </View>
    );
}