import React, {useContext, useState, useEffect} from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import {
    VictoryScatter,
    VictoryChart,
    VictoryTheme,
    VictoryZoomContainer,
    VictoryLabel,
    VictoryAxis,
    VictoryPolarAxis
} from 'victory-native';
import { AuthContext } from '../../../Context/AuthContext';
import SymptomsAPI from '../../../Api/SymptomsApi';
import { COLORS } from '../../../constants/theme';
import { useRoute } from '@react-navigation/core';

export const SymptomPlot = () => {

    const { updateKeys, baby } = useContext(AuthContext);
    const [symptomData, setSymptomData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const route = useRoute();
    const date = route.params?.date || {};

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                await updateKeys();
                const symptoms = await SymptomsAPI().getSymptoms(date, baby.babyID);
                symptoms.forEach((symptom) => {
                    //Symptom time is in 1.23 PM format in string convert it into 24 hr number format in decimal
                    let time = symptom.time;
                    let hours = Number(time.match(/^(\d+)/)[1]);
                    let minutes = Number(time.match(/:(\d+)/)[1]);
                    let AMPM = time.match(/\s(.*)$/)[1];
                    if (AMPM === "PM" && hours < 12) hours = hours + 12;
                    if (AMPM === "AM" && hours === 12) hours = hours - 12;
                    let sHours = hours.toString();
                    let sMinutes = minutes.toString();
                    if (hours < 10) sHours = "0" + sHours;
                    if (minutes < 10) sMinutes = "0" + sMinutes;
                    let timeIn24hr = Number(sHours + "." + sMinutes);
                    symptom.time = timeIn24hr;

                    if (symptom.symptom.name === "No negative symptoms")
                        symptom.symptom.id = 1;
                    else if (symptom.symptom.name === "General Fussiness")
                        symptom.symptom.id = 2;
                    else if (symptom.symptom.name === "Rash")
                        symptom.symptom.id = 3;
                    else if (symptom.symptom.name === "Cough")
                        symptom.symptom.id = 4;
                    else if (symptom.symptom.name === "Vomiting")
                        symptom.symptom.id = 5;
                    else if (symptom.symptom.name === "Low energy")
                        symptom.symptom.id = 6;
                    else if (symptom.symptom.name === "Runny nose")
                        symptom.symptom.id = 7;
                    else if (symptom.symptom.name === "No appetite")    
                        symptom.symptom.id = 8;
                    else if (symptom.symptom.name === "Fever")
                        symptom.symptom.id = 9;
                    else if (symptom.symptom.name === "Abnormal breathing") 
                        symptom.symptom.id = 10;
                    else if (symptom.symptom.name === "Spit-up")
                        symptom.symptom.id = 11;

                    setSymptomData((prevSymptomData) => [...prevSymptomData, {
                        x: symptom.symptom.id,
                        y: symptom.time
                    }]);
                });
            } catch (error) {
                console.error("Error fetching Symptoms: ", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        console.log(symptomData);
    }, [symptomData]);

    return (
        <>
            {
                isLoading ?
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }
                    } >
                        {/* <LottieView source={animation.Spinner} autoPlay loop /> */}
                        < ActivityIndicator size="large" color={COLORS.primary} />
                    </View > : 
                    <View
                        style={{
                            backgroundColor: "#fff",
                            shadowColor: '#000',
                            elevation: 20,
                            borderRadius: 10,
                            marginHorizontal: 20,
                            marginBottom: 20,
                        }}>
                        <Text
                            className={"text-center font-bold text-base my-1"}
                        >
                            Symptom Chart
                        </Text>
                        <VictoryChart
                            theme={VictoryTheme.material}
                            animate={{
                                duration: 2000,
                                onLoad: { duration: 1000 }
                            }}
                        // containerComponent={< VictoryZoomContainer zoomDomain={{ x: [5, 35], y: [0, 100] }} />}
                        // zoomDomain={{ x: [5, 35], y: [0, 100] }}

                        >
                            <VictoryAxis
                                style={{ tickLabels: { angle: -60 } }}

                                tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
                                tickFormat={[
                                    "No negative\nsymptoms",
                                    "General\nFussiness",
                                    "Rash",
                                    "Cough",
                                    "Vomiting",
                                    "Low energy",
                                    "Runny nose",
                                    "No appetite",
                                    "Fever",
                                    "Abnormal\nbreathing",
                                    "Spit-up"]} />
                            <VictoryAxis dependentAxis
                                tickValues={[0, 4, 8, 12, 16, 20, 24]}
                                tickFormat={[
                                    "12 AM",
                                    "4 AM",
                                    "8 AM",
                                    "12 PM",
                                    "4 PM",
                                    "8 PM",
                                    "12 AM"
                                ]}
                            />

                            <VictoryScatter
                                style={{ data: { fill: "#477276" } }}
                                size={5}
                                data={symptomData}
                            />
                        </VictoryChart>
                    </View>
            }
        </>
        
    )
}