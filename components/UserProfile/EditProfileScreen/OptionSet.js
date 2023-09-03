import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { UserIcon, CakeIcon, DevicePhoneMobileIcon, UsersIcon, EnvelopeIcon, ChevronRightIcon } from "react-native-heroicons/outline";
import { AuthContext } from '../../../Context/AuthContext';
import { EditContext } from '../../../screens/UserProfile/EditProfile';

export default function OptionSet() {

    const { setShowNameModal, setShowEmailModal, setShowMobileModal, setShowBirthdayModal, setShowGenderModal,
            name, gender, birthday, mobile, email } = useContext(EditContext);        

    const { user } = useContext(AuthContext);
    return (
        <View >
            <View>
                <Text className={"m-5 text-2xl font-semibold"}>
                    Your Info
                </Text>
            </View>
            <TouchableOpacity className={"mx-5 flex-row justify-between items-center"} onPress={() => setShowNameModal(true)}>
                <View className={"flex-row items-center"}>
                    <View>
                        <UserIcon color={"#000"} size={30} />
                    </View>
                    <View className={"ml-5"}>
                        <Text >Name</Text>
                        <Text className={"font-extrabold text-base"}>{name}</Text>
                    </View>
                </View>
                <View>
                    <ChevronRightIcon color={"#000"} size={15} />
                </View>
            </TouchableOpacity>

            <View className={"border border-t-0 w-4/5 mx-auto my-3 opacity-5"}></View>

            <TouchableOpacity className={"mx-5 flex-row justify-between items-center"} onPress={() => setShowEmailModal(true)}>
                <View className={"flex-row items-center"}>
                    <View>
                        <EnvelopeIcon color={"#000"} size={30} />
                    </View>
                    <View className={"ml-5"}>
                        <Text >Email Address</Text>
                        <Text className={"font-extrabold text-base"}>{email}</Text>
                    </View>
                </View>
                <View>
                    <ChevronRightIcon color={"#000"} size={15} />
                </View>
            </TouchableOpacity>

            <View className={"border border-t-0 w-4/5 mx-auto my-3 opacity-5"}></View>

            <TouchableOpacity className={"mx-5 flex-row justify-between items-center"} onPress={() => setShowMobileModal(true)}>
                <View className={"flex-row items-center"}>
                    <View>
                        <DevicePhoneMobileIcon color={"#000"} size={30} />
                    </View>
                    <View className={"ml-5"}>
                        <Text >Mobile Number</Text>
                        <Text className={"font-extrabold text-base"}>{mobile}</Text>
                    </View>
                </View>
                <View>
                    <ChevronRightIcon color={"#000"} size={15} />
                </View>
            </TouchableOpacity>

            <View className={"border border-t-0 w-4/5 mx-auto my-3 opacity-5"}></View>

            <TouchableOpacity className={"mx-5 flex-row justify-between items-center"} onPress={() => setShowBirthdayModal(true)}>
                <View className={"flex-row items-center"}>
                    <View>
                        <CakeIcon color={"#000"} size={30} />
                    </View>
                    <View className={"ml-5"}>
                        <Text >Birthday</Text>
                        <Text className={"font-extrabold text-base"}>{birthday}</Text>
                    </View>
                </View>
                <View>
                    <ChevronRightIcon color={"#000"} size={15} />
                </View>
            </TouchableOpacity>

            <View className={"border border-t-0 w-4/5 mx-auto my-3 opacity-5"}></View>

            <TouchableOpacity className={"mx-5 flex-row justify-between items-center"} onPress={() => setShowGenderModal(true)}>
                <View className={"flex-row items-center"}>
                    <View>
                        <UsersIcon color={"#000"} size={30} />
                    </View>
                    <View className={"ml-5"}>
                        <Text >Gender</Text>
                        <Text className={"font-extrabold text-base"}>{gender}</Text>
                    </View>
                </View>
                <View>
                    <ChevronRightIcon color={"#000"} size={15} />
                </View>
            </TouchableOpacity>
        </View>
    )
}