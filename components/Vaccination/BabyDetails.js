import React, {useContext} from 'react';
import { View, Text, Image } from 'react-native';
import { AuthContext } from '../../Context/AuthContext';
import images from '../../constants/images';
import { COLORS } from '../../constants/theme';

export default function BabyDetails(){

    const { baby } = useContext(AuthContext);

    return (
        <View className={"m-5 flex-row items-center"}>
            <Image source={baby.babyPicture ? { uri: baby.babyPicture } : images.AddImage} className={"w-28 h-28 rounded-3xl"} />
            <View>
                <Text className={"font-bold text-2xl items-center mx-3"} style={{ color: COLORS.tertiary }}>{baby.babyName}</Text>
                <Text className={" text-sm items-center mx-3"} style={{color:"grey"}}>{
                    Math.floor((new Date() - new Date(baby.dob)) / 1000 / 60 / 60 / 24 / 30)
                } months old
                </Text>
            </View>
        </View>
    )
}