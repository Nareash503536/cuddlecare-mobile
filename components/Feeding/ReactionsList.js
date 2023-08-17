import {FlatList, ScrollView, Text, TouchableOpacity, View, Image, StyleSheet} from "react-native";
import {FoodListSet} from "./Lists/foodListSet";
import images from "../../constants/images";
import React, {useState} from "react";
import {ReactionsListSet} from "./Lists/reactionsListSet";
import {scale} from "nativewind/dist/tailwind/native/scale";



export  function ReactionsList() {
    const [reactionsArray, setReactionsArray] =useState([]);
    const getReactions = (id) => {
        console.log(reactionsArray);
        if (reactionsArray.includes(id)) {
            const updatedArray = reactionsArray.filter(reaction=> reaction !== id);
            setReactionsArray(updatedArray);
        }
        else{
            setReactionsArray([...reactionsArray, id]);
        }
    }
    return (
        <View  className={"p-2"} >
            <FlatList  data={ReactionsListSet}  keyExtractor={(item) => item.id} renderItem={({item})=> (

                    <TouchableOpacity    className={"m-1"} onPress={()=>getReactions(item.id)} >
                        <Image  source={item.image}
                                className={"w-20 h-20"}
                                style={{transform:[{scale:0.8}]}}/>
                        <Text className="text-center">
                            {item.name}
                        </Text>
                        {
                            reactionsArray.includes(item.id) ?
                                <View style={styles.overlay} className={"rounded-full w-20 h-20"}></View>    : null
                        }
                    </TouchableOpacity>


            )}

                      horizontal={true}
            />
        </View>
    )

}
const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(128, 128, 128, 0.5)',
        borderRadius: 10,
        transform:[{scale:0.8}],
    },
})