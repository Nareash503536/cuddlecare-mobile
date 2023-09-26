import React, { createRef, useEffect, useState, useContext, createContext } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/theme';
import { Drawer } from 'react-native-drawer-layout';
import DrawerContent from "../../components/Drawer/DrawerContent";
import Header from '../../components/CaregiverRequests/AcceptRequestScreen/Header';
import SearchBar from '../../components/CaregiverRequests/AcceptRequestScreen/SearchBar';
import RequestedBabies from '../../components/CaregiverRequests/AcceptRequestScreen/RequestedBabies';

export const AcceptRequestContext = createContext();

export default function AcceptRequestScreen() {

    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const search2 = createRef();
    const [open, setOpen] = useState(false);
    const [requestedBabyList, setRequestedBabyList] = useState([]);

    return (
        <SafeAreaView>
            <AcceptRequestContext.Provider value={{
                setOpen,
                search2,
                search,
                setSearch,
                loading,
                setLoading,
                requestedBabyList,
                setRequestedBabyList
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
                                    <Header />
                                    <SearchBar />
                                    <RequestedBabies />
                                </Drawer>
                            </View>
                        )}
            </AcceptRequestContext.Provider>
        </SafeAreaView>
    )
}