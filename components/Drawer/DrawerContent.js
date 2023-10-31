import {View, Text, SafeAreaView, Image, Dimensions, TouchableOpacity, ScrollView} from "react-native";
import {
    ArrowRightOnRectangleIcon,
    BookmarkIcon,
    ChartBarIcon,
    Cog8ToothIcon,
    PhoneIcon,
    UserGroupIcon,
    UserIcon
} from "react-native-heroicons/outline";
import BabyProfile from "./BabyProfile";
import React, {useContext} from "react";
import {AuthContext} from "../../Context/AuthContext";
import images from "../../constants/images";

const deviceWidth = Dimensions.get("window").width;
export default function DrawerContent (){
    const { logout, user, babySet } = useContext(AuthContext);
    return (
        <SafeAreaView className={"flex flex-1"} style={{backgroundColor:"white"}}>
            <ScrollView>
                <View className="h-full">
                    <View className={"mt-5 flex-row space-x-3 items-center"} style={{ paddingLeft: deviceWidth * 0.04 }}>
                        <View >
                            <Image source={user.profilePicture ? { uri: user.profilePicture } : images.AddImage} className={" rounded-full w-14 h-14"} />
                        </View>
                        <View className={"flex"}>
                            <Text className={"text-lg font-semibold "}>{user.username}</Text>
                            <Text className={"text-gray-400"} style={{ color: "gray" }}>Member since: Jan 12, 2023</Text>
                        </View>
                    </View>

                    <View style={{ backgroundColor: "#F6F6F6", height: 3, marginTop: 10 }} />

                    <View className={"px-2"} >
                        <BabyProfile babySet={babySet}/>
                    </View>

                    <View style={{ backgroundColor: "#F6F6F6", height: 3, marginTop: 4 }} />


                    <View className={"px-2"}>
                        <TouchableOpacity>
                            <View className={"flex-row px-2 py-2 space-x-3"}>
                                <UserIcon className="h-8 w-8" color={"gray"} />
                                <Text className=" flex-1" style={{ color: "gray", fontSize: 16 }}>Caregivers</Text>
                                <Image source={require("../../assets/images/crown.png")} className={"w-5 h-5"} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View className={"flex-row px-2 py-2 space-x-3 "}>
                                <UserGroupIcon className="h-8 w-8" color={"gray"} />
                                <Text className=" flex-1" style={{ color: "gray", fontSize: 16 }}>Community</Text>
                                <Image source={require("../../assets/images/crown.png")} className={"w-5 h-5"} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View className={"flex-row px-2 py-2 space-x-3"}>
                                <ChartBarIcon className="h-8 w-8" color={"gray"} />
                                <Text className=" flex-1" style={{ color: "gray", fontSize: 16 }}>Statistic</Text>
                                <Image source={require("../../assets/images/crown.png")} className={"w-5 h-5"} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View className={"flex-row px-2 py-2 space-x-3"}>
                                <BookmarkIcon className="h-8 w-8" color={"gray"} />
                                <Text className="flex-1" style={{ color: "gray", fontSize: 16 }}> Community bookmarks</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View className={"flex-row px-2 py-2 space-x-3"}>
                                <PhoneIcon className="h-8 w-8" color={"gray"} />
                                <Text className=" flex-1" style={{ color: "gray", fontSize: 16 }}> Support</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ backgroundColor: "#F6F6F6", height: 3, marginTop: 4 }} />

                    <View>
                        <Text className="my-2 ml-2" style={{ color: "gray", fontSize: 16 }}>Advertisement</Text>
                        <Image source={require("../../assets/images/advertisement.png")} className={"w-full h-20"} />
                    </View>

                    <View style={{ backgroundColor: "#F6F6F6", height: 3 }} className={"mt-36"} />

                    <View className={"px-2 mt-2"}>
                        <TouchableOpacity onPress={logout}>
                            <View className={"flex-row px-2 py-2 space-x-3 "}>
                                <ArrowRightOnRectangleIcon className="h-8 w-8" color={"gray"} />
                                <Text className=" flex-1" style={{ color: "gray", fontSize: 16 }}>Log out</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View className={"flex-row px-2 py-2 space-x-3"}>
                                <Cog8ToothIcon className="h-8 w-8" color={"gray"} />
                                <Text className=" flex-1" style={{ color: "gray", fontSize: 16 }}>Settings</Text>
                            </View>
                        </TouchableOpacity>
                        
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}