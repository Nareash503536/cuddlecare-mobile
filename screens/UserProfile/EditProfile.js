import React, { useState, createContext, useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileHeader from '../../components/UserProfile/EditProfileScreen/ProfileHeader';
import OptionSet from '../../components/UserProfile/EditProfileScreen/OptionSet';
import BabyCaregiverOptionSet from '../../components/UserProfile/EditProfileScreen/BabyCaregiverOptionSet';
import {
    NameModal,
    EmailModal,
    MobileModal,
    BirthdayModal,
    GenderModal
} from '../../components/UserProfile/EditProfileScreen/EditModals';
import { AuthContext } from '../../Context/AuthContext';

export const EditContext = createContext();

export default function EditProfile() {

    const {user} = useContext(AuthContext);

    const [showNameModal, setShowNameModal] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [showMobileModal, setShowMobileModal] = useState(false);
    const [showBirthdayModal, setShowBirthdayModal] = useState(false);
    const [showGenderModal, setShowGenderModal] = useState(false);
    const [name, setName] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [mobile, setMobile] = useState(user.contactNumber);
    const [birthday, setBirthday] = useState(user.dob);
    const [gender, setGender] = useState(user.gender);

    return (
        <EditContext.Provider value={{
            setShowNameModal,
            setShowEmailModal,
            setShowMobileModal,
            setShowBirthdayModal,
            setShowGenderModal,
            showNameModal,
            showEmailModal,
            showMobileModal,
            showBirthdayModal,
            showGenderModal,
            name,
            setName,
            email,
            setEmail,
            mobile,
            setMobile,
            birthday,
            setBirthday,
            gender,
            setGender
        }}>
            <SafeAreaView>
                <ScrollView>
                    <View className="h-full">
                        <ProfileHeader />
                        <OptionSet />
                        <BabyCaregiverOptionSet />
                        <NameModal />
                        <EmailModal />
                        <MobileModal />
                        <BirthdayModal />
                        <GenderModal />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </EditContext.Provider>
    )
}