import React, {useEffect} from "react";
import {AuthContext} from "../Context/AuthContext";
import {useNavigation} from "@react-navigation/native";
import {BASE_URL} from "../config";
import axios from "axios";
import {FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {themeColors} from "../theme";
import {ChartBarSquareIcon} from "react-native-heroicons/outline";
import DiaperHeader from "../components/diaperHeader";

export function DiaperTimelineScreen(){
    const { updateKeys } = React.useContext(AuthContext);
    const [diaperList, setDiaperList] = React.useState([]);
    const navigation = useNavigation();
    useEffect(() => {
        getAll();
    }, []);

    const getAll = async () => {
        const currentDate = new Date().toISOString().slice(0, 10);
        const apiURL = BASE_URL + "/api/diaper/getAll/" + currentDate;
        try {
            await updateKeys();
            const response = await axios.get(apiURL, null);
            const diaperChanges = response.data;
            console.log(diaperChanges);
            setDiaperList({
                diaperChanges: diaperChanges.map((diaperChange) => ({
                    id: diaperChange.diaperID,
                    lastDiaperChange: new Date(diaperChange.date).toLocaleString(undefined, {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                    }),
                    diaperType : diaperChange.diaper_type,
                    color : diaperChange.stool_color,
                    humidity: diaperChange.humidity,
                    notes: diaperChange.additionalNotes
                })),
            });
            console.log(diaperList);
        } catch (e) {
            console.log(e);
        }
    }

    const renderItem = ({ item }) => (
        <View className={"flex flex-row items-center px-2 border m-2 rounded-2xl border-secondary"}>
            <Image className={"h-8 w-8"} source={require("../assets/images/diapers.png")}/>
            <View className={"flex-1 flex-col p-2"}>
                <View>
                    <Text className={"text-2xl font-bold opacity-70"}>{item.lastDiaperChange}</Text>
                </View>
                <View className={"flex flex-row justify-between"}>
                    <Text className={"px-1"}>Humidity : {item.humidity}</Text>
                    <View className={"flex flex-row"}>
                        <Text className={"px-1"}>{item.diaperType}</Text>
                        <TouchableOpacity
                            style={[
                                styles.colorCircle,
                                { backgroundColor: item.color, borderColor: "transparent" },
                            ]}
                        />
                    </View>
                </View>
                {item.notes !== "" ? <Text className={"px-1"}>Additional Notes : {item.notes}</Text> : null}
            </View>
        </View>
    );

    return(
        <SafeAreaView>
            <DiaperHeader screen={"DiaperScreen"} />
            <View className={"flex flex-row justify-center"}>
                <Text className={"font-bold text-2xl"}>Diaper Changes Timeline</Text>
            </View>
            <FlatList
                style={{height: "78%"}}
                data={diaperList.diaperChanges}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
            <View className={"shadow pb-2"}>
                <Pressable onPress={() => navigation.navigate("DiaperScreen")}>
                    <View className={"flex items-center h-50 border-2 bg-primary p-2 mx-8 my-1 rounded-full border-secondary"}>
                        <View className={"flex flex-row items-center justify-center"}>
                            <Text className={"pl-4 font-bold text-base"} style={{color:"white"}}>Add New Diaper Change</Text>
                        </View>
                    </View>
                </Pressable>
            </View>
            <TouchableOpacity
                className={"absolute bottom-64 right-5 rounded-full p-1"}
                style={{backgroundColor:themeColors.btnColor}}
                onPress={() => navigation.navigate('DiaperBarChart')}
            >
                <ChartBarSquareIcon size="40" color="white" />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
    },
    colorPreview: {
        width: 50,
        height: 50,
        marginTop: 10,
    },
    selectedColorText: {
        marginTop: 10,
        fontSize: 16,
    },
    colorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    colorCircle: {
        width: 20,
        height: 20,
        borderRadius: 30,
        borderWidth: 3,
        borderColor: '',
        marginHorizontal: 10,
    },
});