import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ScrollView, Image, ActivityIndicator } from 'react-native';
import images from '../../../constants/images';
import { Button } from "native-base";
import GeneralAPI from '../../../Api/GeneralAPI';
import { AuthContext } from '../../../Context/AuthContext';
import { AcceptRequestContext } from '../../../screens/CaregiverRequests/AcceptRequestScreen';
import { COLORS } from '../../../constants/theme';
import Toast from 'react-native-toast-message';

export default function RequestedCaregiver() {

    const { setRequestedBabyList, requestedBabyList, search } = useContext(AcceptRequestContext);
    const { updateKeys, baby, babySet, setBabySet, user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getAllRequestedBabies = async () => {
            setLoading(true);
            await updateKeys();
            let response = await GeneralAPI().returnRequestedBabies(user.email);
            console.log(response.data)
            setRequestedBabyList(response.data);
            setLoading(false);
        }
        getAllRequestedBabies();
    }, [])

    const handleCancelRequest = async (babyID, email) => {
        setLoading(true);
        await updateKeys();
        let response = await GeneralAPI().cancelbabyRequest(babyID, email);
        if (response) {
            console.log(response.data);
            setRequestedBabyList(requestedBabyList.filter(baby => baby.babyName !== response.data.babyName));
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

    const handleAcceptRequest = async (babyID, email) => {
        setLoading(true);
        await updateKeys();
        let response = await GeneralAPI().acceptBabyRequest(babyID, email);
        if (response) {
            console.log(response.data);
            setRequestedBabyList(requestedBabyList.filter(baby => baby.babyName !== response.data.babyName));
            console.log("babySet", babySet);
            if (babySet) {
                setBabySet([...babySet, response.data]);
            }else{
                setBabySet([response.data]);
            }
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Request accepted',
                text2: 'Baby added to your list',
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
                requestedBabyList.length > 0 ? (
                    <ScrollView>
                        {requestedBabyList
                            .filter(
                                item => item.babyName.toLowerCase().indexOf(search.toLowerCase()) !== -1)
                            .map(
                                (item, index) => (
                                    <View key={index}>
                                        <View
                                            className={"m-5 p-5 flex-col justify-around items-center rounded-xl"}
                                            style={{
                                                backgroundColor: "#fff",
                                                shadowColor: '#000',
                                                elevation: 20,
                                            }}
                                        >
                                            <View className={"flex-row justify-around w-full"}>
                                                <View className={"justify-center"}>
                                                    <Image
                                                        source={item.profilePicture ? { uri: item.profilePicture } : images.AddImage}
                                                        className={"rounded-full w-20 h-20"}
                                                    />
                                                </View>
                                                <View className={"m-2"}>
                                                    <Text className={"text-center"}>Name</Text>
                                                    <Text className={"font-extrabold text-base text-center"}>{item.babyName}</Text>
                                                </View>
                                            </View>
                                            <View className={"flex-row justify-around w-full"}>
                                                <Button
                                                    className={"m-5 mb-0"}
                                                    style={{ backgroundColor: COLORS.primary }}
                                                    onPress={() => { handleAcceptRequest(item.babyID, user.email) }}
                                                >
                                                    <Text className={" text-center font-extrabold"} style={{ color: "#fff" }}>
                                                        Confirm
                                                    </Text>
                                                </Button>
                                                <Button
                                                    className={"m-5 mb-0"}
                                                    style={{ backgroundColor: "red" }}
                                                    onPress={() => { handleCancelRequest(item.babyID, user.email) }}
                                                >
                                                    <Text className={" text-center font-extrabold"} style={{ color: "#fff" }}>
                                                        Cancel
                                                    </Text>
                                                </Button>
                                            </View>
                                        </View>
                                    </View>
                                ))}
                    </ScrollView>
                    ) :
                    (
                        <View className="h-1/2 justify-center items-center ">
                            <Image
                                source={images.NoBabiesWarning}
                                style={{ width: 200, height: 200 }}
                                className={"items-center"}
                            />
                            <Text className={"text-2xl text-center flex-wrap font-extrabold"} style={{ color: COLORS.fontColor1 }}>No Baby requests!</Text>
                            <Text className={"text-center"} style={{ color: COLORS.fontColor1 }}> There are no any baby requests.</Text>
                        </View>
                    )
            ))
}