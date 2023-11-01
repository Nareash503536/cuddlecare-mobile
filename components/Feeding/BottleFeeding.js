import React, {useContext, useEffect, useState} from "react";
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import Input from "../Growth/Input";
import {themeColors} from "../../theme";
import {GlobalStyles} from "../../constants/styles";

import {getFormattedDate} from "../../util/date";
import {ChevronRightIcon, ChevronLeftIcon, PencilSquareIcon, ArrowTrendingUpIcon} from "react-native-heroicons/solid";
import {DateAndTime} from "./DateAndTime";
import DateTimePicker from "./DateTimePicker";
import {BASE_URL} from "../../config";
import axios from "axios";
import {AuthContext} from "../../Context/AuthContext";
import {ApiManager} from "../../Api/ApiManager";
import Toast from "react-native-toast-message";
import {ChartBarSquareIcon} from "react-native-heroicons/outline";
import {useNavigation} from "@react-navigation/native";


export function BottleFeeding() {
    console.log("this is something");
    const {updateKeys,baby} = useContext(AuthContext);
const [imagecount, setImagecount] = useState(0);
const [category,setCategory]=useState('');
    let navigation = useNavigation();
    const [inputs, setInputs] = useState({
        quantity: {
            value: '',
            isValid: true,
        },
        time: {
            value: '',
            isValid: true,
        },
        category: {
            value: '',
            isValid: true,
        },

        date: {
            value:new Date(),

            isValid: true,
        },
        notes: {
            value:'',
            isValid: true,
        },


    });
    const PostFeeding = async () => {

        await updateKeys();
        if(imagecount === 1){
            setCategory( 'Formula Milk');

        }else{
            setCategory("Pumped Milk");
        }

        const apiURL = BASE_URL + "/bottlefeeding/add";

        let Bottlefeeding = {
            quantity: +inputs.quantity.value,
            feedingTime: inputs.time.value,
            feedingType: category,
            feedingDate: inputs.date.value,
            baby: baby,
        }
        console.log("bottlefeeding data: ",Bottlefeeding);
        const jsonData = JSON.stringify(Bottlefeeding);
        const response = await axios.post(apiURL, jsonData, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            console.log(res);

                Toast.show({
                    type: "success",
                    text1: "Record saved",
                    text2: "Your Bottle Feeding record have been saved successfully",
                })
                console.log(response);

        }).catch((err) => {
            Toast.show({
                type: "error",
                text1: "Error saving records",
                text2: "There was an error saving your feeding record. Please try again.",
            })
            console.log(err);
        });
    }
    const getFeeding = async () => {
        await updateKeys();
        // console.log(inputs.amount.value, inputs.expenseName.value, inputs.notes.value,inputs.date.value);

        const apiURL = BASE_URL + "/bottlefeeding/all";

        try {
            const response = await ApiManager.get(apiURL,{
                headers: {
                    "Content-Type": "application/json",
                },

            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    const displayAllData = async () => {
        const data = await getFeeding();
        console.log("data: ", data);
    }

    function changeBottle(imageID){

        setImagecount(imageID);
        if(imageID === 1){
            setCategory( 'Formula Milk');

        }else{
            setCategory("Pumped Milk");
        }
        console.log("category",category);

    }
    function inputChangedHandler(inputIdentifier, enteredValue)
    {
        console.log("input changed handler: ",inputIdentifier,enteredValue)
        setInputs((curinputs) => {
            return {
                ...curinputs,
                [inputIdentifier]: {value:enteredValue, isValid:true},
            };
        });

    }
    const inputStyles = [styles.input];
const textInputConfig = {
    keyboardType: 'decimal-pad',
    placeholder:'0.0 ml',
    onChangeText: inputChangedHandler.bind(this, 'quantity'),
    value: inputs.quantity.value,
}
    if (textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.inputMultiline)
    }
    if(!inputs.quantity.isValid){
        inputStyles.push(styles.invalidInput)
    }
    return (
        <SafeAreaView className={"px-5"} >
            <View  className={"flex-row justify-around mb-6"} >
                <DateTimePicker
                    mode='Date'
                    lable={"Pick a Date"}
                    value={getFormattedDate(new Date())}
                    name={'date'}
                    inputHandler={inputChangedHandler}

                />
                <DateTimePicker
                    mode='time'
                    lable={"Pick a time"}
                    value='02:30 pm'
                    name={'time'}
                    inputHandler={inputChangedHandler}
                />
            </View>
<View   className={"flex-col align-middle justify-center  "}>
    <Text style={[styles.label,!inputs.quantity.isValid && styles.inbalidLable ]} className={"text-center mb-2"}>Choose a type </Text>

                <View className={"flex-row  justify-around"}>

                        {/*<ChevronLeftIcon style={{ alignSelf:'center'}} size={30} color='gray' onPress={() => changeBottle(1)} />*/}

                    <TouchableOpacity className={"flex-col"} style={styles.bottleDiv}  onPress={()=> changeBottle(1)}>
                            <Image
                                style={styles.babyimg}
                                source={require('../../assets/images/babybottle.png')}
                            />

                            {imagecount===1&&<View style={styles.overlay}></View>}
                            <Text className={"text-center"} style={styles.bottleText}>Formula Milk</Text>
                    </TouchableOpacity>


                    <TouchableOpacity className={"flex-col align-middle"} style={styles.bottleDiv} onPress={()=> changeBottle(2)}>
                    <Image
                        style={styles.babyimg}
                        source={require('../../assets/images/pumped4.png')}
                    />
                        {imagecount===2&&<View style={styles.overlay}></View>}
                    <Text className={"text-center"} style={styles.bottleText}>Pumped Milk</Text>
                    </TouchableOpacity>
                        {/*<ChevronRightIcon style={{ alignSelf:'center' }} size={30} color='gray' onPress={() => changeBottle(2)} />*/}


                </View>





        <View  className={"mt-10 flex-col justify-center my-1  mx-2"}>
            <Text style={[styles.label,!inputs.quantity.isValid && styles.inbalidLable ]} className={"text-center mb-1"}>Quantity </Text>
            <TextInput className={"p-5 w-40 rounded-3xl text-center text-lg"} style={inputStyles}
                       {...textInputConfig} />
        </View>

            {/*<View  style={{top:-20}}>*/}
            {/*    <Input*/}
            {/*        label="Notes"*/}
            {/*        invalid ={!inputs.notes.isValid}*/}
            {/*        textInputConfig={{*/}
            {/*            multiline: true,*/}
            {/*            onChangeText: inputChangedHandler.bind(this, 'notes'),*/}
            {/*            value: inputs.notes.value,*/}


            {/*        }}*/}
            {/*    />*/}
            {/*</View>*/}
            <TouchableOpacity style={styles.savebtn} onPress={()=>PostFeeding()}>
                <Text  style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
    <TouchableOpacity
        className={"absolute bottom-16 right-5 rounded-full p-1"}
        style={{backgroundColor:themeColors.btnColor}}
        onPress={() => navigation.navigate('BottleFeedTimeline')}
    >
        <ArrowTrendingUpIcon size="40" color="white"  />
    </TouchableOpacity>
</View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    savebtn:{
        width: "100%",
        height: 50,
        borderRadius: 4,
        padding: 8,
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: themeColors.colorDark,


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
    }

});