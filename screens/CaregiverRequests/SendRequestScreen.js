import React, { createRef, useEffect, useState, useContext, createContext } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/theme';
import { Drawer } from 'react-native-drawer-layout';
import DrawerContent from "../../components/Drawer/DrawerContent";
import Header from '../../components/CaregiverRequests/SendRequestScreen/Header';
import CurrentCaregiver, { DeleteModal } from '../../components/CaregiverRequests/SendRequestScreen/CurrentCaregiver';
import RequestedCaregiver from '../../components/CaregiverRequests/SendRequestScreen/RequestedCaregiver';
import AllCaregivers, {AlertModal} from '../../components/CaregiverRequests/SendRequestScreen/AllCaregivers';
import SearchBar from '../../components/CaregiverRequests/SendRequestScreen/SearchBar';

export const RequestContext = createContext();

export default function SendRequestScreen() {

    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const search2 = createRef();
    const [open, setOpen] = useState(false);
    const [caregiverList, setCaregiverList] = useState([]);
    const [requestedCaregiverList, setRequestedCaregiverList] = useState([]);
    const [currentCaregiver, setCurrentCaregiver] = useState(null);
    const [whichBaby, setWhichBaby] = useState(null);
    const [whichCaregiver, setWhichCaregiver] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAlertModal, setShowAlertModal] = useState(false);

    return (
        <SafeAreaView>
            <RequestContext.Provider value={{
                setOpen,
                search2,
                search,
                setSearch,
                requestedCaregiverList,
                setRequestedCaregiverList,
                caregiverList,
                setCaregiverList,
                loading,
                setLoading,
                currentCaregiver,
                setCurrentCaregiver,
                setWhichBaby,
                setWhichCaregiver,
                setShowDeleteModal,
                showDeleteModal,
                showAlertModal,
                setShowAlertModal
            }}>
                {
                    loading ? (
                        <View className={"items-center justify-center"}>
                            <ActivityIndicator size="large" color={COLORS.primary} />
                        </View>) :
                        (
                            <View className="min-h-full">
                                <Drawer
                                    open={open}
                                    onOpen={() => setOpen(true)}
                                    onClose={() => setOpen(false)}
                                    renderDrawerContent={() => {
                                        return (
                                            <DrawerContent />
                                        );
                                    }}
                                >
                                    <DeleteModal babyID={whichBaby} caregiverID={whichCaregiver} />
                                    <Header />
                                    <SearchBar/>
                                    <ScrollView className="mb-16">
                                        <CurrentCaregiver />
                                        <RequestedCaregiver />
                                        <AllCaregivers />
                                    </ScrollView>
                                    <AlertModal/>
                                </Drawer>
                            </View>
                        )}
            </RequestContext.Provider>
        </SafeAreaView>
    )
}