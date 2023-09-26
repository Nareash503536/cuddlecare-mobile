import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import images from '../../../constants/images';
import { Modal, Center, Button, FormControl, Input, Radio, AlertDialog } from "native-base";
import { AuthContext } from '../../../Context/AuthContext';
import { COLORS } from '../../../constants/theme';
import GeneralAPI from '../../../Api/GeneralAPI';
import { RequestContext } from "../../../screens/CaregiverRequests/SendRequestScreen";
import Toast from 'react-native-toast-message';

export const DeleteModal = (props) => {

    const { setShowDeleteModal, showDeleteModal, setLoading, setCurrentCaregiver, caregiverList, setCaregiverList } = useContext(RequestContext);

    const { babyID, caregiverID } = props;

    const { updateKeys } = useContext(AuthContext);

    const onClose = () => setShowDeleteModal(false);

    const cancelRef = React.useRef(null);

    const RemoveCaregiver = async () => {
        setLoading(true);
        onClose();
        await updateKeys();
        const response = await GeneralAPI().removeCaregiver(babyID, caregiverID);
        if (response) {
            setCurrentCaregiver(null);
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Caregiver Removed',
                visibilityTime: 3000,
                autoHide: true,
                bottomOffset: 40,
            });
        }
        setLoading(false);
    }

    return <Center>
        <AlertDialog leastDestructiveRef={cancelRef} isOpen={showDeleteModal} onClose={onClose}>
            <AlertDialog.Content>
                <AlertDialog.CloseButton />
                <AlertDialog.Header>Delete Caregiver</AlertDialog.Header>
                <AlertDialog.Body>
                    This caregiver will have no more access to your baby's data. Are you sure you want to delete this caregiver?
                </AlertDialog.Body>
                <AlertDialog.Footer>
                    <Button.Group space={2}>
                        <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                            Cancel
                        </Button>
                        <Button colorScheme="danger" onPress={() => RemoveCaregiver()}>
                            Delete
                        </Button>
                    </Button.Group>
                </AlertDialog.Footer>
            </AlertDialog.Content>
        </AlertDialog>
    </Center>;
};

export default function CurrentCaregiver() {

    const { updateKeys, baby } = useContext(AuthContext);
    const { currentCaregiver, setCurrentCaregiver, setWhichBaby, setWhichCaregiver, setShowDeleteModal } = useContext(RequestContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getCaregiver = async () => {
            setLoading(true);
            await updateKeys();
            const response = await GeneralAPI().returnCurrentCaregivers(baby.babyID);
            setCurrentCaregiver(response.data);
            setLoading(false);
        }
        getCaregiver();
    }, [baby])

    const handleDeleteRequest = (babyID, caregiverID) => {
        setShowDeleteModal(true);
        setWhichBaby(babyID);
        setWhichCaregiver(caregiverID);
    }


    return (
        loading ? (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                {/* <LottieView source={animation.Spinner} autoPlay loop /> */}
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        ) :
            currentCaregiver &&
            <View>
                <Text className={"text-left ml-10"} style={{ color: "grey" }}>
                    Current Caregiver
                </Text>
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
                                source={currentCaregiver.user.profilePicture ? { uri: currentCaregiver.user.profilePicture } : images.AddImage}
                                className={"rounded-full w-20 h-20"}
                            />
                        </View>
                        <View className={"m-2"}>
                            <Text className={"text-center"}>Babies count</Text>
                            <Text className={"font-extrabold text-base text-center"}>{currentCaregiver.babies.length}</Text>
                        </View>
                    </View>
                    <View className={"m-2"}>
                        <Text className={"text-center"}>Name</Text>
                        <Text className={"font-extrabold text-base text-center"}>{currentCaregiver.user.username}</Text>
                    </View>
                    <Button
                        className={"m-5 mb-0"}
                        style={{ backgroundColor: "red" }}
                        onPress={() => handleDeleteRequest(baby.babyID, currentCaregiver.caregiverID)}
                    >
                        <Text className={" text-center font-extrabold"} style={{ color: "#fff" }}>
                            Remove Caregiver
                        </Text>
                    </Button>
                </View>
            </View>
    )
}