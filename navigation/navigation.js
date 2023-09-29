import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StartScreen } from "../screens/StartScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { BabyScreen } from "../screens/BabyScreen";
import { Reminders } from '../screens/Reminders';
import { ReminderDetails } from '../screens/ReminderDetails';
import { RemindersList } from '../screens/RemindersList';
import React, {useContext} from 'react';
import { GrowthDetailsScreen } from "../screens/GrowthDetailsScreen";
import GrowhtManageScreen from "../screens/GrowthDetailsScreens/GrowhtManageScreen";
import { FeedingScreen } from "../screens/FeedingScreen";

import {SleepBarChart} from "../screens/SleepBarChart";

import {DiaperScreen} from "../screens/DiaperScreen";

import {SleepScreen} from "../screens/SleepScreen";
import {TimeScreen} from "../screens/TimeScreen";
import {SleepTimelineScreen} from "../screens/SleepTimelineScreen";

import {ExpenseScreen} from "../screens/ExpenseScreen";
import ExpenseForm from "../components/Expense/ExpenseForm";
import ExpenseTabs from "../components/Expense/ExpenseTabs";
import ExpenseBarGraph from "../components/Expense/ExpenseBarGraph";
import GrowthChartScreen from "../screens/GrowthDetailsScreens/GrowthChartScreen";
import {CommunityScreen} from "../screens/CommunityScreen";
import {themeColors} from "../theme";
import { CalendarDaysIcon, HomeIcon, UserCircleIcon, HeartIcon } from "react-native-heroicons/outline";
import {StyleSheet, View} from "react-native";
import {BreastFeeding} from "../components/Feeding/BreastFeeding";
import {SolidFood} from "../components/Feeding/SolidFood";

import MilestonesScreen from "../screens/MilestonesScreen";
import MilestonesListScreen from "../screens/MilestonesScreens/MilestonesListScreen";
import MilestoneManageScreen from "../screens/MilestonesScreens/MilestoneManageScreen";
import SolidFoodsHeader from "../components/Feeding/SolidFoodsListScreen/SolidFoodsHeader";

import SymptomTimelineScreen from  "../screens/Symptom/SymptomTimelineScreen";
import { SymptomList } from "../screens/Symptom/SymptomList";
import SymptomAdd from "../screens/Symptom/SymptomAdd";
import { AuthContext } from '../Context/AuthContext';

import Profile from "../screens/UserProfile/Profile";
import EditProfile from "../screens/UserProfile/EditProfile";
import ManageCaregiver from "../screens/UserProfile/ManageCaregiver";
import ManageBaby from "../screens/UserProfile/ManageBaby";
import AddBabyScreen from "../screens/UserProfile/AddBabyScreen";

import AcceptRequestScreen from "../screens/CaregiverRequests/AcceptRequestScreen";
import SendRequestScreen from "../screens/CaregiverRequests/SendRequestScreen";

import {DiaperTimelineScreen} from "../screens/DiaperTimelineScreen";
import {DiaperBarChart} from "../screens/DiaperBarChart";


const BottomTabs = createBottomTabNavigator();

