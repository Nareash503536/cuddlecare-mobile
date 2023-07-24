import React, { useState } from 'react';
import { View, TextInput,Text,Image,Button,TouchableOpacity,StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import AddRemindersButton from '../components/AddRemindersButton';



export function RemindersList() {

        const navigation = useNavigation();

    return (
 <SafeAreaView className={"p-5"}>
       <View className={"flex-column space-x-1"}>
             <Text className={"p-5 text-center font-bold text-lg"}>RemindersList</Text>

           <View className={"p-5 items-center"}>
               <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate('Reminders')}>
                     <Text className="white font-bold">Add Reminders</Text>
               </TouchableOpacity>
           </View>

           <View className={"space-y-0"}>
               <TouchableOpacity  style={styles.Notification} onPress={() => navigation.navigate('ReminderDetails')}>
                  <View className={"bg-[#BADEE3]"}>
                     <Text className={"ml-72"}>Today</Text>
                     <Text className={"p-5"}>lorem dnnm jefqwfjk kwjfkwjf  wjnfkwd wjfwj jwfnwfn wjwndjd</Text>
                 </View>
              </TouchableOpacity>


                <TouchableOpacity style={styles.Notification} onPress={() => navigation.navigate('')}>
                  <View className={"bg-[#BADEE3]"}>
                     <Text className={"ml-72"}>1d</Text>
                     <Text className={"p-5"}>lorem dnnm jefqwfjk kwjfkwjf  wjnfkwd wjfwj jwfnwfn wjwndjd</Text>
                  </View>
                </TouchableOpacity>

                 <TouchableOpacity  style={styles.Notification} onPress={() => navigation.navigate('')}>
                     <View className={"bg-[#BADEE3]"}>
                           <Text className={"ml-72"}>Today</Text>
                           <Text className={"p-5"}>lorem dnnm jefqwfjk kwjfkwjf  wjnfkwd wjfwj jwfnwfn wjwndjd</Text>
                     </View>
                 </TouchableOpacity>


                 <TouchableOpacity style={styles.Notification} onPress={() => navigation.navigate('')}>
                       <View className={"bg-[#BADEE3]"}>
                            <Text className={"ml-72"}>1d</Text>
                            <Text className={"p-5"}>lorem dnnm jefqwfjk kwjfkwjf  wjnfkwd wjfwj jwfnwfn wjwndjd</Text>
                       </View>
                 </TouchableOpacity>


          </View>
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
       },

//         Notification:{
//           backgroundColor:rgb(204,251,241),
//           width:full,
////           border:1px solid black,
////           border-top-width:3px,
////           border-bottom-width:3px,
//           border-color:'rgb(0,0,0)',
//
//    }

    Notification:{

    borderColor:'#115e59',
        paddingBottom:5,
    }
  });