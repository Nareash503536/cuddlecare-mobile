import React, {useState} from 'react'
import {TouchableOpacity, View, Text, StyleSheet, Image, Pressable, TouchableHighlight} from "react-native";
import {themeColors} from "../../theme";
import {ArrowUpIcon, CalendarDaysIcon, CheckIcon, ClockIcon} from "react-native-heroicons/solid";
import {dateDiff,getDateenUSFormat} from "../../util/date";
import {babyDetails} from "../../constants";
import {Center, Modal, VStack} from "native-base";
import DeleteBtn from "../UI/DeleteBtn";
import UpdateBtn from "../UI/UpdateBtn";
import {deleteGrowth} from "../../slices/growthSlice";
import {useDispatch} from "react-redux";
import {deleteMilestone} from "../../slices/milestoneSlice";
export default function  CompletedMilestone({ id,milestone,description,date}) {
    console.log(id);
    let baby = babyDetails[2];
    const dispatch = useDispatch();
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
                                <View className={"flex-row justify-center"}><Text className={"text-center font-bold"} style={{color:"gray",fontSize:16}}>{milestone}</Text></View>
                            </View>
                            <View className={"pt-2 "}>
                                <Text>Description</Text>
                            </View>
                            <View><Text className={"pl-2"} style={{color:"gray"}}>
                                {description}</Text>
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
                                   flex="1" onPress={() => {
                                       setShowModal(false);
                                       setShowModal2(false);
                            dispatch(deleteMilestone(id));

                                   }}>
                            Delete
                        </DeleteBtn>
                        <UpdateBtn flex="1" onPress={() => {
                            setShowModal(false);setShowModal2(false);
                        }}>Cancel</UpdateBtn>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </Center>
    };
    // if(status){
    return (
        <Pressable
            onPress={()=> setShowModal(true)}
            className={"pt-3"}>
            <View className={"flex-row rounded-xl p-3 shadow-2xl  mx-2 space-x-3"} style={{backgroundColor:"white",shadowColor: "#000"}}>
                <View className={"flex justify-center flex-1"}>
                    <View><Text className={" text-gray-500  font-semibold"} style={{color:"gray"}}>{milestone}</Text></View>

                    <View><Text className={" text-gray-500 py-1"} style={{color:"gray"}}>
                        {description.substring(0, 60)+"..."}</Text>
                    </View>

                    <View className={"flex-row items-center space-x-1"}>
                        <ClockIcon size="18" color="limegreen" />
                        <Text className={"text-gray-500"} style={{color:"gray"}}>{getDateenUSFormat(date)}</Text>
                    </View>
                </View>
                <DataModal/>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    rowborder: {
        borderColor:themeColors.colornormal,
    },
    uncomplete:{
        borderWidth:2,
        borderColor:themeColors.colorDanger,
    }
})

//     <TouchableOpacity className={"pt-3"}>
//
//     <View className={"flex-row rounded-xl p-3 shadow-sm  mx-2 space-x-3"} style={styles.uncomplete}>
//
//     <View className={"flex justify-center flex-1"}>
//     {/*<View><Text className={" text-gray-500  font-semibold"} >{getDateenUSFormat(date)}</Text></View>*/}
//
// <View><Text className={" text-gray-500 py-1"} >
//     {value.substring(0, 60)+"..."}</Text>
// </View>
//
// <View className={"flex-row items-center space-x-1"}>
//     <ClockIcon size="18" color="limegreen" />
//     {/*<Text className={"text-gray-500"}>{dateDiff(baby.dob,date)}</Text>*/}
// </View>
// </View>
//
// </View>
// </TouchableOpacity>

