import React, {useContext, useState,useEffect} from 'react';
import {
    View,
    TextInput,
    Text,
    Image,
    Button,
    TouchableOpacity,
    StyleSheet,
    Pressable,
    ScrollView,
    FlatList,
    Animated
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColors } from '../theme';
import {COLORS} from "../constants/theme";
import { useNavigation } from '@react-navigation/native';
import {useRoute} from "@react-navigation/native";

import ReminderHeader from "../components/UI/RemindersHeader";
import {PlusSmallIcon} from "react-native-heroicons/solid";
import {AuthContext} from "../Context/AuthContext";
import {BASE_URL} from "../config";
import axios from "axios";
import {getFormattedDate, getFormattedTime} from "../util/date";
// import {RemindersApiUpdate,RemindersApiDelete} from "../Api/RemindersAPI";
import {faTrashAlt,faPencilAlt} from "@fortawesome/free-solid-svg-icons";
import {useIsFocused} from "@react-navigation/core";
import GrowthMeasurement from "../components/Growth/GrowthMeasurement";
import {useSelector} from "react-redux";
import {selectReminders} from "../slices/reminderSlice";
import ReminderDetail from "./ReminderDetail";


export function RemindersList() {

    const [reminders, listReminders] = useState([]);
    const isFocused = useIsFocused();
    let reminderDetails = useSelector(selectReminders);

    //
    // useEffect(() => {
    //     if(isFocused){
    //         fetchReminders();
    //     }
    //
    // }, [isFocused]);
    //
    //
    // const route = useRoute();
    //
    //
    // useEffect(() => {
    //         console.log("reminders length: ", reminders.length)
    //         console.log(reminders);
    //     }, [reminders]
    // )

    const navigation = useNavigation();
    const {updateKeys} = useContext(AuthContext);


    // const fetchReminders = async () => {
    //     await updateKeys();
    //     try {
    //
    //         const apiURL = BASE_URL + "/reminders/all";
    //         const response = await axios.get(apiURL, null);
    //
    //         console.log("Fetched Reminders:", response.data);
    //         listReminders(response.data);
    //
    //     } catch (error) {
    //         console.log("Fetch data error:" + error);
    //     }
    // }
    //
    //
    // const deleteReminder = async (reminder_id) => {
    //     await updateKeys();
    //     // try {
    //     const response = await RemindersApiDelete(reminder_id);
    //     console.log("delete response: ",response)
    //
    //
    //     listReminders(prevReminders => {
    //         return prevReminders.filter(reminder => reminder.reminderID !== reminder_id);
    //     })
    //
    // }
    //
    //
    // const updateReminder = async (id, title, date, time, type, ringing_fr, repeat_fr) => {
    //     try {
    //         const apiURL = BASE_URL + "/reminders/update/" + id;
    //         const response = await RemindersApiUpdate({
    //             title: title,
    //             date: date,
    //             time: time,
    //             reminderType: type,
    //             ringingFrequency: ringing_fr,
    //             repeatFrequency: repeat_fr
    //         });
    //         console.log("updated response Ravishi" + response.data);
    //
    //         listReminders(prevReminders => {
    //             return prevReminders.map(reminder => {
    //                 if (reminder.reminderID === id) {
    //                     return {
    //                         ...reminder,
    //                         reminderID: id,
    //                         title: title,
    //                         date: date,
    //                         time: time,
    //                         reminderType: type,
    //                         ringingFrequency: ringing_fr,
    //                         repeatFrequency: repeat_fr
    //                     }
    //                 }
    //                 return reminder;
    //             })
    //         })
    //     } catch (error) {
    //         console.log("update error:" + error);
    //     }
    // }

    function renderReminderDetails(reminderData) {
        return <ReminderDetail {...reminderData.item} />;
    }


    return (

        <SafeAreaView className={"p-5"}>


            <ReminderHeader screen={"Reminders"}/>
            <View className={"flex-column space-x-0.5"}>
                <Text className={"p-5 text-center font-bold text-lg"}>RemindersList</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} className={"p-2 pb-3"}>
                <FlatList
                    data={reminderDetails}
                    renderItem={renderReminderDetails}
                    keyExtractor={(growth) => growth.id}
                />
            </ScrollView>


        </SafeAreaView>

    );

}


const styles = StyleSheet.create({

    Notification:{

        backgroundColor:themeColors.colornormal,
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
        display:"flex",
        flexDirection:"column",
        // paddingHorizontal:65,
        paddingVertical:10,
        paddingBottom:1.5,
        marginBottom:4

    },
    bell:{
        display:"flex",
        backgroundColor:COLORS.primary,
        paddingVertical:15,
        paddingHorizontal:15,
        marginLeft:10,
        borderTopRightRadius:10,
        borderBottomRightRadius:10,
        justifyContent:"center",
        marginBottom:4

    },

    reminder:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",

    },
    updatedeleteIcons:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        marginTop:20,

    }

});

