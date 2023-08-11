import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {StartScreen} from "../screens/StartScreen";
import {HomeScreen} from "../screens/HomeScreen";
import {BabyScreen} from "../screens/BabyScreen";
import { Reminders } from '../screens/Reminders';
import { ReminderDetails } from '../screens/ReminderDetails';
import { RemindersList } from '../screens/RemindersList';
import React from 'react';
import {GrowthDetailsScreen} from "../screens/GrowthDetailsScreen";
import GrowhtManageScreen from "../screens/GrowthDetailsScreens/GrowhtManageScreen";
import{FeedingScreen} from "../screens/FeedingScreen";

import {SleepScreen} from "../screens/SleepScreen";
import {TimeScreen} from "../screens/TimeScreen";
import {SleepTimelineScreen} from "../screens/SleepTimelineScreen";
import {SleepBarChart} from "../screens/SleepBarChart";

import {DiaperScreen} from "../screens/DiaperScreen";

import {ExpenseScreen} from "../screens/ExpenseScreen";
import ExpenseForm from "../components/Expense/ExpenseForm";
import ExpenseTabs from "../components/Expense/ExpenseTabs";
import ExpenseBarGraph from "../components/Expense/ExpenseBarGraph";
import GrowthChartScreen from "../screens/GrowthDetailsScreens/GrowthChartScreen";
import {CommunityScreen} from "../screens/CommunityScreen";
import {themeColors} from "../theme";
import {CalendarDaysIcon, HomeIcon} from "react-native-heroicons/outline";
import {StyleSheet, View} from "react-native";
import {BreastFeeding} from "../components/Feeding/BreastFeeding";
import {SolidFood} from "../components/Feeding/SolidFood";

import {SymptomList} from "../screens/Symptom/SymptomList";
import SymptomAdd from "../screens/Symptom/SymptomAdd";

const BottomTabs = createBottomTabNavigator();

function AppOverview() {
    return (
        <BottomTabs.Navigator screenOptions={{
            headerShown:false,
            tabBarShowLabel:false,
            tabBarStyle:{height:60,position:'absolute',bottom:10,borderRadius:90,marginHorizontal:5}}} >

            <Stack.Screen name="Baby" component={BabyScreen}
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({focused}) => (
                    <View className={"rounded-full p-2"} style={{backgroundColor:focused? themeColors.colornormal:"white"}}>
                        {focused? <HomeIcon size="27" color="white" />: <HomeIcon size="27" color="gray" />}
                    </View>
                ),
            }} />

            <Stack.Screen name="Community" component={CommunityScreen} options={{
                  tabBarLabel: 'Community',
                  tabBarIcon: ({focused}) => (
                      <View className={"rounded-full p-2"} style={{backgroundColor:focused? themeColors.colornormal:"white"}}>
                          {focused? <CalendarDaysIcon size="27" color="white" />: <CalendarDaysIcon size="27" color="gray" />}
                      </View>
                  ),}}/>
        </BottomTabs.Navigator>
    );
}

const Stack = createNativeStackNavigator();
export function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}}>
                {/*<Stack.Screen name="Start" component={StartScreen} />*/}
                {/*<Stack.Screen name="Home" component={HomeScreen} />*/}
                <Stack.Screen name="AppOverview" component={AppOverview} />


                {/*<Stack.Screen name="RemindersList" component={RemindersList}/>*/}
                {/*<Stack.Screen name="Reminders" component={Reminders}/>*/}
                {/*<Stack.Screen name="ReminderDetails" component={ReminderDetails}/>*/}

                {/* Growth feature screens */}
                <Stack.Screen name="GrowthDetails" component={GrowthDetailsScreen} />
                <Stack.Screen name="GrowhtManage" component={GrowhtManageScreen} />

                <Stack.Screen name="GrowthChart" component={GrowthChartScreen} />
                <Stack.Screen name="Feeding" component={FeedingScreen} />

                <Stack.Screen name="Expense" component={ExpenseScreen} />
                {/*<Stack.Screen name="ExpenseTab" component= {ExpenseTabs} />*/}
                <Stack.Screen name="ExpenseForm" component={ExpenseForm} />
                <Stack.Screen name="ExpenseChart" component={ExpenseBarGraph} />
                <Stack.Screen name="SymptomList" component={SymptomList} />
                <Stack.Screen name="SymptomAdd" component={SymptomAdd} />


                <Stack.Screen name="Sleeping" component={SleepScreen} />
                <Stack.Screen name="Time" component={TimeScreen} />
                <Stack.Screen name="SleepTimeline" component={SleepTimelineScreen} />
                <Stack.Screen name="SleepChart" component={SleepBarChart}/>

                <Stack.Screen name="DiaperScreen" component={DiaperScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
