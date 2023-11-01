import SelectDateTime from "../SelectDateTime";
import {FlatList, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {TrashIcon} from "react-native-heroicons/outline";
import {PencilSquareIcon} from "react-native-heroicons/solid";
import {ReactionsList} from "../ReactionsList";
// import Input from "../../Form Component/Input";
import React, {createContext, useContext, useEffect, useState} from "react";
import {solidfoodContext} from "../SolidFood";
import {useNavigation} from "@react-navigation/native";
import {themeColors} from "../../../theme";
import {GlobalStyles} from "../../../constants/styles";
import {BASE_URL} from "../../../config";
import axios from "axios";
import {  FormControl, Input, } from "native-base";
import {AuthContext} from "../../../Context/AuthContext";

export function SaveFood(vegeArray){
    let inputVegArray = vegeArray.vegeArray;
    const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
    const [startTime, setStartTime] = useState('');
    const [reaction, setReaction] = useState('');
    const [notes, setNotes] = useState('');
    const [mixtureName, setMixtureName] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    let navigation = useNavigation();
    const [vegArray, setVegArray] = useState([]);
    const [count, setCount] = useState(23);
    const { updateKeys } = useContext(AuthContext);
    useEffect(() => {
       setVegArray(inputVegArray);

    }, [inputVegArray]);

    const showModal = () => {
        setModalVisible(!modalVisible);
    }
    const clearAll = () => {
        console.log("mixture name: ",mixtureName,notes,reaction);
        setModalVisible(!modalVisible);
        navigation.navigate('Sfeeding');
    }
    const deleteItem = (id) => {

        inputVegArray = vegArray.filter(item => item.id !== id);
        setVegArray(inputVegArray);

    }
    const SaveData = async () => {


        setCount(count+1);
        const feedingTime = startTime;
        const feedingDate = startDate;
        // const quantity = startDate;
        const additionalNotes = notes;
        const foodFeedingID= count;
        const data = {
            foodFeedingID,
            feedingTime,
            feedingDate,
            reaction,
            additionalNotes,
            mixtureName

        };

        for(let i in vegArray){



            const quantity = vegArray[i].Quantity;
            const units = vegArray[i].Units;
            const ingredientsDTO = {
                "ingredientID": vegArray[i].id,
                "name": vegArray[i].Name,
                "category": vegArray[i].category,
                "image": vegArray[i].Name,
            };
            const foodfeedingDTO = data;

            const tempData = {
                quantity,
                units,
                ingredientsDTO,
                foodfeedingDTO
            }
            try {
                // Wait for each storeData call to finish before proceeding
                const result = await storeData(tempData);
                console.log("result: ", result);
            } catch (error) {
                console.error("Error:", error);
                // Handle the error as needed
            }
        }





    };

    const storeData = async (data) => {
        await updateKeys();
        const apiUrl = BASE_URL+ '/foodingredient/add';
        try{
            const response = await axios.post(apiUrl, data);
            console.log(response.data);
        }catch (e) {
            console.log("Food Feeding error: ",e);
        }
    }

    // callback function to update reaction list
    const updateReactions = (reaction) => {
        setReaction(reaction);

    }
    const handleText = (text) => setNotes(text);
    const handleNameText = (text) => setMixtureName(text);
    return(
        <>
        <View className={"px-3"}>
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
                <SelectDateTime />
            </solidfoodContext.Provider>
            <Text style={[styles.label]} className={"text-center"}>
                Selected items
            </Text>
            <View className={" p-5 rounded-xl  m-3"} style={{width:'80%',backgroundColor:'white' ,alignSelf:'center'}}>

                <FlatList data={vegArray}  keyExtractor={(item) => item.id} showsHorizontalScrollIndicator={false} renderItem={({item})=> (
                    <View className={"flex-row justify-around m-1"} >
                        <Text>{item.Name}</Text>
                        <Text>{item.Quantity} {item.Units}</Text>
                        <View  className={"flex-row  gap-2"}>
                            <TouchableOpacity onPress={()=>deleteItem(item.id)} >
                                <TrashIcon size="23" color="red" />
                            </TouchableOpacity>
                            {/*<TouchableOpacity>*/}
                            {/*    <PencilSquareIcon size="23" color="black" />*/}
                            {/*</TouchableOpacity>*/}
                        </View>

                    </View>
                )}
                />

            </View>


            <Text style={[styles.label ]} className={"text-center mb-2"}>Add a Reaction </Text>

            <ReactionsList updateReactions={updateReactions}/>
            <View>
                <FormControl>
                    <FormControl.Label>Notes</FormControl.Label>
                    <Input value={notes} onChangeText={handleText}   multiline={true}   numberOfLines={4} isRequired={true}/>
                </FormControl>
            </View>
            <TouchableOpacity style={styles.savebtn} onPress={()=>showModal()}>
                <Text  style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
        </View>

    <View style={styles.centeredView}>
        <Modal

            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <View style={{...styles.modalView}}>

                <View className={"flex-row"}>
                    <FormControl>
                        <FormControl.Label>Enter Name for the Mixture</FormControl.Label>
                        <Input value={mixtureName} onChangeText={handleNameText} isRequired={true}/>
                    </FormControl>

                </View>
                <View className={"flex-1 flex-row gap-4 my-2"}>

                    <Pressable
                        style={styles.Button}
                        onPress={() => SaveData()}
                    >
                        <Text   style={{color:'white',alignSelf:'center'}}>Done</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    </View>
  </>
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

