import React, { useState } from 'react';
import { View, TextInput,Text,Image,Button,TouchableOpacity,StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import RadioBtn from '../components/RadioButtons';
import Dropdown from '../components/Dropdown';

import moment from 'moment';
// import ToggleSwitch from 'toggle-switch-react-native'



export function Reminders() {
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const navigation = useNavigation();
    const [isVisibleDropdown, setVisibleDropdown] = useState(false);


    //const [showPicker, setShowPicker] = useState(false);

    const [selectedOption,setSelectedOption] = useState('once');

    const handleRadioChange = (value) => {
      // setSelectedOption(value)
        setVisibleDropdown(value);
    }
    const object = [
        {key:'1', value:'Daily'},
        {key:'2', value:'Once a week'},
        {key:'3', value:'Once a month'},
        {key:'4', value:'Once a year'}
    ]

    return (
   <SafeAreaView className={"p-5"}>

        <View className={" items-center  "}>


           <Text className={"font-bold text-lg "}>Create Event</Text>
           
        </View>    


        <View className={"p-5"}>
              {/* <Image source={require('../assets/images/calendar.png')}
                               style={{width:300,height:150}} /> */}
                <Text className={"font-bold text-sm"}>Event Title</Text>
                <View className={"border border-[#7AABAF]  p-1 rounded-full"}>
                  <TextInput className="border-0 w-50 h-30 text-base"></TextInput>
                </View>
        </View>


        <View className={"p-5 flex-row items-center space-x-1"}>

            <View className={"flex-col"}>
                <Text className={"text-sm font-bold p-1"}>Event Date and Time</Text>

                <View className={"border w-50 h-30 border-teal-300 p-1 rounded-full flex-col"}>
                   <TextInput
                    className={" p-3 w-75"}
                    value={date.toDateString()}
                    onFocus={() => setShowPicker(true)}
                   />
               </View>
               
           
           
           
           
            
                 {showPicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                minimumDate={new Date()}
                className={" p-3 "}
                onChange={(event, selectedDate) => {
                    const currentDate = selectedDate || date;
                    setShowPicker(false);
                    setDate(currentDate);
                  }}
                  />
                 )}

                 {/* <Button class="rounded-full" title='Save Changes' color={"7AABAF"}></Button> */}

            
                
            </View>   
        </View>

              <View className={"border border-teal-300"}>
                     <Dropdown data={object} />
                </View>
        
        <View className = "p- m-5">
               <Text className={"font-bold text-sm"}>Event frequency</Text>
               <RadioBtn selectedOption={selectedOption} handleRadioChange={handleRadioChange}/>
        </View>

       {isVisibleDropdown&&
           <View>
               <Dropdown data={object}  enabled={selectedOption === "repeat"} />
           </View>
       }

        <View className="p-10">
               {/* <Button class= "py-3 px-2 text-black bg-teal-500 font-bold" title='Set Reminder'></Button>  */}
          
               <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate('RemindersList')}>
                     <Text className="white">Save</Text>
               </TouchableOpacity>
          
        </View>  
    </SafeAreaView>

  )
}


const styles = StyleSheet.create({
       Button:{
        alignItems:'center',
        padding:10,
        borderRadius:20,
        width:250,
        backgroundColor:'#BADEE3',
       }      
    })



