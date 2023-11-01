import React, {useState} from 'react'
import {TouchableOpacity, View, Text, StyleSheet, Image, Pressable} from "react-native";
import {ArrowUpIcon, CalendarDaysIcon, CheckIcon, ClockIcon} from "react-native-heroicons/solid";
// import {dateDiff,getDateenUSFormat} from "../../util/date";
// import {babyDetails} from "../../constants";
// import { Center, HStack, Modal, VStack} from "native-base";
// import Button from "../UI/Button";
// import DeleteBtn from "../UI/DeleteBtn";
// import UpdateBtn from "../UI/UpdateBtn";
import {useDispatch} from "react-redux";
// import {deleteGrowth} from "../../slices/growthSlice";
import {useNavigation} from "@react-navigation/native";
// import {red} from "react-native-reanimated/lib/types/lib";

export default function ReminderDetail({ id,reminderType, repeatFrequency, ringingFrequency, time,title,date}) {
;
    const dispatch = useDispatch();
    const navigation = useNavigation();


    return (
        <Pressable className={"pt-3"}
        >

            <View className={"flex-row rounded-xl p-3 shadow-2xl  mx-2 space-x-3"} style={{backgroundColor:"white",shadowColor: "#000"}}>

                <View className={"flex justify-center flex-1"}>
                    <View><Text className={" text-gray-500  font-semibold"} style={{color:"gray"}}>{reminderType}</Text></View>

                    <View><Text className={" text-gray-500 py-1"} style={{color:"gray"}}>
                        {title}</Text>
                    </View>
                    <View><Text className={" text-gray-500 py-1"} style={{color:"gray"}}>
                        {repeatFrequency}</Text>
                    </View>
                    <View><Text className={" text-gray-500 py-1"} style={{color:"gray"}}>
                        {time}</Text>
                    </View>

                    <View className={"flex-row items-center space-x-1"}>
                        <ClockIcon size="18" color="limegreen" />
                        <Text className={"text-gray-500"} style={{color:"gray"}}>{date}</Text>
                    </View>
                </View>

                {/*<View className={"p-1 bg-white"} style={{backgroundColor:"white"}}>*/}
                {/*    <View className={"flex-row mx-1 space-x-2 pt-1 "}>*/}
                {/*        <View >*/}
                {/*            <Image source={require("../assets/images/weight-icon.png")} className={"w-6 h-6 "}/>*/}
                {/*        </View>*/}
                {/*        <View className={"flex"}>*/}
                {/*            <Text className={"flex-row font-semibold text-gray-500"} style={{color:"gray"}}>{ringingFrequency} kg</Text>*/}
                {/*        </View>*/}
                {/*    </View>*/}

                {/*    <View className={"flex-row mx-1 space-x-2 pt-1 "}>*/}
                {/*        <View >*/}
                {/*            <Image source={require("../assets/images/height-icon.png")} className={"w-6 h-6 "}/>*/}
                {/*        </View>*/}
                {/*        <View className={"flex"}>*/}
                {/*            <Text className={"flex-row font-semibold text-gray-500"} style={{color:"gray"}}>{repeatFrequency} cm</Text>*/}
                {/*        </View>*/}
                {/*    </View>*/}

                {/*    <View className={"flex-row mx-1 space-x-2 pt-1 "}>*/}
                {/*        <View >*/}
                {/*            <Image source={require("../assets/images/headCircum-icon.png")} className={"w-6 h-6 "}/>*/}
                {/*        </View>*/}
                {/*        <View className={"flex"}>*/}
                {/*            <Text className={"flex-row font-semibold text-gray-500"} style={{color:"gray"}}>{time} cm</Text>*/}
                {/*        </View>*/}
                {/*    </View>*/}
                {/*</View>*/}

            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    rowborder: {
        borderColor:"#e87174",
    },
})

// style={{backgroundColor:"white", color:themeColors.colorDanger, borderColor: themeColors.colorDanger,borderWidth: 1}}

