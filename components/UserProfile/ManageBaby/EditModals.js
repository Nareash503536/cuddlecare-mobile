import React, { useState, useContext, useEffect } from "react";
import { Modal, Center, Button, FormControl, Input, Radio, AlertDialog} from "native-base";
import { ManageBabyContext } from "../../../screens/UserProfile/ManageBaby";
import UpdateProfileAPI from "../../../Api/UpdateProfileAPI";
import Toast from "react-native-toast-message";
import { AuthContext } from "../../../Context/AuthContext";
import { View } from "react-native";
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export const NameModal = () => {
    const { setShowNameModal, showNameModal, setName, name, setLoading, babyToBeEdited, setBabyToBeEdited } = useContext(ManageBabyContext);
    const { updateKeys } = useContext(AuthContext);
    const [tempName, setTempName] = useState(name);


    const handleText = (text) => setTempName(text);

    const EditName = async () => {
        setLoading(true);
        setShowNameModal(false);
        await updateKeys();
        const updateBaby = await UpdateProfileAPI().updateBabyByAttribute(babyToBeEdited.babyID, "babyname", tempName);
        if (updateBaby) {
            setName(tempName);
            setBabyToBeEdited(updateBaby)
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Name updated successfully',
                visibilityTime: 3000,
                autoHide: true,
                bottomOffset: 40,
            });
        }
        setLoading(false);
    }

    return <Center>
        <Modal isOpen={showNameModal} onClose={() => { setShowNameModal(false); setTempName(name); }}>
            <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>Update name</Modal.Header>
                <Modal.Body>
                    <FormControl mt="3">
                        <FormControl.Label>Enter your name</FormControl.Label>
                        <Input value={tempName} onChangeText={handleText} isRequired={true} />
                    </FormControl>
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group space={2}>
                        <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                            setShowNameModal(false);
                            setTempName(name);
                        }}>
                            Cancel
                        </Button>
                        <Button onPress={() => EditName()}>
                            Save
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    </Center>;
};

export const BirthdayModal = () => {

    const { setShowBirthdayModal, showBirthdayModal, birthday, setBirthday, setLoading, babyToBeEdited, setBabyToBeEdited } = useContext(ManageBabyContext);
    const [tempBirthday, setTempBirthday] = useState(birthday ? birthday : "None");
    const { updateKeys } = useContext(AuthContext);
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);

    const EditBirthday = async () => {
        setLoading(true);
        setShowBirthdayModal(false);
        await updateKeys();
        const updateBaby = await UpdateProfileAPI().updateBabyByAttribute(babyToBeEdited.babyID, "dob", tempBirthday);
        if (updateBaby) {
            setBirthday(tempBirthday);
            setBabyToBeEdited(updateBaby);
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Birthday Updated Successfully',
                visibilityTime: 3000,
                autoHide: true,
                bottomOffset: 40,
            });
        }
        setLoading(false);
    }

    const showDatePicker = () => {
        setDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisible(false);
    };

    const handleDateConfirm = (date) => {
        let inputDate = date.toISOString().slice(0, 10);
        setTempBirthday(inputDate);
        hideDatePicker();
    };

    return <Center>
        <Modal isOpen={showBirthdayModal} onClose={() => { setShowBirthdayModal(false), setTempBirthday(birthday) }}>
            <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>Update Birthday</Modal.Header>
                <Modal.Body>
                    <FormControl mt="3">
                        <FormControl.Label>Enter your Birthday</FormControl.Label>
                        <Input value={tempBirthday} showSoftInputOnFocus={false} onPressIn={showDatePicker} />
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleDateConfirm}
                            onCancel={hideDatePicker}
                            maximumDate={new Date(Date.now() - 568024668000)}
                            minimumDate={new Date(1900, 0, 1)}
                        />
                    </FormControl>
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group space={2}>
                        <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                            setShowBirthdayModal(false);
                            setTempBirthday(birthday);
                        }}>
                            Cancel
                        </Button>
                        <Button onPress={() => EditBirthday()}>
                            Save
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    </Center>;
};

export const GenderModal = () => {

    const { setShowGenderModal, showGenderModal, gender, setGender, setLoading, babyToBeEdited, setBabyToBeEdited } = useContext(ManageBabyContext);
    const { updateKeys } = useContext(AuthContext);
    const [tempGender, setTempGender] = useState(gender);

    const EditGender = async () => {
        setLoading(true);
        setShowGenderModal(false);
        await updateKeys();
        const updateBaby = await UpdateProfileAPI().updateBabyByAttribute(babyToBeEdited.babyID, "gender", tempGender);
        if (updateBaby) {
            setGender(tempGender);
            setBabyToBeEdited(updateBaby);
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Gender Updated Successfully',
                visibilityTime: 3000,
                autoHide: true,
                bottomOffset: 40,
            });
        }
        setLoading(false);
    }

    const GenderSelect = () => {
        return <Radio.Group name="myRadioGroup" accessibilityLabel="favorite number" value={tempGender} onChange={nextValue => {
            setTempGender(nextValue);
        }}>
            <FormControl.Label>Select your gender:</FormControl.Label>
            <View className={"justify-around flex-row w-full"}>
                <Radio value="Male" my={1}>
                    Male
                </Radio>
                <Radio value="Female" my={1}>
                    Female
                </Radio>
            </View>
        </Radio.Group>;
    };

    return <Center>
        <Modal isOpen={showGenderModal} onClose={() => setShowGenderModal(false)}>
            <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>Update Gender</Modal.Header>
                <Modal.Body>
                    <FormControl mt="3">
                        <GenderSelect />
                    </FormControl>
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group space={2}>
                        <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                            setShowGenderModal(false);
                        }}>
                            Cancel
                        </Button>
                        <Button onPress={() => EditGender()}>
                            Save
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    </Center>;
};

export const DeleteModal = () => {

    const { setShowDeleteModal, showDeleteModal, setLoading, babyToBeEdited, setBabyToBeEdited } = useContext(ManageBabyContext);

    const { updateKeys, user, setBabySet } = useContext(AuthContext);


    const onClose = () => setShowDeleteModal(false);

    const cancelRef = React.useRef(null);

    const DeleteBaby = async () => {
        setLoading(true);
        onClose();
        await updateKeys();
        const deleteBaby = await UpdateProfileAPI().deleteBaby(babyToBeEdited.babyID);
        const newBabies = await UpdateProfileAPI().getParentBabySet(user.email);
        if (newBabies) {
            setBabySet(newBabies);
        }
        if (deleteBaby) {
            setBabyToBeEdited(null);
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Baby Deleted Successfully',
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
                <AlertDialog.Header>Delete Customer</AlertDialog.Header>
                <AlertDialog.Body>
                    This will remove all data relating to Alex. This action cannot be
                    reversed. Deleted data can not be recovered.
                </AlertDialog.Body>
                <AlertDialog.Footer>
                    <Button.Group space={2}>
                        <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                            Cancel
                        </Button>
                        <Button colorScheme="danger" onPress={() => DeleteBaby()}>
                            Delete
                        </Button>
                    </Button.Group>
                </AlertDialog.Footer>
            </AlertDialog.Content>
        </AlertDialog>
    </Center>;
};