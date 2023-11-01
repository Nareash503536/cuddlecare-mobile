import { TouchableOpacity } from "react-native";
import { View, Text, Image } from "react-native";
import {useEffect, useState} from "react";
import Carousel, {Pagination} from "react-native-snap-carousel";
import images from "../../../constants/images";
import {COLORS} from "../../../constants/theme";

export function ImageSlider () {
    
    const [activeIndex, setActiveIndex] = useState(1);

    Items = [{
        id: 1,
        image: images.logo},
        {id: 2,     
        image: images.addCaregiver,
        text: "Share with partners, family members and your caregivers.",
        heading: "Add Caregivers"
        },
        {id: 3,
        image: images.trackEverything,
        text: "Record your child's daily care, milestones and precious memories.",
        heading: "Track Everything"
        },
        {id: 4,
        image: images.Community,
        text: "Connect with other parents in the community.",
        heading: "Community"
        }]

    const changeImage = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % Items.length);
    };

    useEffect(() => {
        const interval = setInterval(changeImage, 3000);
    }, []);

    return (
        <View>
             <Carousel 
                layout="default"
                data={Items}
                renderItem={({item}) => {
                    return (
                        <View className="flex items-center m-auto">
                            <Image
                                source={item.image}
                                resizeMode="contain"
                                className={"w-48 h-48 rounded-3xl mx-auto"}
                            />
                            {item.heading ? (
                                <Text className={"font-bold text-center"}>{item.heading}</Text>
                            ) : null}
                            {item.text ? (
                                <Text className={"text-center"}>{item.text}</Text>
                            ) : null}
                        </View>
                    )
                }}
                sliderWidth = {320}
                itemWidth = {300}
                autoplay = {true}
                loop = {true}
                onSnapToItem = {index => setActiveIndex(index)}
             />
                <Pagination
                    dotsLength={Items.length}
                    activeDotIndex={activeIndex}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        marginHorizontal: 8,
                        backgroundColor: COLORS.pageDotActive
                    }}
                    inactiveDotStyle={{
                        // Define styles for inactive dots here
                        backgroundColor: COLORS.pageDotInactive
                    }}
                />
        </View>
    );
    }