import {View, Text, FlatList, TouchableOpacity, Image, Modal, Pressable, StyleSheet} from "react-native";
import {VegetablesListSet} from "../Lists/VegetablesListSet";

import React, {useState} from "react";
import {PlusIcon} from "react-native-heroicons/solid";
import {themeColors} from "../../../theme";
import Input from "../../Growth/Input";
import DropdownComponent from "../DropdownComponent";

import {COLORS} from "../../../constants/theme";
import images from "../../../constants/images";

export default function VegetablesList(){
    const [vegetableArray, setVegetableArray] =useState([]);
    const [modalVisible, setModalVisible] = useState(false);
const datas = [
            { label: 'mg', value: 'MilliGram' },
            { label: 'g', value: 'Grams' },
            { label: 'kg', value: 'Kilograms' },
            { label: 'ml', value: 'Milliliters' },
            { label: 'l', value: 'Liters' },
            { label: 'cup', value: 'cup' },

    ];
    const [items, setitems] = useState({
        Item: {
            Quantity:0,
            Units:'',
            Name: '',
        },
    });
    const handleCategoryChange = (name ,value) => {
console.log("name is here",name,"value is here",value);
        setitems({...items,[name]:value});
    }
    const handleQuantityChange = (item,value) => {

            setitems({...items,[Quantity]:value,[Name]:item});
    }
    const AddVegetable = (id) => {

        if (vegetableArray.includes(id)) {

            const updatedArray = vegetableArray.filter(vegetableId => vegetableId !== id);
            setVegetableArray(updatedArray);
        } else {

            setVegetableArray([...vegetableArray, id]);
             setModalVisible(!modalVisible);
        }
    }
    return(
        <View className={"flex-col"}>
            {/*<TouchableOpacity   className={"  w-20 h-20  rounded-full  justify-center border-2"}  style={{transform:[{scale:0.8}],borderColor:themeColors.btnColor}} >*/}
            {/*    <PlusIcon  style={{color:"black",transform:[{scale:2}],alignSelf:'center'}} />*/}
            {/*    </TouchableOpacity>*/}
           <FlatList
           data={VegetablesListSet}


           keyExtractor={(item) => item.id}

           renderItem={({item})=> (
               <View
                   className={"p-1 mx-4 w-14 h-36 flex-wrap"}
                   style={{
                       borderRadius: 10
                   }}
               >
                       <TouchableOpacity    className={"m-2.5 flex-col justify-center items-center"} onPress={()=>AddVegetable(item.id)} >
                           <Image  source={item.image}
                                   className={"w-20 h-20  rounded-full "}
                                   style={{transform:[{scale:0.8}]}}/>
                           <Text>
                               {item.name}
                           </Text>
                           {
                               vegetableArray.includes(item.id) ?
                                   <Image
                                       source={images.accept}
                                       className={"w-5 h-5 mx-auto absolute"}
                                   />
                                   : null
                           }
                       </TouchableOpacity>
                   </View>
               )}
           numColumns={4}

           />
            <View className={"flex-row justify-around items-center"} style={{backgroundColor:'white',height:60}}>
                <Text className={"text-xl "} style={{color:COLORS.gray}}>Total items: {vegetableArray.length}</Text>
                <Pressable
                    style={styles.Button1}
                    >
                    <Text   style={{color:'white',alignSelf:'center'}}>Save</Text>
                </Pressable>
            </View>
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
                                label="Enter Quantity"

                                textInputConfig={{
                                    keyboardType: 'decimal-pad',
                                    placeholder: '0.00',
                                     onChangeText: inputChangedHandler.bind(this, 'amount'),


                                }}
                            />
                            <DropdownComponent   onCategorySelect={handleCategoryChange}    style={styles.drop}  data={datas} name='Units' defaultval = {null}  />
                            </View>
                            <View className={"flex-1 flex-row gap-4 my-2"}>
                                <Pressable
                                    style={styles.cancel}
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Text   style={{color:themeColors.btnColor,alignSelf:'center'}}>Cancel</Text>
                                </Pressable>
                                <Pressable
                                    style={styles.Button}
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Text   style={{color:'white',alignSelf:'center'}}>Done</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                </View>

        </View>
    )
}
const styles = StyleSheet.create({
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
    Button:{
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width:80,
        textAlign:'center',
        height:40,
        backgroundColor:themeColors.btnColor,
        // borderColor:'grey'
    },
    Button1:{
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        width:80,
        textAlign:'center',
        height:40,
        backgroundColor:themeColors.btnColor,
        // borderColor:'grey'
    },

});