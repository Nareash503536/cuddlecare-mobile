import React, {useState} from 'react'
import {TouchableOpacity, View, Text, StyleSheet, Image, Pressable} from "react-native";
import {themeColors} from "../../theme";
import {ArrowUpIcon, CalendarDaysIcon, CheckIcon, ClockIcon} from "react-native-heroicons/solid";
import {dateDiff,getDateenUSFormat} from "../../util/date";
import {babyDetails} from "../../constants";
import { Center, HStack, Modal, VStack} from "native-base";
import Button from "../UI/Button";
import DeleteBtn from "../UI/DeleteBtn";
import UpdateBtn from "../UI/UpdateBtn";
import {useDispatch} from "react-redux";
import {deleteGrowth} from "../../slices/growthSlice";
import {useNavigation} from "@react-navigation/native";

export default function GrowthMeasurement({ id,weight, height, headCircumference, description,date}) {
    let baby = babyDetails[2];
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const DataModal = () => {
        return <Center>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
                <Modal.Content maxWidth="350" style={{backgroundColor:"white"}}>
                    <Modal.CloseButton />
                    <Modal.Header>
                        <View><Text className={" text-gray-500  font-semibold"} style={{color:"gray"}}>{getDateenUSFormat(date)}</Text></View>
                    </Modal.Header>
                    <Modal.Body>
                        <VStack space={2}>
                            <View>
                                <View className={"flex-row justify-center"}><Text className={"text-lg"} style={{color:"gray"}}>Growth Measurement</Text></View>
                            </View>
                            <View style={{backgroundColor:"white"}}>
                                <View className={"flex-row mx-1 space-x-2 pt-1 items-center"}>
                                    <View >
                                        <Image source={require("../../assets/images/weight-icon.png")} className={"w-6 h-6 "}/>
                                    </View>
                                    <View className={"flex"}>
                                        <Text className={"flex-row font-semibold"} style={{color:"gray"}}>Weight</Text>
                                    </View>
                                    <View className={"flex"}>
                                        <Text className={"flex-row font-semibold text-lg"} style={{color:"gray"}}>{weight} kg</Text>
                                    </View>
                                </View>

                                <View className={"flex-row mx-1 space-x-2 pt-1 items-center"}>
                                    <View >
                                        <Image source={require("../../assets/images/height-icon.png")} className={"w-6 h-6 "}/>
                                    </View>
                                    <View className={"flex"}>
                                        <Text className={"flex-row font-semibold text-gray-500"} style={{color:"gray"}}>Height</Text>
                                    </View>
                                    <View className={"flex"}>
                                        <Text className={"flex-row font-semibold text-lg"} style={{color:"gray"}}>{height} cm</Text>
                                    </View>
                                </View>

                                <View className={"flex-row mx-1 space-x-2 pt-1 items-center"}>
                                    <View >
                                        <Image source={require("../../assets/images/headCircum-icon.png")} className={"w-6 h-6 "}/>
                                    </View>
                                    <View className={"flex"}>
                                        <Text className={"flex-row font-semibold text-gray-500"} style={{color:"gray"}}>Head Circum.</Text>
                                    </View>
                                    <View className={"flex"}>
                                        <Text className={"flex-row font-semibold text-lg"} style={{color:"gray"}}>{headCircumference} cm</Text>
                                    </View>
                                </View>
                            </View>

                            <View className={"pt-2 pl-2"}>
                                <Text>Description</Text>
                            </View>
                            <View><Text style={{color:"gray"}}>
                                {description}</Text>
                            </View>
                            <View className={"flex-row items-center space-x-1"}>
                                <ClockIcon size="18" color="limegreen" />
                                <Text className={"text-gray-500"} style={{color:"gray"}}>{dateDiff(baby.dob,date)}</Text>
                            </View>
                        </VStack>
                    </Modal.Body>
                    <Modal.Footer>
                        <DeleteBtn style={{paddingHorizontal:5}} mode="flat"
                                flex="1" onPress={() => {setShowModal2(true);}}>
                            Delete
                        </DeleteBtn>
                        <UpdateBtn flex="1" onPress={() => {
                            setShowModal(false);
                            navigation.navigate('GrowhtManage',{ id: id })
                        }}>
                            Update
                        </UpdateBtn>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>

            <Modal isOpen={showModal2} onClose={() => setShowModal(false)} size="lg">
                <Modal.Content maxWidth="350" style={{backgroundColor:"white"}}>
                    <Modal.Body>
                        <VStack space={2}>
                            <View>
                                <Image source={require("../../assets/images/deleteAlert.png")} className={"w-20 h-20 mx-auto"}/>
                            </View>
                            <View>
                                <Text style={{color:"gray",textAlign:"center"}}>
                                    Are you sure you want to delete this record? This process cannot be undone.
                                </Text>
                            </View>
                        </VStack>
                    </Modal.Body>
                    <Modal.Footer>
                        <DeleteBtn style={{paddingHorizontal:5}} mode="flat"
                                   flex="1"
                                   onPress={() => {
                                       setShowModal(false);
                                       setShowModal2(false);
                                       dispatch(deleteGrowth(id));
                                   }}>Delete
                        </DeleteBtn>

                        <UpdateBtn flex="1" onPress={() => {
                            setShowModal(false);setShowModal2(false);
                        }}>Cancel</UpdateBtn>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </Center>
    };


    return (
        <Pressable className={"pt-3"}
            onPress={()=> setShowModal(true)}
        >

            <View className={"flex-row rounded-xl p-3 shadow-2xl  mx-2 space-x-3"} style={{backgroundColor:"white",shadowColor: "#000"}}>

                <View className={"flex justify-center flex-1"}>
                    <View><Text className={" text-gray-500  font-semibold"} style={{color:"gray"}}>{getDateenUSFormat(date)}</Text></View>

                    <View><Text className={" text-gray-500 py-1"} style={{color:"gray"}}>
                        {description.substring(0, 60)+"..."}</Text>
                    </View>

                    <View className={"flex-row items-center space-x-1"}>
                        <ClockIcon size="18" color="limegreen" />
                        <Text className={"text-gray-500"} style={{color:"gray"}}>{dateDiff(baby.dob,date)}</Text>
                    </View>
                </View>

                <View className={"p-1 bg-white"} style={{backgroundColor:"white"}}>
                    <View className={"flex-row mx-1 space-x-2 pt-1 "}>
                        <View >
                            <Image source={require("../../assets/images/weight-icon.png")} className={"w-6 h-6 "}/>
                        </View>
                        <View className={"flex"}>
                            <Text className={"flex-row font-semibold text-gray-500"} style={{color:"gray"}}>{weight} kg</Text>
                        </View>
                    </View>

                    <View className={"flex-row mx-1 space-x-2 pt-1 "}>
                        <View >
                            <Image source={require("../../assets/images/height-icon.png")} className={"w-6 h-6 "}/>
                        </View>
                        <View className={"flex"}>
                            <Text className={"flex-row font-semibold text-gray-500"} style={{color:"gray"}}>{height} cm</Text>
                        </View>
                    </View>

                    <View className={"flex-row mx-1 space-x-2 pt-1 "}>
                        <View >
                            <Image source={require("../../assets/images/headCircum-icon.png")} className={"w-6 h-6 "}/>
                        </View>
                        <View className={"flex"}>
                            <Text className={"flex-row font-semibold text-gray-500"} style={{color:"gray"}}>{headCircumference} cm</Text>
                        </View>
                    </View>
                </View>

            </View>
            <DataModal/>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    rowborder: {
        borderColor:themeColors.colornormal,
    },
})

// style={{backgroundColor:"white", color:themeColors.colorDanger, borderColor: themeColors.colorDanger,borderWidth: 1}}

