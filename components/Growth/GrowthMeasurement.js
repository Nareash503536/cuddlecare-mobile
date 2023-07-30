import React from 'react'
import {TouchableOpacity, View,Text,StyleSheet} from "react-native";
import {themeColors} from "../../theme";
export default function GrowthMeasurement({ weight, height, headCircumference, description,date}) {
    console.log(date)
    return (
        <TouchableOpacity className={"pt-3"}>
            <View className={"flex-row rounded-xl  mx-2 space-x-3 border-b-2 border-gray-300 mt-4 pb-2 pr-4"}
                  style={styles.rowborder}
            >
                <Text className={"w-2/5 text-center"} style={{color:themeColors.colorExtraDark}}>
                    {date}
                </Text>
                <Text className={"w-1/5 text-center"} style={{color:themeColors.colorExtraDark}} >
                    {weight}
                </Text>
                <Text className={"w-1/5 text-center"} style={{color:themeColors.colorExtraDark}} >
                    {height}
                </Text>
                <Text className={"w-1/5 text-center"} style={{color:themeColors.colorExtraDark}} >
                    {headCircumference}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    rowborder: {
        borderColor:themeColors.colornormal,
    }
})

