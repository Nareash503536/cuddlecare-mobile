import React, { useState, useEffect, useContext } from 'react';

import Timeline from 'react-native-timeline-flatlist';
import { View, Text, ActivityIndicator, Image, TouchableOpacity, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import { useRoute } from '@react-navigation/core';
import { COLORS } from '../../../constants/theme';
import images from '../../../constants/images';
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../../../theme";
import { Modal, Center, Button, FormControl, Input, VStack, HStack } from "native-base";
import Toast from 'react-native-toast-message';
import { AuthContext } from "../../../Context/AuthContext";
import {BASE_URL} from "../../../config";
import {ApiManager} from "../../../Api/ApiManager";
import ScreenHeader from "../../ScreenHeader";
import Food from "../../../assets/images/Food/dairy-products.png";


export const BreastFeedingTimeline = () => {

    // const route = useRoute();
    // const date = route.params?.date || {};
    const {updateKeys} = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);
    const [feedingData, setFeedingData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [currentTime, setCurrentTime] = useState(null);
    const [currentAddNotes, setCurrentAddNotes] = useState(null);

    const getFeeding = async () => {
        await updateKeys();
        // console.log(inputs.amount.value, inputs.expenseName.value, inputs.notes.value,inputs.date.value);

        const apiURL = BASE_URL + "/BreastFeeding/allDate";

        try {
            const response = await ApiManager.get(apiURL,{
                headers: {
                    "Content-Type": "application/json",
                },

            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }




    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                await updateKeys();
                const feedingDetails = await getFeeding();
                feedingDetails.forEach((feeding) => {
                   let icon = require("../../../assets/images/babyMilkFeeding.png");
                    setFeedingData((prevFeedingData) => [...prevFeedingData, {
                        time: feeding.feedingDate.split("T")[0],
                        title: feeding.side + " Side",
                        description: feeding.starttime + " - " + feeding.endtime+"\nDuration: "+feeding.feedingDuration,
                        icon: icon,

                    }]);
                });
                console.log("all feeding",feedingData);
            } catch (error) {
                console.error("Error fetching Feeding Data: ", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            {
                isLoading ?
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }
                    } >
                        {/* <LottieView source={animation.Spinner} autoPlay loop /> */}
                        < ActivityIndicator size="large" color={COLORS.primary} />
                    </View > :
                    <>
                        {
                            feedingData.length === 0 ?
                                <View className={"justify-center align-middle mt-6"} style={{ flex: 1 }}>
                                    <ScreenHeader screen={"Baby"} screenName={"Feeding Activity"} BabyName={'Chelsea'} image={Food} />

                                    <Image
                                        source={require("../../../assets/images/Food/nodatarecorded.png")}
                                        resizeMode="contain"
                                        className={"w-72 h-72 mx-auto"}
                                        style={{ flex: 2 }}
                                    />
                                    <Text
                                        className={"text-center font-bold mb-5 mt-3 text-xl"}
                                        style={{ flex: 1 }}
                                    >
                                        No Feeding Data recorded
                                    </Text>
                                </View >
                                :
                                <SafeAreaView className = "mt-6">
                                    <ScreenHeader screen={"Baby"} screenName={"Feeding Activity"} BabyName={'Chelsea'} image={Food} />

                                    <ScrollView 
                                        nestedScrollEnabled={true}
                                        style={{
                                            backgroundColor: "#fff",
                                            shadowColor: '#000',
                                            elevation: 20,
                                            borderRadius: 10,
                                            margin: 20,
                                            height:'85%',
                                            padding: 5



                                        }}
                                        refreshControl={
                                            <RefreshControl
                                                refreshing={isLoading}
                                                onRefresh={() => {
                                                    setIsLoading(true);
                                                    setTimeout(() => {
                                                        setIsLoading(false);
                                                    }, 2000);
                                                }}
                                            />
                                        }>
                                        <View

                                        >
                                            <Text
                                                className={"text-center font-bold text-base my-5"}
                                            >
                                                Breast Feeding Timeline
                                            </Text>

                                            <Timeline
                                                data={feedingData}
                                                circleSize={40}
                                                circleColor='#477276'
                                                lineColor='#477276'
                                                timeContainerStyle={{ minWidth: 52 }}
                                                timeStyle={{
                                                    textAlign: 'center',
                                                    backgroundColor: '#91C9CE',
                                                    color: 'white',
                                                    padding: 5,
                                                    borderRadius: 13,
                                                    marginBottom: 10,
                                                    marginLeft: 10,
                                                    marginRight: 10,

                                                }}

                                                columnFormat='two-column'
                                                descriptionStyle={{
                                                    color: 'gray',
                                                    fontSize: 12,
                                                }}
                                                titleStyle={{
                                                    color: '#fff',
                                                    fontWeight: 'bold',
                                                    bottom: 2,
                                                    fontSize: 15,
                                                }}
                                                detailContainerStyle={{
                                                    marginBottom: 20,
                                                    paddingLeft: 5,
                                                    paddingRight: 5,
                                                    backgroundColor: '#BADEE3',
                                                    borderRadius: 10,
                                                    marginHorizontal: 10
                                                }}
                                                options={{
                                                    style: { paddingTop: 5 }
                                                }}
                                                separator={false}
                                                isUsingFlatlist={true}
                                                innerCircle={'icon'}
                                            />
                                        </View>
                                    </ScrollView>
                                </SafeAreaView>
                        }
                    </>
            }

        </>
    )
}