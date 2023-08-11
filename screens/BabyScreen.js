import React, {useContext} from "react";
import {Text, View, Image, TouchableOpacity, Button} from 'react-native'
import {StatusBar} from "expo-status-bar";
import {SafeAreaView} from "react-native-safe-area-context";
import {themeColors} from "../theme";
import {BellIcon} from "react-native-heroicons/outline";
import {Bars3CenterLeftIcon} from "react-native-heroicons/mini";
import {babyDetails, mainFeatures} from "../constants";
import Carousel from "react-native-snap-carousel";
import {Features} from "../components/features";
import {UpcomingEvent} from "../components/upcomingEvent";
import {Logs} from "../components/logs";
import {HomeIcon,CalendarDaysIcon,ClipboardDocumentListIcon,PresentationChartLineIcon} from "react-native-heroicons/outline";
import {useNavigation} from "@react-navigation/native";
import { AuthContext } from "../Context/AuthContext";

export function BabyScreen() {
    let baby = babyDetails[2];
    let featuresDetails = mainFeatures;
    let navigation = useNavigation();

    const { logout } = useContext(AuthContext);

    return (
        <View className={"flex-1 relative "}>
            <StatusBar style={"light"}/>
            <Image blurRadius={3} source={require("../assets/images/background2.png")} className={"absolute h-full w-full"}/>
            <SafeAreaView>
                {/*Top bar*/}
                <View className="mx-4  mt-1 flex-row  items-center">
                    <TouchableOpacity className={"rounded-full p-1"} style={{backgroundColor:themeColors.btnColor}} >
                        <Bars3CenterLeftIcon size="27" color="white" />
                    </TouchableOpacity>

                    <View className=" flex-1 space-x-2 items-center">
                        <Image source={require('../assets/images/appName.png')}
                               style={{width:150,height:30}} />
                    </View>
                    <TouchableOpacity className={"rounded-full p-1"} style={{backgroundColor:themeColors.btnColor}}>
                        <BellIcon size="27" color="white" />
                    </TouchableOpacity>
                </View>

                {/*BabyDetails*/}
                <View className={"mt-3 px-4 flex-row "}>
                    {/*image*/}
                    <View className={"bg-white p-1 rounded-3xl"}>
                        <Image source={baby.image} className={"w-20 h-20 rounded-3xl"}/>
                    </View>

                    {/*name and growth status*/}
                    <View className={"flex  flex-1 pl-3"}>
                        <View>
                            <Text className={"text-white text-2xl font-semibold"} style={{letterSpacing:2}}>{baby.name}</Text>
                        </View>
                        <View className={"flex-row flex-1 justify-between space-x-1"} >
                            <View className={" flex px-5 py-1 items-center rounded-2xl"} style={{backgroundColor:themeColors.bgWhite(0.4)}} >
                                <Text className={"text-white"} >Weight</Text>
                                <Text className={"text-lg "} style={{color:themeColors.colorExtraDark}}>{baby.weight}kg</Text>
                            </View>
                            <View className={" flex px-5 py-1 items-center rounded-2xl"} style={{backgroundColor:themeColors.bgWhite(0.3)}} >
                                <Text className={"text-white"}>Size</Text>
                                <Text className={"text-lg "} style={{color:themeColors.colorExtraDark}}>{baby.height}cm</Text>
                            </View>
                            <View className={" flex px-5 py-1 items-center rounded-2xl"} style={{backgroundColor:themeColors.bgWhite(0.3)}} >
                                <Text className={"text-white"}>Age</Text>
                                <Text className={"text-lg"} style={{color:themeColors.colorExtraDark}} >{baby.year}y {baby.month}m</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/*feature carousel*/}
                <View  className={" mt-1 "}>
                    {/*<Button*/}
                    {/*    title="Logout"*/}
                    {/*    onPress={logout}*/}
                    {/*/>*/}
                    <Carousel
                        data={featuresDetails}
                        renderItem={({item})=> <Features item={item} />}
                        firstItem={1}
                        loop={true}
                        inactiveSlideScale={0.75}
                        inactiveSlideOpacity={0.75}
                        sliderWidth={400}
                        itemWidth={190}
                        slideStyle={{display: 'flex', alignItems: 'center'}} />
                </View>

                {/*upcoming notifier*/}
                <View  className={" mt-1 "} >
                    <View className={"flex-row justify-between bg-white my-2"} >
                        <Text className={"pl-2 font-semibold text-gray-500"} style={{letterSpacing:1,fontSize:16}} > Upcoming Event</Text>
                        <TouchableOpacity>
                            <Text className={"pr-2 text-gray-500"} style={{letterSpacing:1,}} > See More</Text>
                        </TouchableOpacity>
                    </View>
                    <UpcomingEvent title={"Vaccination"}/>
                </View>

                {/*Latest log notifier*/}
                <View  className={" mt-2 "}>
                    <View className={"flex-row justify-between  my-2"}>
                        <Text className={"pl-2 font-semibold text-gray-500"} style={{letterSpacing:1,fontSize:16}} >Latest Logs</Text>
                        <TouchableOpacity>
                            <Text className={"pr-2 text-gray-500"} style={{letterSpacing:1,}} > See More</Text>
                        </TouchableOpacity>
                    </View>
                    <Logs/>
                </View>

                {/*Bottom Bar*/}
                {/*<View  className={"mb-1 bg-white rounded-3xl mt-5 border border-gray-300 mx-1"}  >*/}
                {/*    <View  className={" w-full flex-row justify-around py-2"}>*/}
                {/*        <TouchableOpacity className={"rounded-full p-2"} style={{backgroundColor:themeColors.colornormal}}>*/}
                {/*            <HomeIcon  size="25" color="white" />*/}
                {/*        </TouchableOpacity>*/}
                {/*        <TouchableOpacity className={"rounded-full p-2"}>*/}
                {/*            <CalendarDaysIcon size="27" color="gray" />*/}
                {/*        </TouchableOpacity>*/}
                {/*        <TouchableOpacity className={"rounded-full p-2"} >*/}
                {/*            <ClipboardDocumentListIcon size="27" color="gray" />*/}
                {/*        </TouchableOpacity>*/}
                {/*        <TouchableOpacity className={"rounded-full p-2"}>*/}
                {/*            <PresentationChartLineIcon  size="27" color="gray" />*/}
                {/*        </TouchableOpacity>*/}
                {/*        <TouchableOpacity className={"rounded-full p-2"}>*/}
                {/*            <BellIcon   size="27" color="gray" />*/}
                {/*        </TouchableOpacity>*/}
                {/*    </View>*/}
                {/*</View>*/}

            </SafeAreaView>
        </View>

    )
}
