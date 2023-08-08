import {Image, Text, View} from "react-native";
import {themeColors} from "../../theme";
import {ArrowUpIcon} from "react-native-heroicons/solid";
import React from "react";

export default function GrowthDisplays({weight,height,headCircumference}) {
    return(
        <View className={"flex-row my-2 justify-center items-center"}>

            {/*Weight Display*/}
            <View className={"flex rounded-xl shadow-2xl mx-1 "} style={{backgroundColor:themeColors.colornormal,shadowColor: "#000"}}>
                {/*Image and title*/}
                <View className={"flex-row mx-2 space-x-2 pt-1"}>
                    {/*Weight Image*/}
                    <View className={" p-1 rounded-full bg-white"} >
                        <Image source={require("../../assets/images/weight-icon.png")} className={"w-8 h-8 rounded-full"}/>
                    </View>
                    <View className={"flex pt-1"}>
                        <Text className={"flex-row font-semibold text-white"}>weight</Text>
                        <View className={"flex-row"}>
                            <Text className={"flex-row font-semibold text-white"}>25.2%</Text>
                            <ArrowUpIcon size="16" color="white" />
                        </View>
                    </View>
                </View>
                <View className={"flex-row justify-center items-center mx-2 space-x-1 my-1"}>
                    <Text className={"text-3xl text-white"}>{weight}</Text>
                    {/*<Text className={"text-3xl text-white"}>{growthDetails[0].weight}</Text>*/}
                    <View className={"mt-2"}><Text className={" text-gray-100"}>kg</Text></View>
                </View>
            </View>

            {/*Height Display*/}
            <View className={"flex rounded-xl shadow-2xl mx-1 "} style={{backgroundColor:themeColors.colornormal,shadowColor: "#000"}}>
                {/*Image and title*/}
                <View className={"flex-row mx-2 space-x-2 pt-1"}>
                    {/*Weight Image*/}
                    <View className={" p-1 rounded-full bg-white"} >
                        <Image source={require("../../assets/images/height-icon.png")} className={"w-8 h-8 rounded-full"}/>
                    </View>
                    <View className={"flex pt-1"}>
                        <Text className={"flex-row font-semibold text-white"}>Height</Text>
                        <View className={"flex-row"}>
                            <Text className={"flex-row font-semibold text-white"}>21.4%</Text>
                            <ArrowUpIcon size="16" color="white" />
                        </View>
                    </View>
                </View>
                <View className={"flex-row justify-center items-center mx-2 space-x-1 my-1"}>
                    <Text className={"text-3xl text-white"}>{height}</Text>
                    <View className={"mt-2"}><Text className={" text-gray-100"}>cm</Text></View>
                </View>
            </View>

            {/*Head Circum display*/}
            <View className={"flex rounded-xl shadow-2xl mx-1 "} style={{backgroundColor:themeColors.colornormal,shadowColor: "#000"}}>
                {/*Image and title*/}
                <View className={"flex-row mx-2 space-x-2 pt-1"}>
                    {/*Weight Image*/}
                    <View className={" p-1 rounded-full bg-white"} >
                        <Image source={require("../../assets/images/headCircum-icon.png")} className={"w-8 h-8 rounded-full"}/>
                    </View>
                    <View className={"flex pt-1"}>
                        <Text className={"flex-row font-semibold text-white"}>HeadCir.</Text>
                        <View className={"flex-row"}>
                            <Text className={"flex-row font-semibold text-white"}>13.4%</Text>
                            <ArrowUpIcon size="16" color="white" />
                        </View>
                    </View>
                </View>
                <View className={"flex-row justify-center items-center mx-2 space-x-1 my-1"}>
                    <Text className={"text-3xl text-white"}>{headCircumference}</Text>
                    <View className={"mt-2"}><Text className={" text-gray-100"}>cm</Text></View>
                </View>
            </View>

        </View>
    )
}