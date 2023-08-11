import {FlatList, ScrollView, Text, TouchableOpacity, View,Image} from "react-native";
import {FoodListSet} from "./foodListSet";
import images from "../../constants/images";
import React from "react";
import {ReactionsListSet} from "./reactionsListSet";
import {scale} from "nativewind/dist/tailwind/native/scale";

export  function ReactionsList() {
    return (
        <View  className={"p-2"} >
            <FlatList  data={ReactionsListSet}  keyExtractor={(item) => item.id} renderItem={({item})=> (

                    <TouchableOpacity    className={"m-1"} >
                        <Image  source={images[item.image]}
                                className={"w-20 h-20"}
                                style={{transform:[{scale:0.8}]}}/>
                        <Text className="text-center">
                            {item.name}
                        </Text>
                    </TouchableOpacity>


            )}
                      horizontal={true}
            />
        </View>
    )

}