import ToggleSwitch from 'toggle-switch-react-native'
import images from '../../constants/images';
import React, { useState, useContext } from 'react';
import { View, Text, Image } from 'react-native';
import { AuthContext } from '../../Context/AuthContext';
import { VaccineContext } from '../../screens/Vaccination/VaccinationDashboard';

const VaccinationContainer = ({ name, category, months, givenStatus, listType}) => {

    const { baby } = useContext(AuthContext);
    const [isToggle, setToggle] = useState(givenStatus);
    const { 
        vaccinationsGiven, 
        vaccinationsMissed, 
        setVaccinationsMissed, 
        setVaccinationsGiven,
        vaccinationsUpcoming,
        setVaccinationsUpcoming
    } = useContext(VaccineContext);

    let dob = new Date(baby.dob);
    dob.setMonth(dob.getMonth() + months);
    let year = dob.getFullYear();
    let month = (dob.getMonth() + 1).toString().padStart(2, '0'); // Adjust for zero-based months
    let day = dob.getDate().toString().padStart(2, '0');
    let vaccineDate = dob.toISOString().slice(0, 10);
    return (
        <View className="flex-row justify-between p-3">
            <View className="flex-1">
                <Text className="text-base">{name}</Text>
                <View className="flex-row">
                    <Image source={images.injection} className={"w-4 h-4 my-auto mx-2"} />
                    <Text className="text-xs break-words" style={{ color: "grey" }}>{category}</Text>
                </View>
                <View className="flex-row">
                    <Image source={images.MissedCalendar} className={"w-4 h-4 my-auto mx-2"} />
                    <Text className="text-xs break-words" style={{ color: "grey" }}>
                        {vaccineDate}
                    </Text>
                </View>
            </View>
            <ToggleSwitch
                isOn={isToggle}
                // onColor="green"
                offColor="red"
                label= {isToggle ? `Given` : `Not Given`} 
                labelStyle={{ color: "black", fontWeight: "900" }}
                size="small"
                onToggle={
                    () => {
                        //If isToggle true => going to be false
                        if(isToggle) {
                            if(new Date() > dob) {
                                //Move to missed from given
                                console.log("Move to missed from given")
                                setVaccinationsGiven(vaccinationsGiven.filter((vaccination) => vaccination.name !== name))
                                setVaccinationsMissed([...vaccinationsMissed, {name, category, months}])
                            } else{
                                //Move to upcoming from given
                                console.log("Move to upcoming from given")
                                setVaccinationsGiven(vaccinationsGiven.filter((vaccination) => vaccination.name !== name))
                                setVaccinationsUpcoming([...vaccinationsUpcoming, {name, category, months}])
                            }
                        } else {
                            if(listType === "missed") {
                                //Move to given from missed
                                console.log("Move to given from missed")
                                setVaccinationsMissed(vaccinationsMissed.filter((vaccination) => vaccination.name !== name))
                                setVaccinationsGiven([...vaccinationsGiven, {name, category, months}])
                            } else if (listType === "upcoming") {
                                //Move to given from upcoming
                                console.log("Move to given from upcoming")
                                setVaccinationsGiven([...vaccinationsGiven, {name, category, months}])
                                setVaccinationsUpcoming(vaccinationsUpcoming.filter((vaccination) => vaccination.name !== name))
                            }
                        }
                        setToggle(!isToggle);
                    }}
            />
        </View>
    )
}

export default VaccinationContainer;