import React, { useState } from 'react';
import { View, TextInput,Text,Image,TouchableOpacity,StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import RadioBtn from '../components/RadioButtons';
import Input from "../components/Growth/Input";
import DateTimePicker from "../components/Form Component/DateTimePicker";
import Dropdown from "../components/Form Component/Dropdown";
import Button from "../components/UI/Button";
import {ArrowLeftIcon} from "react-native-heroicons/outline";

export function Reminders() {
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const navigation = useNavigation();
    const [isVisibleDropdown, setVisibleDropdown] = useState(false);
    const [selectedOption,setSelectedOption] = useState('once');

    const [inputs, setInputs] = useState({
        title: {
            value: '',
            isValid: true,
        },
        date:{
            value: '',
            isValid: true,
        },
        option1: {
            value: '',
            isValid: true,
        },
        option2: {
            value: '',
            isValid: true,
        },
    });
    function inputChangedHandler(inputIdentifier, enteredValue) {
        setInputs((curinputs) => {
            return {
                ...curinputs,
                [inputIdentifier]: {value:enteredValue, isValid:true},
            };
        });

    }

    function submintHandler(){
        console.log(inputs);
    }
    const handleRadioChange = (value) => {
        setVisibleDropdown(value);
    }
    const object = [
        {key:'1', value:'Daily'},
        {key:'2', value:'Once a week'},
        {key:'3', value:'Once a month'},
        {key:'4', value:'Once a year'}
    ]

    return (
   <SafeAreaView >
       {/*Title*/}
       <View className={"flex-row justify-center my-1 mt-5"}>
           <Text className={"flex-row justify-center text-2xl text-gray-500"}
                 style={styles.title}
           >Create Event</Text>
       </View>

         {/*Main Form*/}
        <View className={'mt-5 flex space-y-3'}>
            <Input
                label="Title"
                // invalid ={!inputs.weight.isValid}
                textInputConfig={{
                    placeholder: 'Title',
                    onChangeText: inputChangedHandler.bind(this, 'title'),
                }}
            />

            {/*Date time picker*/}
           <View className={''}>
               <DateTimePicker
                   mode='date'
                   lable={"Date"}
                   inputHandler={inputChangedHandler}
               />
           </View>


            {/*first Dropdown */}
            <View className={" my-1 mx-8 flex-1Z"}>
                <Text style={[styles.label]} className={"text-xs mb-2"}>Select Option</Text>
                <Dropdown data={object} inputHandler={inputChangedHandler} keyName={"option1"}/>
            </View>

            {/*Radio button*/}
            <View className = " my-1 mx-8 flex-1Z">
                <Text style={[styles.label]} className={"text-xs mb-2"}>Event frequency</Text>
                   <RadioBtn selectedOption={selectedOption} handleRadioChange={handleRadioChange}/>
            </View>

            {/*second Dropdown*/}
           {isVisibleDropdown&&
               <View className = " my-1 mx-8 flex-1Z">
                   <Text style={[styles.label]} className={"text-xs mb-2"}>Select Option</Text>
                   <Dropdown data={object} inputHandler={inputChangedHandler} keyName={"option2"}/>
               </View>
           }

        </View>


       {/*Confirmation button*/}
        <View className="mt-4 flex-row items-center justify-center space-x-4 px-8">
            <Button className={"flex-1"} style={styles.button} mode="flat">
                Cancel
            </Button>

            <Button
                title=""
                className={'flex-1'}
                onPress={submintHandler}
            >
                Save
            </Button>
        </View>

       {/*Back button on the top left corner*/}
       <TouchableOpacity
           className={"absolute top-12 left-5 rounded-full p-1"}
           style={{backgroundColor:themeColors.colorDark}}
           onPress={() => navigation.goBack()}
       >
           <ArrowLeftIcon size="22" color="white"  />
       </TouchableOpacity>

    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        // backgroundColor: GlobalStyles.colors.primary800,
    },
    title: {
        color: themeColors.colorDark,
    },
    label: {
        color: themeColors.colorDark,
    }
});
