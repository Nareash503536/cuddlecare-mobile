import React, { useState, useContext } from "react";
import { Modal, Center, Button, FormControl, Input, Radio} from "native-base";
import { EditContext } from "../../../screens/UserProfile/EditProfile";
import UpdateProfileAPI from "../../../Api/UpdateProfileAPI";
import Toast from "react-native-toast-message";
import { AuthContext } from "../../../Context/AuthContext";
import { View } from "react-native";
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export const NameModal = () => {
    const { setShowNameModal, showNameModal, setName, name, setLoading } = useContext(EditContext);
    const { user, updateKeys, setUser } = useContext(AuthContext);
    const [tempName, setTempName] = useState(name);
    const handleText = (text) => setTempName(text);

    const EditName = async() => {
        setLoading(true);
        setShowNameModal(false);
        await updateKeys();
        const updateUser = await UpdateProfileAPI().updateUserByAttribute(user.email, "username", tempName);
        if (updateUser) {
            setName(tempName);
            setUser(updateUser);
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Name Updated',
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
                        <Input value={tempName} onChangeText={handleText} isRequired={true}/>
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

export const MobileModal = () => {

    const { setShowMobileModal, showMobileModal, mobile, setMobile, setLoading } = useContext(EditContext);
    const [tempMobile, setTempMobile] = useState(mobile);
    const { user, updateKeys, setUser } = useContext(AuthContext);
    const handleText = (text) => setTempMobile(text);

    const EditMobile = async () => {
        setLoading(true);
        setShowMobileModal(false);
        await updateKeys();
        const updateUser = await UpdateProfileAPI().updateUserByAttribute(user.email, "contactNumber", tempMobile);
        if (updateUser) {
            console.log(updateUser);
            setMobile(tempMobile);
            setUser(updateUser);
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Mobile Number Updated',
                visibilityTime: 3000,
                autoHide: true,
                bottomOffset: 40,
            });
        }
        setLoading(false);
    }

    return <Center>
        <Modal isOpen={showMobileModal} onClose={() => {setShowMobileModal(false); setTempMobile(mobile);}}>
            <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>Update Mobile Number</Modal.Header>
                <Modal.Body>
                    <FormControl mt="3">
                        <FormControl.Label>Enter your mobile number</FormControl.Label>
                        <Input value={tempMobile} onChangeText={handleText} isRequired={true} />
                    </FormControl>
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group space={2}>
                        <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                            setShowMobileModal(false);
                            setTempMobile(mobile);
                        }}>
                            Cancel
                        </Button>
                        <Button onPress={() => EditMobile()}>
                            Save
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    </Center>;
};

export const BirthdayModal = () => {

    const { setShowBirthdayModal, showBirthdayModal, birthday, setBirthday, setLoading } = useContext(EditContext);
    const [tempBirthday, setTempBirthday] = useState(birthday);
    const { user, updateKeys, setUser } = useContext(AuthContext);
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);

    const EditBirthday = async () => {
        setLoading(true);
        setShowBirthdayModal(false);
        await updateKeys();
        const updateUser = await UpdateProfileAPI().updateUserByAttribute(user.email, "dob", tempBirthday);
        if (updateUser) {
            setBirthday(tempBirthday);
            setUser(updateUser);
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
        <Modal isOpen={showBirthdayModal} onClose={() => {setShowBirthdayModal(false), setTempBirthday(birthday)}}>
            <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>Update Birthday</Modal.Header>
                <Modal.Body>
                    <FormControl mt="3">
                        <FormControl.Label>Enter your Birthday</FormControl.Label>
                        <Input value={tempBirthday} showSoftInputOnFocus={false}  onPressIn={showDatePicker} />
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

    const { setShowGenderModal, showGenderModal, gender, setGender, setLoading } = useContext(EditContext);
    const { user, updateKeys, setUser } = useContext(AuthContext);
    const [tempGender, setTempGender] = useState(gender);

    const EditGender = async () => {
        setLoading(true);
        setShowGenderModal(false);
        await updateKeys();
        const updateUser = await UpdateProfileAPI().updateUserByAttribute(user.email, "gender", tempGender);
        if (updateUser) {
            setGender(tempGender);
            setUser(updateUser);
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