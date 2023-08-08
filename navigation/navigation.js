import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {StartScreen} from "../screens/StartScreen";
import {HomeScreen} from "../screens/HomeScreen";
import {BabyScreen} from "../screens/BabyScreen";
import { Reminders } from '../screens/Reminders';
import { ReminderDetails } from '../screens/ReminderDetails';
import { RemindersList } from '../screens/RemindersList';
import React from 'react';
import {GrowthDetailsScreen} from "../screens/GrowthDetailsScreen";
import GrowhtManageScreen from "../screens/GrowthDetailsScreens/GrowhtManageScreen";
import {GrowthChartScreen} from "../screens/GrowthDetailsScreens/GrowthChartScreen";

import {ExpenseScreen} from "../screens/ExpenseScreen";
import ExpenseForm from "../components/Expense/ExpenseForm";
import ExpenseTabs from "../components/Expense/ExpenseTabs";
import ExpenseBarGraph from "../components/Expense/ExpenseBarGraph";


const Stack = createNativeStackNavigator();
export function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name="Start" component={StartScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Baby" component={BabyScreen} />


                <Stack.Screen name="RemindersList" component={RemindersList}/>
                <Stack.Screen name="Reminders" component={Reminders}/>
                <Stack.Screen name="ReminderDetails" component={ReminderDetails}/>

                {/* Growth feature screens */}
                <Stack.Screen name="GrowthDetails" component={GrowthDetailsScreen} />
                <Stack.Screen name="GrowhtManage" component={GrowhtManageScreen} />

                <Stack.Screen name="GrowthChart" component={GrowthChartScreen} />

                <Stack.Screen name="Expense" component={ExpenseScreen} />
                <Stack.Screen name="ExpenseTab" component= {ExpenseTabs} />
                <Stack.Screen name="ExpenseForm" component={ExpenseForm} />
                <Stack.Screen name="ExpenseChart" component={ExpenseBarGraph} />

                <Stack.Screen name="Sleeping" component={SleepScreen} />
                <Stack.Screen name="Time" component={TimeScreen} />
                <Stack.Screen name="SleepTimeline" component={SleepTimelineScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
