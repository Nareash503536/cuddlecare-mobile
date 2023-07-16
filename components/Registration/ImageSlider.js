import { TouchableOpacity } from "react-native";
import { View, Text, Image } from "react-native";
import Carousel from "react-native-snap-carousel";
import images from "../../constants/images";

export function ImageSlider () {  

    Items = [{
        id: 1,
        image: images.logo,
        height: "w-48"},
        {id: 2,     
        image: images.addCaregiver,
        height: "w-48"},
        {id: 3,
        image: images.trackEverything,
        height: "w-48"},
        {id: 4,
        image: images.Community,
        height: "w-48"
        }]

    return (
        <View>
             <Carousel 
                data={Items}
                renderItem={({item}) => {
                    return (
                        <Image 
                            source={item.image}
                            resizeMode="contain"
                            className={"w-48 h-48 mx-auto rounded-3xl"}
                            // style={
                            //     {
                            //         borderColor: "black",
                            //         borderWidth: 1
                            //     }
                            // }
                        />
                    )
                }}
                sliderWidth = {370}
                itemWidth = {300}
                // onSnapToItem={(index) => setActiveIndex(index)}
             />
        </View>
    );
    }