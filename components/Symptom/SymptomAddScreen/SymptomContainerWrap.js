import { SymptomSet } from "./SymptomSet";
import images from "../../../constants/images";
import { FlatList, Image, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { ButtonStyles } from "../ButtonStyle";
import React, { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/core";
import { Modal, Center, Button, FormControl, Input, VStack, HStack } from "native-base";
import { symptomContext } from "../../../screens/Symptom/SymptomAdd";
import { SymptomData } from "../SymptomData";
import Timeline from 'react-native-timeline-flatlist'

export default function SymptomContainer() {

    const [symptomArray, setSymptomArray] = useState(Array(11).fill(false))
    const [showModal, setShowModal] = useState(false);
    const {
        startTime,
        startDate
    } = useContext(symptomContext);

    const handleSaveSymptom = () => {
        setShowModal(true);
        //for loop symptom Array
        // for (let i = 0; i < symptomArray.length; i++) {
        //     SymptomData.push(
        //         {
        //             date: { startDate },
        //             time: { startTime },
        //             //get respective symptom from SymptomSet
        //             symptom: {symptom: SymptomSet[i].image}
        //         }
        //     )
        // }
    }

    const Example = () => {
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
                                {/*<Text color="blueGray.400">{startTime}</Text>*/}
                            </HStack>
                        </VStack>
                        <FormControl>
                            <FormControl.Label>Additional notes</FormControl.Label>
                            <Input />
                        </FormControl>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                                setShowModal(false);
                            }}>
                                Cancel
                            </Button>
                            <Button onPress={() => {
                                setShowModal(false);
                            }}>
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
                <Text className="text-white font-extrabold text-lg">
                    Save
                </Text>
            </TouchableOpacity>
            <Example/>
        </>
    )
}