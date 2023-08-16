import React, {createContext, useState} from "react";
import {FlatList, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {DateAndTime} from "./DateAndTime";
import {FoodList} from "./FoodList";
import {ReactionsList} from "./ReactionsList";
import {SafeAreaView} from "react-native-safe-area-context";
import Input from "../Form Component/Input";
import {themeColors} from "../../theme";
import {GlobalStyles} from "../../constants/styles";
import SelectDateTime from "./SelectDateTime";
import {useNavigation, useRoute} from "@react-navigation/native";
import {FoodListSet} from "./Lists/foodListSet";
import {TrashIcon} from "react-native-heroicons/outline";
import {PencilSquareIcon} from "react-native-heroicons/solid";
import DropdownComponent from "./DropdownComponent";

export const solidfoodContext = createContext();
export function SolidFood() {
    const route = useRoute();
    console.log("route params here",route.params);
    let { vegetableArray: vegArray } = route.params || {};
    console.log("veg Array", vegArray);

    const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
    const [startTime, setStartTime] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    let navigation = useNavigation();

    const inputStyles = [styles.input];
    const textInputConfig = {
        keyboardType: 'decimal-pad',
        placeholder:'0.0 ml',
        multiline: true,

    }
    const showModal = () => {
        setModalVisible(!modalVisible);
    }
    const clearAll = () => {
        setModalVisible(!modalVisible);
        navigation.navigate('Sfeeding');
    }

    if (textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.inputMultiline)
    }
    return (
        <solidfoodContext.Provider value={{
            isStartDatePickerVisible,
            setStartDatePickerVisible,
            startDate,
            setStartDate,
            isStartTimePickerVisible,
            setStartTimePickerVisible,
            startTime,
            setStartTime
        }}>
        <SafeAreaView className={"px-3"}>
            <ScrollView>

                {vegArray ? (
                    <View className={"px-3"}>
                        <SelectDateTime />
                        <Text style={[styles.label]} className={"text-center"}>
                           Selected items
                        </Text>
                        <View className={" p-5 rounded-xl  m-3"} style={{width:'80%',backgroundColor:'white' ,alignSelf:'center'}}>

                            <FlatList data={vegArray}  keyExtractor={(item) => item.id} showsHorizontalScrollIndicator={false} renderItem={({item})=> (
                                <View className={"flex-row justify-around m-1"} >
                                    <Text>{item.Name}</Text>
                                    <Text>{item.Quantity} {item.Units}</Text>
                                    <View  className={"flex-row  gap-2"}>
                                        <TouchableOpacity >
                                            <TrashIcon size="23" color="red" />
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <PencilSquareIcon size="23" color="black" />
                                        </TouchableOpacity>
                                    </View>

                                </View>
                                )}
                                      />

                        </View>


                <Text style={[styles.label ]} className={"text-center mb-2"}>Add a Reaction </Text>

                <ReactionsList/>
                <View>
                    <Input
                        label="Notes"
                        // invalid ={!inputs.notes.isValid}
                        textInputConfig={{
                            multiline: true,
                            // onChangeText: inputChangedHandler.bind(this, 'notes'),
                            // value: inputs.notes.value,


                        }}
                    />
                </View>
                <TouchableOpacity style={styles.savebtn} onPress={()=>showModal()}>
                    <Text  style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                    </View>

                ) : (
            <>

                <Text style={[styles.label]} className={"text-center mb-2"}>
                    Pick a Category
                </Text>

                <FoodList />
            </>
            )}
                <View style={styles.centeredView}>
                    <Modal

                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}>
                        <View style={{...styles.modalView}}>
                            {/*<Text>Enter Quantity: </Text>*/}
                            <View className={"flex-row"}>
                                <Input
                                    label="Enter Name for the Mixture"

                                />
                            </View>
                            <View className={"flex-1 flex-row gap-4 my-2"}>

                                <Pressable
                                    style={styles.Button}
                                    onPress={() => clearAll()}
                                    >
                                    <Text   style={{color:'white',alignSelf:'center'}}>Done</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                </View>
            </ScrollView>
        </SafeAreaView>
        </solidfoodContext.Provider>
    )
}
const styles = StyleSheet.create({
    savebtn:{
        width: "100%",
        height: 50,
        borderRadius: 4,
        padding: 8,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: themeColors.colorDark,
        marginBottom: 20,


    },

    buttonText: {
        color: 'white',
        fontSize: 20,

    },
    label: {
        color: themeColors.colorDark,
        fontSize: 18,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(128, 128, 128, 0.5)',
        borderRadius: 10,
    },
    input: {
        backgroundColor: themeColors.bgInput(0.1),
        color: GlobalStyles.colors.primary700,
        width: 300,
        alignSelf: 'center',
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top'
    },
    inbalidLable: {
        color: GlobalStyles.colors.error500
    },
    invalidInput: {
        backgroundColor:themeColors.bgInputDager(0.2),
    },
    babyimg: {
        width: 200,
        height: 250,
        alignSelf: 'center',
        transform:[{scale:0.8}],
    },
    Button:{
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        width:80,
        textAlign:'center',
        height:40,
        backgroundColor:themeColors.btnColor,
        // borderColor:'grey'
    },
    bottleDiv:{
        backgroundColor:themeColors.colorDark,
        borderRadius: 10,
        padding: 3,
        transform:[{scale:0.9}],
        width: 150,

    },
    bottleText:{
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        bottom: 10,
    },
    drop:{
        width:100,
        marginTop:20,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    cancel:{
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width:80,
        backgroundColor:'white',
        borderColor:'themeColors.btnColor'
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        position:'absolute',
        top:'35%',
        alignSelf:'center'

    },

});