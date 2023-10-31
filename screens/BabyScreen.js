import React, { useContext } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import { BellIcon } from "react-native-heroicons/outline";
import { Bars3CenterLeftIcon } from "react-native-heroicons/mini";
import { mainFeatures } from "../constants";
import Carousel from "react-native-snap-carousel";
import { Features } from "../components/features";
import { UpcomingEvent } from "../components/upcomingEvent";
import { Logs } from "../components/logs";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../Context/AuthContext";
import RemindersButton from "../components/RemindersButton";
import { Drawer } from 'react-native-drawer-layout';
import DrawerContent from "../components/Drawer/DrawerContent";
import images from "../constants/images";
import { COLORS } from "../constants/theme";

export function BabyScreen() {

    const { baby, user } = useContext(AuthContext);

    // let baby = babyDetails[2];
    let featuresDetails = mainFeatures;
    let navigation = useNavigation();
    const [open, setOpen] = React.useState(false);

    if (baby)
        return (
            <Drawer
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                renderDrawerContent={() => {
                    return (
                        <DrawerContent />
                    );
                }}
            >
                <View className={"flex-1 relative "}>
                    <StatusBar style={"light"} />
                    <Image source={require("../assets/images/background2.png")} className={"absolute h-full w-full"} />
                    <SafeAreaView>
                        {/*Top bar*/}
                        <View className="mx-4  mt-1 flex-row  items-center">
                            <TouchableOpacity className={"rounded-full p-1"} style={{ backgroundColor: themeColors.btnColor }}
                                onPress={() => setOpen((prevOpen) => !prevOpen)}
                            >
                                <Bars3CenterLeftIcon size="27" color="white" />
                            </TouchableOpacity>

                            <View className=" flex-1 space-x-2 items-center">
                                <Image source={require('../assets/images/appName.png')}
                                    style={{ width: 150, height: 30 }}/>
                            </View>
                            <TouchableOpacity className={"rounded-full p-1"} style={{ backgroundColor: themeColors.btnColor }}>
                                <BellIcon size="27" color="white" />
                            </TouchableOpacity>
                        </View>

                        {/*BabyDetails*/}
                        <View className={"mt-3 px-4 flex-row "}>
                            {/*image*/}
                            <View className={"bg-white p-1 rounded-3xl"}>
                                <Image source={baby.babyPicture ? { uri: baby.babyPicture } : images.AddImage} className={"w-20 h-20 rounded-3xl"} />
                            </View>

                            {/*name and growth status*/}
                            <View className={"flex  flex-1 pl-3"}>
                                <View>
                                    <Text className={"text-white text-2xl font-semibold"} style={{ letterSpacing: 2, color: "white" }}>{baby.babyName}</Text>
                                </View>
                                <View className={"flex-row flex-1 justify-between space-x-1"} >
                                    <View className={" flex px-5 py-1 items-center rounded-2xl"} style={{ backgroundColor: themeColors.bgWhite(0.4) }} >
                                        <Text className={"text-white"} >Weight</Text>
                                        <Text className={"text-lg "} style={{ color: themeColors.colorExtraDark }}>{baby.weight}kg</Text>
                                    </View>
                                    <View className={" flex px-5 py-1 items-center rounded-2xl"} style={{ backgroundColor: themeColors.bgWhite(0.3) }} >
                                        <Text className={"text-white"}>Size</Text>
                                        <Text className={"text-lg "} style={{ color: themeColors.colorExtraDark }}>{baby.height}cm</Text>
                                    </View>
                                    <View className={" flex px-5 py-1 items-center rounded-2xl"} style={{ backgroundColor: themeColors.bgWhite(0.3) }} >
                                        <Text className={"text-white"}>Age</Text>
                                        <Text className={"text-lg"} style={{ color: themeColors.colorExtraDark }} >{
                                            Math.floor((new Date() - new Date(baby.dob)) / (1000 * 60 * 60 * 24 * 30))
                                        }m</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View className={" mt-1 "}>
                            <View className={"my-2"}>
                                <RemindersButton />
                            </View>
                            <Carousel
                                data={featuresDetails}
                                renderItem={({ item }) => <Features item={item} />}
                                firstItem={1}
                                loop={true}
                                inactiveSlideScale={0.75}
                                inactiveSlideOpacity={0.75}
                                sliderWidth={400}
                                itemWidth={190}
                                slideStyle={{ display: 'flex', alignItems: 'center' }} />
                        </View>

                        {/*upcoming notifier*/}
                        <View className={" mt-1 "} >
                            <View className={"flex-row justify-between bg-white my-2"} >
                                <Text className={"pl-2 font-semibold text-gray-500"} style={{ letterSpacing: 1, fontSize: 16, color: "gray" }} > Upcoming Event</Text>
                                <TouchableOpacity>
                                    <Text className={"pr-2 text-gray-500"} style={{ letterSpacing: 1, color: "gray" }} > See More</Text>
                                </TouchableOpacity>
                            </View>
                            <UpcomingEvent title={"Vaccination"} />
                        </View>

                        {/*Latest log notifier*/}
                        <View className={" mt-2 "}>
                            <View className={"flex-row justify-between  my-2"}>
                                <Text className={"pl-2 font-semibold text-gray-500"} style={{ letterSpacing: 1, fontSize: 16, color: "gray" }} >Latest Logs</Text>
                                <TouchableOpacity>
                                    <Text className={"pr-2 text-gray-500"} style={{ letterSpacing: 1, }} > See More</Text>
                                </TouchableOpacity>
                            </View>
                            <Logs />
                        </View>
                    </SafeAreaView>
                </View>
            </Drawer>
        )
    else
        return (
            <Drawer
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                renderDrawerContent={() => {
                    return (
                        <DrawerContent />
                    );
                }}
            >
                <SafeAreaView>
                    <View className={"justify-center items-center"}>
                        <StatusBar style={"light"} />
                        {/* <Image source={require("../assets/images/background2.png")} className={"absolute h-full w-full"} /> */}
                        <View className="p-5 m-5 flex-row  items-center relative top-0">
                            <TouchableOpacity className={"rounded-full p-1"} style={{ backgroundColor: themeColors.btnColor }}
                                onPress={() => setOpen((prevOpen) => !prevOpen)}
                            >
                                <Bars3CenterLeftIcon size="27" color="white" />
                            </TouchableOpacity>

                            <View className=" flex-1 space-x-2 items-center">
                                <Image source={require('../assets/images/appName.png')}
                                    style={{ width: 150, height: 30 }} />
                            </View>
                            <TouchableOpacity className={"rounded-full p-1"} style={{ backgroundColor: themeColors.btnColor }}>
                                <BellIcon size="27" color="white" />
                            </TouchableOpacity>
                        </View>
                        <View className={"h-screen justify-start items-center"}>
                            <Image
                                source={images.NoBabiesWarning}
                                className={"w-80 h-80 rounded-full border"}
                            />
                            <Text className={"text-2xl font-extrabold"} style={{ color: COLORS.fontColor1 }}>No Babies Added!</Text>
                            <Text style={{ color: "grey" }}>Sorry... Add a baby to get started</Text>
                            {
                                user.relationship !== "caregiver" ?
                                <TouchableOpacity className={"mx-5 flex-row justify-between items-center"}>
                                <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate("AddBabyScreen")}>
                                    <Text className={"font-extrabold"} style={{ color: COLORS.tertiary }}>
                                        Add Baby
                                    </Text>
                                </TouchableOpacity>
                            </TouchableOpacity> : null}
                        </View>

                    </View>
                </SafeAreaView>
            </Drawer>
        )

}


const styles = StyleSheet.create({
    Button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        justifyContent: 'center',
        paddingHorizontal: 11,
        height: 50,
        marginVertical: 10,
        borderRadius: 50,
        borderColor: COLORS.tertiary,
        borderWidth: 2,
        backgroundColor: "white",
    }
});
