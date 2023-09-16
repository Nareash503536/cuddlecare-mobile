import React, { useContext, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { UserIcon, CakeIcon, UsersIcon, ChevronRightIcon } from "react-native-heroicons/outline";
import ManageBaby, { ManageBabyContext } from "../../../screens/UserProfile/ManageBaby";
import { COLORS } from "../../../constants/theme";

export default function EditBabyInfo() {

    const { setShowNameModal, setShowBirthdayModal, setShowGenderModal, setShowDeleteModal,
        name, gender, birthday } = useContext(ManageBabyContext);


    return (
        <View >
            <View>
                <Text className={"m-5 text-2xl font-semibold"}>
                    Baby Info
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

            <View className={"border border-t-0 w-4/5 mx-auto my-3 opacity-5 items-center"}></View>

            <Text className={"text-2xl mx-5 font-semibold"}>
                Delete Baby
            </Text>


            <Text className={"mx-5 text-justify my-3"}>
                Once you delete your baby, there is no going back. Please be certain.
            </Text>


            <TouchableOpacity className={"mx-5 flex-row justify-between items-center"} onPress={() => setShowDeleteModal(true)}>
                <TouchableOpacity style={styles.Button} onPress={() => setShowDeleteModal(true)}>
                   <Text className={"font-extrabold"} style = {{color:"red"}}>
                        Delete Baby {name}
                    </Text>
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    Button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        justifyContent: 'center',
        paddingHorizontal:11,
        height:50,
        borderRadius: 50,
        borderColor: "red",
        borderWidth: 2,
        backgroundColor: "white",
    }
});

