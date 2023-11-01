import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import images from '../../../constants/images';
import { Button } from "native-base";
import GeneralAPI from '../../../Api/GeneralAPI';
import { AuthContext } from '../../../Context/AuthContext';
import { RequestContext } from '../../../screens/CaregiverRequests/SendRequestScreen';
import { COLORS } from '../../../constants/theme';
import Toast from 'react-native-toast-message';

export default function RequestedCaregiver() {

    const { setRequestedCaregiverList, requestedCaregiverList, caregiverList, setCaregiverList, search } = useContext(RequestContext);
    const { updateKeys, baby } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getAllRequestedCaregivers = async () => {
            setLoading(true);
            await updateKeys();
            let response = await GeneralAPI().getRequestedCaregivers(baby.babyID);
            console.log(response.data)
            setRequestedCaregiverList(response.data);
            setLoading(false);
        }
        getAllRequestedCaregivers();
    }, [baby])

    const handleCancelRequest = async (babyID, caregiverID) => {
        setLoading(true);
        await updateKeys();
        let response = await GeneralAPI().rejectRequest(babyID, caregiverID);
        if (response) {
            console.log(response.data);
            setRequestedCaregiverList(requestedCaregiverList.filter(caregiver => caregiver.user.username !== response.data.user.username));
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Request cancelled',
                visibilityTime: 3000,
                autoHide: true,
                bottomOffset: 40,
            });
        }
        setLoading(false);
    }

    return (
        loading ? (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                {/* <LottieView source={animation.Spinner} autoPlay loop /> */}
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        ) :
            (
                requestedCaregiverList.length > 0 ?
                    (<>
                        <Text className={"text-left ml-8"} style={{ color: "grey" }}>
                            Requested caregivers
                        </Text>
                        {requestedCaregiverList
                            .filter(
                                item => item.user.username.toLowerCase().indexOf(search.toLowerCase()) !== -1)
                            .map(
                                (item, index) => (
                                    <View key={index}>
                                        <View
                                            className={"m-5 p-5 flex-col justify-around items-center rounded-xl w-fit-content"}
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
                                                <View className={"m-2"}>
                                                    <Text className={"text-center"}>Babies count</Text>
                                                    <Text className={"font-extrabold text-base text-center"}>{item.babies.length}</Text>
                                                </View>
                                            </View>
                                            <View className={"m-2"}>
                                                <Text className={"text-center"}>Name</Text>
                                                <Text className={"font-extrabold text-base text-center"}>{item.user.username}</Text>
                                            </View>
                                            <View className={"flex-row"}>
                                                <Button
                                                    className={"m-5 mb-0"}
                                                    style={{ backgroundColor: "red" }}
                                                    onPress={() => { handleCancelRequest(baby.babyID, item.caregiverID) }}
                                                >
                                                    <Text className={" text-center font-extrabold"} style={{ color: "#fff" }}>
                                                        Cancel Request
                                                    </Text>
                                                </Button>
                                            </View>
                                        </View>
                                    </View>
                                ))}
                    </>)
                    : null
            ))
}