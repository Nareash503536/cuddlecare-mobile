import React, { useEffect, useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Modal, Center, Button, FormControl, Input, Radio, AlertDialog } from "native-base";
import images from '../../../constants/images';
import GeneralAPI from '../../../Api/GeneralAPI';
import { AuthContext } from '../../../Context/AuthContext';
import { COLORS } from '../../../constants/theme';
import { RequestContext } from '../../../screens/CaregiverRequests/SendRequestScreen';
import Toast from 'react-native-toast-message';
import RequestedCaregiver from './RequestedCaregiver';

export const AlertModal = () => {

    const { showAlertModal, setShowAlertModal } = useContext(RequestContext);

    return <>
        <Modal isOpen={showAlertModal} onClose={() => setShowAlertModal(false)}>
            <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>Send Request</Modal.Header>
                <Modal.Body>
                    You must remove your current caregiver before sending a request to another caregiver.
                </Modal.Body>
                <Modal.Footer>
                    <Button flex="1" onPress={() => {
                        setShowAlertModal(false);
                    }}>
                        Continue
                    </Button>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    </>;
};

export default function AllCaregivers() {

    const { updateKeys, baby } = useContext(AuthContext);
    const { caregiverList, setCaregiverList, search, requestedCaregiverList, setRequestedCaregiverList, currentCaregiver, setShowAlertModal } = useContext(RequestContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getAllCaregivers = async () => {
            try {
                setLoading(true);
                await updateKeys();
                let response = await GeneralAPI().returnCaregivers();
                console.log(response.data)
                setCaregiverList(response.data);
            } catch (error) {
                console.log("Error in getAllCaregivers: ", error);
            } finally {
                setLoading(false);
            }
        }
        getAllCaregivers();
    }, [baby])

    const handleSendRequest = async (babyID, caregiverID) => {
        if (currentCaregiver) {
            setShowAlertModal(true);
            return;
        } else {
            setLoading(true);
            await updateKeys();
            let response = await GeneralAPI().requestCaregiver(babyID, caregiverID);
            if (response) {
                console.log(response.data);
                setRequestedCaregiverList([...requestedCaregiverList, response.data]);
                () => RequestedCaregiver();
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Request sent',
                    visibilityTime: 3000,
                    autoHide: true,
                    bottomOffset: 40,
                });
            }
            setLoading(false);
        }
    }

    return (
        <>
            {
                loading ? (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        {/* <LottieView source={animation.Spinner} autoPlay loop /> */}
                        <ActivityIndicator size="large" color={COLORS.primary} />
                    </View>) :
                    caregiverList.length > 0 ?
                        <>
                            <Text className={"text-left ml-8"} style={{ color: "grey" }}>
                                Recommended for you
                            </Text>
                            {caregiverList
                                .filter(
                                    item => !currentCaregiver ? (item.user.username.toLowerCase().indexOf(search.toLowerCase()) !== -1 &&
                                        !requestedCaregiverList.some(caregiver => caregiver.user.username === item.user.username)) :
                                        (item.user.username.toLowerCase().indexOf(search.toLowerCase()) !== -1 &&
                                            !requestedCaregiverList.some(caregiver => caregiver.user.username === item.user.username) &&
                                            item.user.username !== currentCaregiver.user.username
                                        )

                                )
                                .map((item, index) => (
                                    <View key={index}>

                                        <View
                                            className={"m-5 p-5 flex-col justify-around items-center rounded-xl"}
                                            style={{
                                                backgroundColor: "#fff",
                                                shadowColor: '#000',
                                                elevation: 20,
                                            }}
                                        >
                                            <View className="flex-row justify-between align-middle">
                                                <View className={"justify-center"}>
                                                    <Image
                                                        source={item.user.profilePicture ? { uri: item.user.profilePicture } : images.AddImage}
                                                        className={"rounded-full w-20 h-20"}
                                                    />
                                                </View>
                                                <View className={"flex-row ml-5"}>

                                                    <View className={"m-2"}>
                                                        <Text className={"text-center"}>Babies count</Text>
                                                        <Text className={"font-extrabold text-base text-center"}>{item.babies.length}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View className={"m-2"}>
                                                <Text className={"text-center"}>Name</Text>
                                                <Text className={"font-extrabold text-base text-center"}>{item.user.username}</Text>
                                            </View>
                                            <Button
                                                className={"m-5 w-1/2 mb-0"}
                                                style={{
                                                    backgroundColor: COLORS.secondary
                                                }}
                                                onPress={() => { handleSendRequest(baby.babyID, item.caregiverID) }}
                                            >
                                                <Text className={"text-sm text-center font-extrabold"} style={{ color: "#fff" }}>
                                                    Send Request
                                                </Text>
                                            </Button>
                                        </View>
                                    </View>
                                ))}
                        </>
                        :
                        <View className="justify-center items-center ">
                            <Image
                                source={images.NoBabiesWarning}
                                style={{ width: 200, height: 200 }}
                                className={"items-center"}
                            />
                            <Text className={"text-2xl text-center flex-wrap font-extrabold"} style={{ color: COLORS.fontColor1 }}>No Caregivers!</Text>
                            <Text className={"text-center"} style={{ color: COLORS.fontColor1 }}> There are no any caregivers in the system.</Text>
                        </View>
            }
            {
                !loading &&
                caregiverList.length > 0 &&
                caregiverList
                    .filter(
                        item => item.user.username.toLowerCase().indexOf(search.toLowerCase()) !== -1
                    ).length === 0 &&
                <View className="justify-center items-center ">
                    <Image
                        source={images.NoBabiesWarning}
                        style={{ width: 200, height: 200 }}
                        className={"items-center"}
                    />
                    <Text className={"text-2xl text-center flex-wrap font-extrabold"} style={{ color: COLORS.fontColor1 }}>No Match Found!</Text>
                </View>
            }
        </>
    )
}