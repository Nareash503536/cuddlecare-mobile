import {Dimensions, Platform, TouchableOpacity, Image, Text, View} from "react-native";
import {themeColors} from "../theme";
import {mainFeatures} from "../constants";
import React from "react";
const ios = Platform.OS==='android';
const {width, height} = Dimensions.get('window');

export function Features({item}) {
    return (
        <TouchableOpacity
            // onPress={() => navigation.navigate('Baby')}
          style={{
              borderRadius: 40,
              width: width*0.5,
              backgroundColor: themeColors.btnColorop(0.3),
          }}
          className={"mt-5 flex items-center"}
        >
            <View class={"mt-10"}>
                <Image className={"-mt-3"} source={item.image}
                style={{width:130,height:130}}
                />
            </View>
            <Text className={" my-2 text-lg text-gray-500 uppercase"}
                  style={{color:themeColors.colorDark}}
            >{item.name}</Text>
        </TouchableOpacity>
    )
}
