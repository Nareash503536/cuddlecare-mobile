import React, { createContext, useState, useEffect, useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import UpcomingVaccines from '../../components/Vaccination/UpcomingVaccines';
import GivenVaccines from '../../components/Vaccination/GivenVaccines';
import MissedVaccines from '../../components/Vaccination/MissedVaccines';
import VaccinationHeader from '../../components/Vaccination/VaccinationHeader';
import BabyDetails from '../../components/Vaccination/BabyDetails';
import { COLORS } from '../../constants/theme';
import VaccinationAPI from '../../Api/VaccinationAPI';
import { AuthContext } from '../../Context/AuthContext';

const Tab = createMaterialTopTabNavigator();

export const VaccineContext = createContext();

export default function VaccinationDashboard() {

    const { updateKeys, baby } = useContext(AuthContext);
    const [vaccinationSet, setVaccinationSet] = useState([]);
    const [vaccinationsGiven, setVaccinationsGiven] = useState([]);
    const [vaccinationsMissed, setVaccinationsMissed] = useState([]);
    const [vaccinationsUpcoming, setVaccinationsUpcoming] = useState([]);
    const [loading, isloading] = useState(false)

    useEffect(() => {
        async function getVaccineData() {
            isloading(true);
            await updateKeys();
            let vaccinationSetCall = await VaccinationAPI().getAllVaccinations();
            setVaccinationSet(vaccinationSetCall);
            let vaccinationGivenSetCall = await VaccinationAPI().getVaccinationByBabyID(baby.babyID);
            vaccinationSetCall.sort((a, b) => {
                return a.months - b.months;
            });
            setVaccinationsGiven(vaccinationGivenSetCall);
            vaccinationGivenSetCall.sort((a, b) => {
                return a.months - b.months;
            });
            let vaccinationMissedSet = vaccinationSetCall.filter((vaccination) => {
                return vaccinationGivenSetCall.findIndex((vaccinationGiven) => {
                    return vaccinationGiven.vaccinationID === vaccination.vaccinationID;
                }) === -1 && vaccination.months <= Math.floor((new Date() - new Date(baby.dob)) / 1000 / 60 / 60 / 24 / 30);
            });
            vaccinationMissedSet.sort((a, b) => {
                return a.months - b.months;
            });
            setVaccinationsMissed(vaccinationMissedSet);
            let vaccinationUpcomingSet = vaccinationSetCall.filter((vaccination) => {
                return vaccinationGivenSetCall.findIndex((vaccinationGiven) => {
                    return vaccinationGiven.vaccinationID === vaccination.vaccinationID;
                }) === -1 && vaccination.months > Math.floor((new Date() - new Date(baby.dob)) / 1000 / 60 / 60 / 24 / 30);
            });
            vaccinationUpcomingSet.sort((a, b) => {
                return a.months - b.months;
            });
            setVaccinationsUpcoming(vaccinationUpcomingSet);
            isloading(false);
        }
        getVaccineData();
    }, []);


    return (
        <VaccineContext.Provider value={{
            vaccinationSet,
            vaccinationsGiven,
            vaccinationsMissed,
            vaccinationsUpcoming,
            setVaccinationSet,
            setVaccinationsGiven,
            setVaccinationsMissed,
            setVaccinationsUpcoming,
            loading,
            isloading
        }}>
            <SafeAreaView className={"flex-1 relative"}>
                <VaccinationHeader />
                <BabyDetails />
                <Tab.Navigator
                    initialRouteName="Feeding"
                    screenOptions={
                        {
                            "tabBarActiveTintColor": "white",
                            "tabBarInactiveTintColor": "gray",
                            "tabBarLabelStyle": {
                                "fontSize": 12
                            },
                            "tabBarIndicatorStyle": {
                                "backgroundColor": COLORS.primary,
                                "height": 48,
                                "borderRadius": 20,

                            },
                            "tabBarStyle": {
                                "backgroundColor": "white",

                                "marginTop": 20,
                                "borderRadius": 20,
                                "marginRight": 20,
                                "marginLeft": 20
                            }
                        }
                    }
                >
                    <Tab.Screen name="Missed" component={MissedVaccines} options={{ tabBarLabel: "Missed" }} />
                    <Tab.Screen name="Vaccinated" component={GivenVaccines} options={{ tabBarLabel: "Vaccinated" }} />
                    <Tab.Screen name="Upcoming" component={UpcomingVaccines} options={{ tabBarLabel: "Upcoming" }} />
                </Tab.Navigator>
            </SafeAreaView>
        </VaccineContext.Provider>
    )
}