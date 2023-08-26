import React, { useState, useEffect, useContext } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import { SymptomData } from '../SymptomData';
import Timeline from 'react-native-timeline-flatlist';
import { View, Text, ActivityIndicator, Image, TouchableOpacity, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import { useRoute } from '@react-navigation/core';
import { COLORS } from '../../../constants/theme';
import SymptomsAPI from '../../../Api/SymptomsApi';
import images from '../../../constants/images';
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../../../theme";
import { Modal, Center, Button, FormControl, Input, VStack, HStack } from "native-base";
import Toast from 'react-native-toast-message';
import { AuthContext } from "../../../Context/AuthContext";

export const SymptomTimeline = () => {

    const route = useRoute();
    const date = route.params?.date || {};
    const {updateKeys} = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);
    const [symptomData, setSymptomData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [symptomBabyID, setSymptomBabyID] = useState(null);
    const [currentTime, setCurrentTime] = useState(null);
    const [currentAddNotes, setCurrentAddNotes] = useState(null);
    const [symptomName, setSymptomName] = useState(null);

    const deleteSymptomBaby = async (symptomBabyID) => {
        await updateKeys();
        let response = await SymptomsAPI().deleteSymptoms(symptomBabyID);
        setShowModal(false);
        if(response === undefined)
        {
            Toast.show({
                type: "error",
                text1: "Error deleting record",
                text2: "There was an error deleting your symptom record. Please try again.",
            })
        } else {
            //Delete the specific object from the symptomData array with the symptomBabyID
            let tempArray = symptomData;
            for(let i = 0; i < tempArray.length; i++){
                if(tempArray[i].symptomBabyID == symptomBabyID){
                    tempArray.splice(i, 1);
                    break;
                }
            }
            setSymptomData(tempArray);  
            Toast.show({
                type: "success",
                text1: "Record deleted",
                text2: "Your symptom record has been deleted successfully",
            })
        }
    }

    useEffect(() => {
        console.log(symptomData);
    }, [symptomData]);

    const HandleEditSymptomBaby = () => {
        const [isTimePickerVisible, setTimePickerVisible] = useState(false);

        const [additionalNotes, setAdditionalNotes] = useState(currentAddNotes);
        const [time, setTime] = useState(currentTime);

        const showTimePicker = () => {
            setTimePickerVisible(true);
        };

        const hideTimePicker = () => {
            setTimePickerVisible(false);
        };

        const handleTimeConfirm = (time) => {
            let inputTime = time.toISOString().slice(11, 16);
            //convert time to digital clock
            let hour = parseInt(inputTime.slice(0, 2));
            let minute = inputTime.slice(3, 5);
            if (hour > 12) {
                hour = hour - 12;
                inputTime = hour.toString() + ":" + minute + " PM";
            }
            else if (hour == 12) {
                inputTime = hour.toString() + ":" + minute + " PM";
            }
            else if (hour == 0) {
                hour = 12;
                inputTime = hour.toString() + ":" + minute + " AM";
            }
            else {
                inputTime = hour.toString() + ":" + minute + " AM";
            }
            console.log(inputTime);
            setTime(inputTime);
            hideTimePicker();
        };

        const updateSymptoms =  async(time, additionalNotes, babyID) => {
            setIsLoading(true);
            const updatedArray = symptomData.map(item => {
                if (item.symptomBabyID === symptomBabyID) {
                    return {
                        ...item,
                        time: time,
                        description: additionalNotes
                    };
                }
                return item;
            });

            setSymptomData(updatedArray);
            await updateKeys();
            let response = await SymptomsAPI().updateSymptoms(
                date, time, additionalNotes, babyID, symptomBabyID, symptomName);
            setEditModal(false);
            setShowModal(false);
            setIsLoading(false);
            if (response === undefined)
                Toast.show({
                    type: "error",
                    text1: "Error updating symptoms",
                    text2: "There was an error updating your symptoms. Please try again.",
                })
            else {
                Toast.show({
                    type: "success",
                    text1: "Symptoms updated",
                    text2: "Your symptoms have been updated successfully",
                })
                console.log(response);
            }
            
        }
        const handleText = (text) => setAdditionalNotes(text);
        return <Center>
            <Modal isOpen={editModal} onClose={() => setEditModal(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Contact Us</Modal.Header>
                    <Modal.Body>
                        <FormControl>
                            <FormControl.Label>Time</FormControl.Label>
                            <Input 
                            onPressIn={showTimePicker}
                            value={time}
                            />
                            <DateTimePickerModal
                                isVisible={isTimePickerVisible}
                                mode="time"
                                onConfirm={handleTimeConfirm}
                                onCancel={hideTimePicker}
                                timeZoneOffsetInMinutes={0}
                            />
                            <FormControl.Label>Additional notes</FormControl.Label>
                            <Input value={additionalNotes} onChangeText={handleText} isRequired={true} />
                        </FormControl>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                                setEditModal(false);
                            }}>
                                Cancel
                            </Button>
                            <Button onPress={() => updateSymptoms(time, additionalNotes, 1)}>
                                Save
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </Center>;
    };


    const ManageSymptom = () => {
        return(
            <Center>
                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header>Manage symptom record</Modal.Header>
                        <Modal.Footer justifyContent={"center"}>
                            <Button.Group space={2}>
                                <Button variant="solid"
                                onPress={() => setEditModal(true)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    onPress={() => deleteSymptomBaby(symptomBabyID)}
                                    colorScheme="danger"
                                >
                                    Delete
                                </Button>
                            </Button.Group>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
            </Center>
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                await updateKeys();
                const symptoms = await SymptomsAPI().getSymptoms(date, 1);
                symptoms.forEach((symptom) => {
                    if (symptom.symptom.symptomID == 1)
                        icon = require("../../../assets/images/BabySymptoms/fever.png");
                    else if (symptom.symptom.symptomID == 2)
                        icon = require("../../../assets/images/BabySymptoms/neutral.png");
                    else if (symptom.symptom.symptomID == 3)
                        icon = require("../../../assets/images/BabySymptoms/generalFussiness.png");
                    else if (symptom.symptom.symptomID == 4)
                        icon = require("../../../assets/images/BabySymptoms/cough.png");
                    else if (symptom.symptom.symptomID == 5)
                        icon = require("../../../assets/images/BabySymptoms/vomiting.png");
                    else if (symptom.symptom.symptomID == 6)
                        icon = require("../../../assets/images/BabySymptoms/lowEnergy.png");
                    else if (symptom.symptom.symptomID == 7)
                        icon = require("../../../assets/images/BabySymptoms/runnyNose.png");
                    else if (symptom.symptom.symptomID == 8)
                        icon = require("../../../assets/images/BabySymptoms/abnormalBreathing.png");
                    else if (symptom.symptom.symptomID == 9)
                        icon = require("../../../assets/images/BabySymptoms/spitup.png");
                    else if (symptom.symptom.symptomID == 10)
                        icon = require("../../../assets/images/BabySymptoms/noAppetite.png");
                    else if (symptom.symptom.symptomID == 11)
                        icon = require("../../../assets/images/BabySymptoms/rash.png");
                    setSymptomData((prevSymptomData) => [...prevSymptomData, {
                        time: symptom.time,
                        title: symptom.symptom.name,
                        description: symptom.additionalNotes,
                        icon: icon,
                        symptomBabyID: symptom.symptomBabyID
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
                            symptomData.length == 0 ?
                                <SafeAreaView>
                                    <View className={"justify-center align-middle"} style={{ flex: 1 }}>
                                        <Image
                                            source={images.NoSymptomsFound}
                                            resizeMode="contain"
                                            className={"w-72 h-72 mx-auto"}
                                            style={{ flex: 2 }}
                                        />
                                        <Text
                                            className={"text-center font-bold my-5 text-xl"}
                                            style={{ flex: 1 }}
                                        >
                                            No symptoms recorded
                                        </Text>
                                    </View >
                                </SafeAreaView>
                                :
                                <SafeAreaView>
                                    <ScrollView className={"h-3/4"}
                                        style={{
                                            backgroundColor: "#fff",
                                            shadowColor: '#000',
                                            elevation: 20,
                                            borderRadius: 10,
                                            marginHorizontal: 20
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
                                                Symptom Timeline
                                            </Text>
                                            <Text
                                                className={"text-center font-bold text-sm my-5"}
                                            >
                                                {date}
                                            </Text>
                                            <Timeline
                                                data={symptomData}
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
                                                onEventPress={(event) => {
                                                    setSymptomBabyID(event.symptomBabyID);
                                                    setCurrentAddNotes(event.description);
                                                    setCurrentTime(event.time);
                                                    setSymptomName(event.title);
                                                    setShowModal(true);
                                                }}
                                                columnFormat='two-column'
                                                descriptionStyle={{
                                                    color: 'gray',
                                                    fontSize: 12,
                                                }}
                                                titleStyle={{
                                                    color: '#fff',
                                                    fontWeight: 'bold',
                                                    bottom: 5,
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
            <ManageSymptom />
            <HandleEditSymptomBaby />
        </>
    )
}