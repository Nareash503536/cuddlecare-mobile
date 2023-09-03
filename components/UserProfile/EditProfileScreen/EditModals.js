import React, { useState, useContext } from "react";
import { Modal, Center, Button, FormControl, Input, VStack, HStack } from "native-base";
import { EditContext } from "../../../screens/UserProfile/EditProfile";

export const NameModal = () => {

    const { setShowNameModal, showNameModal, setName, name } = useContext(EditContext);
    const [tempName, setTempName] = useState(name);
    const handleText = (text) => setTempName(text);

    return <Center>
        <Modal isOpen={showNameModal} onClose={() => setShowNameModal(false)}>
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
                        }}>
                            Cancel
                        </Button>
                        <Button onPress={() => {
                            setShowNameModal(false);
                            setName(tempName);
                        }}>
                            Save
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    </Center>;
};

export const EmailModal = () => {

    const { setShowEmailModal, showEmailModal, email, setEmail } = useContext(EditContext);
    const [tempEmail, setTempEmail] = useState(email);
    const handleText = (text) => setTempEmail(text);

    return <Center>
        <Modal isOpen={showEmailModal} onClose={() => setShowEmailModal(false)}>
            <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>Update email</Modal.Header>
                <Modal.Body>
                    <FormControl mt="3">
                        <FormControl.Label>Enter your email</FormControl.Label>
                        <Input value={tempEmail} onChangeText={handleText} isRequired={true} />
                    </FormControl>
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group space={2}>
                        <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                            setShowEmailModal(false);
                        }}>
                            Cancel
                        </Button>
                        <Button onPress={() => {
                            setShowEmailModal(false);
                            setEmail(tempEmail);
                        }}>
                            Save
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    </Center>;
};

export const MobileModal = () => {

    const { setShowMobileModal, showMobileModal, mobile, setMobile } = useContext(EditContext);
    const [tempMobile, setTempMobile] = useState(mobile);
    const handleText = (text) => setTempMobile(text);

    return <Center>
        <Modal isOpen={showMobileModal} onClose={() => setShowMobileModal(false)}>
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
                        }}>
                            Cancel
                        </Button>
                        <Button onPress={() => {
                            setShowMobileModal(false);
                            setMobile(tempMobile);
                        }}>
                            Save
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    </Center>;
};



export const BirthdayModal = () => {

    const { setShowBirthdayModal, showBirthdayModal, birthday, setBirthday } = useContext(EditContext);
    const [tempBirthday, setTempBirthday] = useState(birthday);
    const handleText = (text) => setTempBirthday(text);

    return <Center>
        <Modal isOpen={showBirthdayModal} onClose={() => setShowBirthdayModal(false)}>
            <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>Update Birthday</Modal.Header>
                <Modal.Body>
                    <FormControl mt="3">
                        <FormControl.Label>Enter your Birthday</FormControl.Label>
                        <Input value={tempBirthday} onChangeText={handleText} isRequired={true} />
                    </FormControl>
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group space={2}>
                        <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                            setShowBirthdayModal(false);
                        }}>
                            Cancel
                        </Button>
                        <Button onPress={() => {
                            setShowBirthdayModal(false);
                            setBirthday(tempBirthday);
                        }}>
                            Save
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    </Center>;
};

export const GenderModal = () => {

    const { setShowGenderModal, showGenderModal, gender, setGender } = useContext(EditContext);
    const [tempGender, setTempGender] = useState(gender);
    const handleText = (text) => setTempGender(text);

    return <Center>
        <Modal isOpen={showGenderModal} onClose={() => setShowGenderModal(false)}>
            <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>Update Gender</Modal.Header>
                <Modal.Body>
                    <FormControl mt="3">
                        <FormControl.Label>Enter your gender</FormControl.Label>
                        <Input value={tempGender} onChangeText={handleText} isRequired={true} />
                    </FormControl>
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group space={2}>
                        <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                            setShowGenderModal(false);
                        }}>
                            Cancel
                        </Button>
                        <Button onPress={() => {
                            setShowGenderModal(false);
                            setGender(tempGender);
                        }}>
                            Save
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    </Center>;
};