import React from "react";
import {StyleSheet, Image, Text, View, TouchableOpacity} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import Button from "../UI/Button";
import {themeColors} from "../../theme";
import {PlayIcon,PencilSquareIcon} from "react-native-heroicons/solid";

export function BreastFeeding() {
    return (
        <SafeAreaView  className={"flex-1 align-middle justify-between relative p-5"}>
            <Image
                style={styles.babyimg}
                source={require('../../assets/images/babyMilkFeeding.png')}
            />
            <View >
                <Text className={"font-extrabold text-center text-5xl"} style={{color:'gray'}}>00:00:00</Text>
            </View>
            <View className={"flex-row top-3 justify-around   relative"}>
                <TouchableOpacity style={styles.button} >
                    <PlayIcon size="35" color="white"  />
               <Text style={styles.buttonText}>Left</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} >
                    <PlayIcon  size="35" color="white"  />
                    <Text  style={styles.buttonText}>Right</Text>
                </TouchableOpacity>
            </View>

            <View className={"flex-row align-middle justify-center mt-20 "}>
                <PencilSquareIcon style={{marginRight:10}} size="30" color='gray' />
                <Text  style={styles.addmanual}>Add manually </Text>
            </View>
            <TouchableOpacity style={styles.savebtn} >
                <Text  style={styles.buttonText}>Save</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    babyimg: {
        width: 200,
        height: 300,
        alignSelf: 'center',
        top: -40,

    },
    buttonText: {
        color: 'white',
        fontSize: 20,

    },
    addmanual: {
        color: 'gray',
        fontSize: 16,
        top:3,
    },
    button:{
        width: 150,
        height: 50,
        borderRadius: 4,
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: themeColors.colorDark,

    },
    savebtn:{

        height: 50,
        borderRadius: 4,
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: themeColors.colorDark,

    }

})
