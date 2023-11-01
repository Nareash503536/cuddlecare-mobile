import React, { useState, createContext, useContext, useEffect } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/theme';
import ManageBabyHeader from '../../components/UserProfile/ManageBaby/ManageBabyHeader';
import EditBabyInfo from '../../components/UserProfile/ManageBaby/EditBabyInfo';
import EditBabyPic from '../../components/UserProfile/ManageBaby/EditBabyPic';
import { AuthContext } from '../../Context/AuthContext';
import { useRoute } from '@react-navigation/core';
import {
    NameModal,
    BirthdayModal,
    GenderModal,
    DeleteModal
} from '../../components/UserProfile/ManageBaby/EditModals';

export const ManageBabyContext = createContext();

export default function ManageBaby() {
    const route = useRoute();
    const babyID = route.params?.babyID || {};

    const { babySet, setBabySet } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);
    const [showNameModal, setShowNameModal] = useState(false);
    const [showBirthdayModal, setShowBirthdayModal] = useState(false);
    const [showGenderModal, setShowGenderModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('');
    const [babyToBeEdited, setBabyToBeEdited] = useState(null)


    useEffect(() => {
        for (let i = 0; i < babySet.length; i++) {
            if (babySet[i].babyID === babyID)
                setBabyToBeEdited(babySet[i]);
        }
    }, [])

    useEffect(() => {
        if (babyToBeEdited){
            console.log(babyToBeEdited);
            setName(babyToBeEdited.babyName);
            setBirthday(babyToBeEdited.dob);
            setGender(babyToBeEdited.gender);
            let tempBabySet = babySet;
            for (let i = 0; i < tempBabySet.length; i++) {
                if (tempBabySet[i].babyID === babyToBeEdited.babyID)
                    tempBabySet[i] = babyToBeEdited;
            }
            setBabySet(tempBabySet);
        }
    }, [babyToBeEdited])

    return (
        <ManageBabyContext.Provider value={{ 
            loading, 
            setLoading,
            showNameModal,
            setShowNameModal,
            showBirthdayModal,
            setShowBirthdayModal,
            showGenderModal,
            setShowGenderModal,
            showDeleteModal,
            setShowDeleteModal,
            name,
            setName,
            birthday,
            setBirthday,
            gender,
            setGender,
            babyToBeEdited,
            setBabyToBeEdited
        }}>
            {
                loading ?
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        {/* <LottieView source={animation.Spinner} autoPlay loop /> */}
                        <ActivityIndicator size="large" color={COLORS.primary} />
                    </View> :
                    <SafeAreaView>
                        <ManageBabyHeader />
                        <EditBabyPic/>
                        <EditBabyInfo />
                        <NameModal />
                        <BirthdayModal />
                        <GenderModal />
                        <DeleteModal />
                    </SafeAreaView>
            }
        </ManageBabyContext.Provider>
    )
}