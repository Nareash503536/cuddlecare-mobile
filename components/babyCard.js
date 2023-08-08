import { View, Text, Image, TouchableOpacity, Dimensions, Platform } from 'react-native'
import React from 'react'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'
const {width, height} = Dimensions.get('window');
const ios = Platform.OS === 'ios';
export default function BabyCard({item}) {
    const navigation = useNavigation();
    return (

        <TouchableOpacity onPress={() => navigation.navigate('AppOverview')}
            style={{
                borderRadius: 40,
                height: ios? height*0.4 : height*0.33,
                width: width*0.5,
            }}
            className={"mt-5"}
        >
            <View className="flex-row justify-center">
                <Image
                    source={item.image}
                    className=" h-40 w-full rounded-t-3xl"
                />
            </View>

            <View className={`px-5 rounded-b-2xl flex-1 justify-between ${ios? 'mt-5': ''}`}
                  style={{
                      backgroundColor: themeColors.bgWhite(1)}}
            >
                <View className=" mt-3">
                    <Text className="text-lg text-gray-700 font-semibold z-10">
                        {item.name}
                    </Text>
                    <View className="space-x-1 z-10 mb-1 item-center">
                        <Text className="text-base text-gray-700 opacity-60">
                            Age
                        </Text>
                        <Text className="text-base text-gray-700 text-sm"> {item.year} year  {item.month} month</Text>
                    </View>

                </View>

            </View>

            </TouchableOpacity>

    )
}