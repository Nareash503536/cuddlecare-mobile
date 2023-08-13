import {Text, View, Image, Platform, Button} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import {themeColors} from "../theme";
import {React, useEffect, useContext} from "react";
import {StatusBar} from "expo-status-bar";
import {babyDetails} from "../constants";
import BabyCard from "../components/babyCard";
import {useNavigation} from "@react-navigation/native";
import {Carousel} from "react-native-snap-carousel";
import RemindersButton from "../components/RemindersButton";
import {AuthContext} from "../Context/AuthContext";
import AuthenticationAPI from "../Api/AuthenticationAPI";
import * as SecureStore from 'expo-secure-store';



const ios = Platform.OS==='android';


export function HomeScreen() {
    const navigation = useNavigation();

    // const { logout } = useContext(AuthContext);

    // useEffect(() => {
    //     return () => {
    //         setTimeout(() => {
    //             navigation.navigate('Baby')
    //         }, 1000);
    //     };
    // }, []);
    return (
        <View style={{backgroundColor:"#F9F9F9"}} className={"flex-1"}>
            <SafeAreaView className={ios? 'mt-10': '-mb-8'}>
                <StatusBar  />
                {/*Section 1*/}
                <View className="mx-4 flex-row  items-center">
                    <View className={"rounded-full p-1"} style={{backgroundColor:themeColors.btnColor}}>
                        <Image source={require('../assets/images/kavindu.png')}
                               className="h-8 w-8 rounded-full" />
                    </View>
                    <View className=" flex-1 space-x-2 items-center">
                        <Image source={require('../assets/images/appName.png')}
                               style={{width:150,height:30}} />
                    </View>
                    <View className={"rounded-full p-1"} style={{backgroundColor:themeColors.btnColor}}>
                        <BellIcon size="27" color="white" />
                    </View>

                </View>

                {/*section 2 User welcome*/}
                <View className={" pl-8 mt-8"}>
                    <Text className={"text-5xl text-gray-700"} >
                        Hello<Text className={"text-5xl font-semibold text-gray-500"}> Kavi,</Text>
                    </Text>
                    {/*<Button title="Logout" onPress={() => logout()} />*/}
                    <Text className={"text-gray-500 "}>Let's takecare of your baby!</Text>
                </View>

                {/*Baby section*/}
                <View >
                    <View>
                        <Carousel
                            data={babyDetails}
                            renderItem={({item})=> <BabyCard item={item} />}
                            firstItem={1}
                            loop={true}
                            inactiveSlideScale={0.75}
                            inactiveSlideOpacity={0.75}
                            sliderWidth={400}
                            itemWidth={200}
                            slideStyle={{display: 'flex', alignItems: 'center'}} />
                    </View>

                </View>
                
                   <View>
                        <RemindersButton/>
                   </View>
                   {/*<View>*/}
                   {/*    <Button title={"community"} onPress={() => navigation.navigate('Community')}/>*/}
                   {/*</View>*/}
            </SafeAreaView>
        </View>
    )
}