function AppOverview() {

    const {user} = useContext(AuthContext);
    console.log(user);

    return (
        <BottomTabs.Navigator screenOptions={{
            headerShown:false,
            tabBarShowLabel:false,
            tabBarStyle:{height:50,position:"absolute",bottom:-2,borderTopRightRadius:20,borderTopLeftRadius:20}}} >

            <Stack.Screen name="Baby" component={BabyScreen}
                          options={{
                              tabBarLabel: 'Home',
                              tabBarIcon: ({focused}) => (
                                  <View className={"rounded-full p-2"} style={{backgroundColor:focused? themeColors.colornormal:"white"}}>
                                      {focused? <HomeIcon size="22" color="white" />: <HomeIcon size="22" color="gray" />}
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

            {user.relationship === "caregiver"
                ? <Stack.Screen name="AcceptRequestScreen" component={AcceptRequestScreen} options={{
                    tabBarLabel: 'Caregiver Requests',
                    tabBarIcon: ({focused}) => (
                        <View className={"rounded-full p-2"} style={{backgroundColor:focused? themeColors.colornormal:"white"}}>
                            {focused? <HeartIcon size="27" color="white" />: <HeartIcon size="27" color="gray" />}
                        </View>
                    ),}}/>
                : <Stack.Screen name="SendRequestScreen" component={SendRequestScreen} options={{
                    tabBarLabel: 'Caregiver Requests',
                    tabBarIcon: ({focused}) => (
                        <View className={"rounded-full p-2"} style={{backgroundColor:focused? themeColors.colornormal:"white"}}>
                            {focused? <HeartIcon size="27" color="white" />: <HeartIcon size="27" color="gray" />}
                        </View>
                    ),}}/>
            }
                
            <Stack.Screen name="Profile" component={Profile} options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ focused }) => (
                    <View className={"rounded-full p-2"} style={{ backgroundColor: focused ? themeColors.colornormal : "white" }}>
                        {focused ? <UserCircleIcon size="27" color="white" /> : <UserCircleIcon size="27" color="gray" />}
                    </View>
                ),
            }} />
        </BottomTabs.Navigator>
    );
}

const Stack = createNativeStackNavigator();
export function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name="Start" component={StartScreen} />
                {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
                <Stack.Screen name="AppOverview" component={AppOverview} />

                <Stack.Screen name="RemindersList" component={RemindersList}/>
                <Stack.Screen name="Reminders" component={Reminders}/>
                <Stack.Screen name="ReminderDetails" component={ReminderDetails}/>

                {/* Growth feature screens */}
                <Stack.Screen name="GrowthDetails" component={GrowthDetailsScreen} />
                <Stack.Screen name="GrowhtManage" component={GrowhtManageScreen} />

                <Stack.Screen name="GrowthChart" component={GrowthChartScreen} />
                <Stack.Screen name="Feeding" component={FeedingScreen} />
                <Stack.Screen name="SolidFoodTab" component={SolidFoodsHeader} />
                {/* Growth feature screens */}
                <Stack.Screen name="Milestones" component={MilestonesScreen} />
                <Stack.Screen name="MilestonesList" component={MilestonesListScreen} />
                <Stack.Screen name="MilestoneManage" component={MilestoneManageScreen} />

                <Stack.Screen name="Expense" component={ExpenseScreen} />
                <Stack.Screen name="ExpenseTab" component= {ExpenseTabs} />
                <Stack.Screen name="ExpenseForm" component={ExpenseForm} />
                <Stack.Screen name="ExpenseChart" component={ExpenseBarGraph} />

                <Stack.Screen name="SymptomList" component={SymptomList} />
                <Stack.Screen name="SymptomAdd" component={SymptomAdd} />

                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="EditProfile" component={EditProfile} />
                <Stack.Screen name="ManageCaregiver" component={ManageCaregiver} />
                <Stack.Screen name="ManageBaby" component={ManageBaby} />

                <Stack.Screen name="Sleeping" component={SleepScreen} />
                <Stack.Screen name="Time" component={TimeScreen} />
                <Stack.Screen name="SleepTimeline" component={SleepTimelineScreen} />
                <Stack.Screen name="SleepChart" component={SleepBarChart}/>

                <Stack.Screen name="DiaperScreen" component={DiaperScreen} />
                <Stack.Screen name="DiaperTimeline" component={DiaperTimelineScreen} />
                <Stack.Screen name="DiaperBarChart" component={DiaperBarChart} />

                <Stack.Screen name="SymptomTimelineScreen" component={SymptomTimelineScreen} />
                <Stack.Screen name="AddBabyScreen" component={AddBabyScreen} />

                <Stack.Screen name="AcceptRequestScreen" component={AcceptRequestScreen} />
                <Stack.Screen name="SendRequestScreen" component={SendRequestScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
