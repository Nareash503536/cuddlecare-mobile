import { SymptomSet } from "./SymptomSet";
import images from "../../../constants/images";
import { FlatList, Image, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { ButtonStyles } from "../ButtonStyle";
import React, { useState, useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { Modal, Center, Button, FormControl, Input, VStack, HStack } from "native-base";
import SymptomsAPI from "../../../Api/SymptomsApi";
import { AuthContext } from "../../../Context/AuthContext";
import Toast from 'react-native-toast-message';
import { SymptomListContext } from "../../../screens/Symptom/SymptomList";

export default function SymptomContainer() {

    const [symptomArray, setSymptomArray] = useState(Array(11).fill(false));
    const [showModal, setShowModal] = useState(false);
    const { updateKeys } = useContext(AuthContext);
    const { setLoading } = useContext(SymptomListContext);
 
 
    const saveSymptoms = async(date, time, additionalNotes, babyID) => {
        //check if all symptomArray elements are still false
        let allFalse = true;
        for(let i = 0; i < symptomArray.length; i++){
            if(symptomArray[i] === true){
                allFalse = false;
                break;
            }
        }
        if(allFalse){
            Toast.show({
                type: "error",
                text1: "No symptoms selected",
                text2: "Please select at least one symptom",
            })
            return;
        }
        setLoading(true);
        await updateKeys();
        let response = await SymptomsAPI().addSymptoms(
            date, time, additionalNotes, symptomArray, babyID);
        if(response === undefined)
            Toast.show({
                type: "error",
                text1: "Error saving symptoms",
                text2: "There was an error saving your symptoms. Please try again.",
            })
        else{
            Toast.show({
                type: "success",
                text1: "Symptoms saved",
                text2: "Your symptoms have been saved successfully",
            })
            console.log(response);
        }
        setShowModal(false);
        setSymptomArray(Array(11).fill(false));
        setLoading(false);
    }

    const Example = () => {
        const [additionalNotes, setAdditionalNotes] = useState("");
        const date = new Date();
        let inputTime = date.toISOString().slice(11, 16);
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

        let inputDate = date.toISOString().slice(0, 10);

        const handleText = (text) => setAdditionalNotes(text);

        return <Center>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Contact Us</Modal.Header>
                    <Modal.Body>
                        <VStack space={2}>
                            <HStack alignItems="center" justifyContent="space-between">
                                <Text fontWeight="medium">Date of check</Text>
                                <Text color="blueGray.400">{inputDate}</Text>
                            </HStack>
                            <HStack alignItems="center" justifyContent="space-between">
                                <Text fontWeight="medium">Time of check</Text>
                                <Text color="blueGray.400">{inputTime}</Text>
                            </HStack>
                        </VStack>
                        <FormControl>
                            <FormControl.Label>Additional notes</FormControl.Label>
                            <Input value={additionalNotes} onChangeText={handleText}/>
                        </FormControl>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                                setShowModal(false);
                            }}>
                                Cancel
                            </Button>
                            <Button 
                                onPress={() => saveSymptoms(inputDate, inputTime, additionalNotes, 1)}
                            >
                                Save
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </Center>;
    };

    const checkSelectItem = (id) => {
        if (!symptomArray[id - 1])
            setSymptomArray((prevSymptoms) => [
                ...prevSymptoms.slice(0, id - 1),
                true,
                ...prevSymptoms.slice(id),
            ]);
        else
            setSymptomArray((prevSymptoms) => [
                ...prevSymptoms.slice(0, id - 1),
                false,
                ...prevSymptoms.slice(id),
            ]);
    }

    const Navigation = useNavigation();

    return (
        <ScrollView
            className={"flex m-5 p-5"}
            style={{
                backgroundColor: "#fff",
                shadowColor: '#000',
                elevation: 20,
                borderRadius: 10,
            }}
            showsHorizontalScrollIndicator={true}
        >
            <Text className={"text-center font-bold text-base"}>
                How is your baby feeling?
            </Text>
            <FlatList
                data={SymptomSet}
                persistentScrollbar={true}

                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={true}


                renderItem={({ item }) => (
                    <ScrollView
                        className={"p-1 m-1 w-28 h-36"}
                        style={{
                            borderRadius: 10,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => checkSelectItem(item.id)}
                        >
                            <Image
                                source={images[item.image]}
                                className={"w-20 h-20 mx-auto"}
                            />
                            <Text className="text-center">
                                {item.name}
                            </Text>
                            {
                                symptomArray[item.id - 1] ?
                                    <Image
                                        source={images.accept}
                                        className={"w-5 h-5 mx-auto absolute"}
                                    />
                                    : null
                            }
                        </TouchableOpacity>
                    </ScrollView>
                )}

                horizontal={true}
            />
            <TouchableOpacity
                className={"flex-row mt-8"}
                style={ButtonStyles.Button}
                name="Save"
                onPress={() => setShowModal(true)}
            >
                <Text className="text-white font-extrabold text-lg">
                    Save
                </Text>
            </TouchableOpacity>
            <Example/>
        </ScrollView>
    )
}