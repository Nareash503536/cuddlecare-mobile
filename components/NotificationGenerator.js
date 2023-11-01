import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import * as Notifications from 'expo-notifications';
import {useEffect} from "react";

Notifications.setNotificationHandler({
    handleNotification:async ()=>{
        return{
            shouldPlaySound:true,
            shouldShowAlert:true,
            shouldSetBadge:true
        }
    }
});

export function NotificationGenerator() {
    useEffect(() => {
        const subscription1 = Notifications.addNotificationReceivedListener((notification) => {
            console.log('NOTIFICATION RECEIVED');
            console.log(notification);
            const username = notification.request.content.data.username;
            console.log(username);
        });
        let subscription = Notifications.addNotificationResponseReceivedListener((response) => {
            console.log('NOTIFICATION RESPONSE RECEIVED');
            console.log(response);
        });

        return () => {
            subscription1.remove();
            subscription.remove();
        }
    }, []);

    function scheduleNotificationGenerator(data) {
        Notifications.scheduleNotificationAsync({
            content: {
                title: data.title,
                body: data.body,
                data: data.data
            },
            trigger: { seconds: 1 }
        });
    }
    return {
        scheduleNotificationGenerator,
    };
}