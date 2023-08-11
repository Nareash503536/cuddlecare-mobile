import {FlatList, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {FoodListSet} from "./foodListSet";
import images from "../../constants/images";
import React from "react";
import {Image} from "react-native";
export function FoodList() {
    return (
        <View>
            <FlatList data={FoodListSet}  keyExtractor={(item) => item.id} showsHorizontalScrollIndicator={false} renderItem={({item})=> (
                <ScrollView
                    className={"p-1 m-1 w-15 h-36"}
                    style={{
                        borderRadius: 10,
                    }}
                >
                    <TouchableOpacity>
                        <Image  source={images[item.image]}
                                className={"w-20 h-20 mx-auto"}
                                style={{transform:[{scale:0.6}]}}
                        />
                        <Text className="text-center">
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                </ScrollView>

            )}
                      horizontal={true}
            />
        </View>
    )
}