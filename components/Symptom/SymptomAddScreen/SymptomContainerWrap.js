import { SymptomSet } from "./SymptomSet";
import images from "../../../constants/images";
import { FlatList, Image, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { ButtonStyles } from "../ButtonStyle";
import React, { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/core";
import { Modal, Center, Button, FormControl, Input, VStack, HStack } from "native-base";
import { symptomContext } from "../../../screens/Symptom/SymptomAdd";
import SymptomsAPI from "../../../Api/SymptomsApi";
import { AuthContext } from "../../../Context/AuthContext";
import Toast from 'react-native-toast-message';


export default function SymptomContainer() {

    const [symptomArray, setSymptomArray] = useState(Array(11).fill(false))
    const [showModal, setShowModal] = useState(false);
    const { updateKeys } = useContext(AuthContext);
    const navigation = useNavigation();

    const {
        startTime,
        setStartTime,
        startDate,
        setStartDate,
        setIsLoading
    } = useContext(symptomContext);

    const handleSaveSymptom = () => {
        setShowModal(true);
    }

    const saveSymptoms = async (date, time, additionalNotes, babyID) => {
        let allFalse = true;
        for (let i = 0; i < symptomArray.length; i++) {
            if (symptomArray[i] === true) {
                allFalse = false;
                break;
            }
        }
        if (allFalse) {
            Toast.show({
                type: "error",
                text1: "No symptoms selected",
                text2: "Please select at least one symptom",
            })
            return;
        }
        //Only allow past srilankan time
        let now = new Date();
        let nowSriLankan = new Date(now.getTime() + (330 * 60 * 1000));
        let nowSriLankanString = nowSriLankan.toISOString();
        let nowSriLankanDate = nowSriLankanString.split("T")[0];
        let nowSriLankanTime = nowSriLankanString.split("T")[1].split(".")[0];
        if (date > nowSriLankanDate || (date === nowSriLankanDate && time > nowSriLankanTime)) {
            Toast.show({
                type: "error",
                text1: "Invalid date/time",
                text2: "Future date/time is not allowed. Please select a past date/time.",
            })
            return;
        }
        setIsLoading(true);
        await updateKeys();
        let response = await SymptomsAPI().addSymptoms(
            date, time, additionalNotes, symptomArray, babyID);
        if (response === undefined)
            Toast.show({
                type: "error",
                text1: "Error saving symptoms",
                text2: "There was an error saving your symptoms. Please try again.",
            })
        else {
            Toast.show({
                type: "success",
                text1: "Symptoms saved",
                text2: "Your symptoms have been saved successfully",
            })
            console.log(response);
        }
        setShowModal(false);
        setSymptomArray(Array(11).fill(false));
        setIsLoading(false);
        setStartDate("");
        setStartTime("");
    }

    const Example = () => {
        const [additionalNotes, setAdditionalNotes] = useState("");
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
                                <Text color="blueGray.400">{startDate}</Text>
                            </HStack>
                            <HStack alignItems="center" justifyContent="space-between">
                                <Text fontWeight="medium">Time of check</Text>
                                <Text color="blueGray.400">{startTime}</Text>
                            </HStack>
                        </VStack>
                        <FormControl>
                            <FormControl.Label>Additional notes</FormControl.Label>
                            <Input value={additionalNotes} onChangeText={handleText} isRequired={true}/>
                        </FormControl>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                                setShowModal(false);
                            }}>
                                Cancel
                            </Button>
                            <Button onPress={() => saveSymptoms(startDate, startTime, additionalNotes, 1) }>
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

    const Navigation = useNavigation()

    return (
        <>
            <FlatList
                data={SymptomSet}
                persistentScrollbar={true}

                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={true}


                renderItem={({ item }) => (
                    <View
                        className={"p-1 mx-4 w-14 h-36 flex-wrap"}
                        style={{
                            borderRadius: 10
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => checkSelectItem(item.id)}
                        >
                            <Image
                                source={images[item.image]}
                                className={"w-16 h-16 mx-auto"}
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
                    </View>
                )}

                numColumns={4}
            />
            <TouchableOpacity
                className={"flex-row mt-8"}
                style={ButtonStyles.Button}
                name="Save"
                onPress={() => handleSaveSymptom()}
                disabled={
                    startDate === "" ||
                    startTime === "" ? true : false
                }
            >
                <Text className="text-white font-extrabold text-lg" style={{ color: "#fff" }}>
                    Save
                </Text>
            </TouchableOpacity>
            <Example/>
        </>
    )
}