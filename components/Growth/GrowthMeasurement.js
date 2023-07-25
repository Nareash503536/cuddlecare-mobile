import React from 'react'
import {TouchableOpacity, View,Text,StyleSheet} from "react-native";
import {themeColors} from "../../theme";
export default function GrowthMeasurement({ weight, height, headCircumference, description,date}) {
    return (
        <TouchableOpacity>
            <View className={'flex-row justify-between px-5 py-3 border rounded m-2'}
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

