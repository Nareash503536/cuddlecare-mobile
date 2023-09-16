import React, {useContext} from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import images from '../../../constants/images';
import { useNavigation } from '@react-navigation/core';
import { Carousel } from 'react-native-snap-carousel';
import { Button } from 'native-base';
import { COLORS } from '../../../constants/theme';
import { AuthContext } from '../../../Context/AuthContext';

export default function BabyCaregiverOptionSet() {

    const { babySet } = useContext(AuthContext);

    let navigation = useNavigation();
    const { width, height } = Dimensions.get('window');

    const BabyCard = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('ManageBaby', { babyID: item.babyID })}
                className={"mt-5 rounded-xl w-32  flex-1 justify-between"}
            >
                <View className="flex-row justify-center">
                    <Image
                        source={item.babyPicture ? { uri: item.babyPicture } : images.AddImage}
                        className=" h-32 w-full rounded-t-3xl"
                    />
                </View>

                <View className={"px-5 rounded-b-2xl flex-1 justify-between"}
                    style={{
                        backgroundColor: "#fff"
                    }}
                >
                    <View className=" mt-3">
                        <Text className="text-sm text-gray-700 text-center z-10">
                            {item.babyName}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View className={"justify-around"}>
            <View className="flex-row justify-between">
                <Text className={"m-5 mb-0 text-2xl font-semibold"}>
                    Baby Info
                </Text>
                <Button className={"m-5 mb-0"} style={{backgroundColor:COLORS.secondary}}>
                    <Text className={"text-base text-center font-extrabold"} style={{color:"#fff"}}>
                        Add baby +
                    </Text>
                </Button>
            </View>
            <View>
                <Text className={"mt-5 text-base text-center font-extrabold"}>
                    Select baby
                </Text>
            </View>
            <View className={"flex justify-center items-center mb-5"}>
                <Carousel
                    data={babySet}
                    renderItem={({ item }) => <BabyCard item={item} />}
                    firstItem={1}
                    loop={true}
                    inactiveSlideScale={0.75}
                    inactiveSlideOpacity={0.25}
                    sliderWidth={400}
                    itemWidth={120}
                    style={{
                        borderColor: "#fff",
                        borderWidth: 1,
                        borderRadius: 20,
                        backgroundColor: "#000",
                    }}
                    slideStyle={{ 
                        display: 'flex',
                        alignItems: 'center',
                    }} 
                    />
            </View>
        </View>
    )
}