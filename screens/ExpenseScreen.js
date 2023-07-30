import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

import React, {useEffect, useState} from 'react'

import {useNavigation} from "@react-navigation/native";
// import {ExpenseApi, ExpenseApiTotalExpense,ExpenseApiTotalIncome} from "../Api/ExpenseApi";

import { SafeAreaView } from 'react-native-safe-area-context';
import FAB from 'react-native-fab'
import {themeColors} from "../theme";
import {CakeIcon, CheckIcon, PlusSmallIcon} from "react-native-heroicons/solid";

export function ExpenseScreen (){
    let navigation = useNavigation();
    const [expenseDetails, setexpenseDetails] = useState(null);
    const [TotalExpense, setTotalExpense] = useState(0);
    const [TotalIncome, setTotalIncome] = useState(0);
    useEffect(() => {
        fetchExpense();
        gettotalExpense();
        gettotalIncome();
    },[]);
    const fetchExpense = async () => {
        try {
            const response = await ExpenseApi();
            setexpenseDetails(response);
        } catch (e) {
            console.log(e);
        }
    };
    const gettotalExpense = async () => {
        try {
            const response = await ExpenseApiTotalExpense();
            setTotalExpense(response);
        } catch (e) {
            console.log(e);
        }
    };
    const gettotalIncome = async () => {
        try {
            const response = await ExpenseApiTotalIncome();
            setTotalIncome(response);
        } catch (e) {
            console.log(e);
        }
    };
    const ExpenseNames ={
        Cloths:'cart',Travel:'train',Medical:'pulse',Diaper:'paw',Food:'pizza',Others:'bicycle'
    };

    console.log(ExpenseNames['Shopping']);
    return (
<SafeAreaView style={{backgroundColor: '#f3f5f7'}}  className={"flex-1 relative"} >

        <View className={"flex-1 relative "}>

                            <View style={{

                                alignItems:'center',
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                            }}>
                                <LinearGradient colors={['#56b1da','#badee3','#82e0ed']} style={{...styles.Box}}>
                                    <View style={{width:'100%',flexDirection:'column'}}>
                                        <View style={{width:'100%',alignItems:'center'}}>
                                            <Text
                                                style={{
                                                    color:'white',
                                                    fontSize: 15,

                                                    fontWeight: '600',

                                            }}>
                                                Current Balance
                                            </Text>
                                            <Text style={{fontFamily:''}}></Text>
                                            <Text style={{color:'white',fontSize: 32,fontWeight: 700}}>Rs.{TotalIncome-TotalExpense}</Text>

                                        </View>
                                        <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between'}}>
                                                <View style={{ marginLeft: 10}}>
                                                    <Text style={{
                                                        color:'white',


                                                        fontSize: 18,
                                                        fontWeight: '700'}} >Income</Text>
                                                    <Text style={{
                                                        color:'white',


                                                        fontSize: 18,
                                                        fontWeight: '700'}}>Rs.{TotalIncome}</Text>
                                                </View>
                                                <View style={{ marginRight: 10}}>
                                                    <Text style={{
                                                        color:'white',


                                                        fontSize: 18,
                                                        fontWeight: '700'}}>Expenses</Text>
                                                    <Text style={{
                                                        color:'white',

                                                        fontSize: 18,
                                                        fontWeight: '700'}}>Rs.{TotalExpense}</Text>
                                                </View>
                                        </View>
                                    </View>



                                </LinearGradient>

                            </View>
                <View style={{

                    paddingVertical: 10,
                    paddingHorizontal: 20,
                }} className={"flex-1  gap-5"}>


                    <View style={{ flexDirection: 'row', justifyContent: 'space-between',  position:'relative'}}>
                    <View>
                    <Text style={{
                        color:'black',


                        fontSize: 20,
                        fontWeight: '800'}}>Transactions </Text>
                    </View>
                    <View>
                        <Text style={{
                            color:'rgb(3 105 161)',

                            fontSize: 15,
                            fontWeight: '500'}}>View All </Text>
                    </View>
                    </View>

                        {expenseDetails && (
                            <FlatList
                                data={expenseDetails}
                                keyExtractor={(item) => item.expenseID.toString()}
                                renderItem={({ item }) => (

                                        <TouchableOpacity  style={{...styles.btn}}>
                                            <View style={{ flexDirection: 'row',gap:10}}>
                                                <TouchableOpacity className={"rounded-full p-2 border border-white"}>
                                                    <CakeIcon size="27" color="white"  />
                                                </TouchableOpacity>
                                                <View>
                                                <Text
                                                    style={{
                                                        paddingTop:5,

                                                        fontSize: 18,
                                                        fontWeight: '700',
                                                        textAlign:'left'
                                                    }}
                                                > {item.expenseName}</Text>

                                                <Text style={{color:'gray',
                                                    paddingTop:5,
                                                    paddingLeft:5,
                                                    width:150,
                                                    textAlign:'left',}}>{item.notes}</Text>
                                                </View>
                                            </View>

                                            <View>
                                                <Text>Rs.{item.amount}</Text>
                                                <Text style={{color:'gray'}}>{new Date(item.date).toLocaleDateString()}</Text>
                                            </View>

                                        </TouchableOpacity>
                                )}
                            />
                        )}
                        <TouchableOpacity  style={{...styles.btn}} className={"flex-row justify-between"}>
                            <View style={{ flexDirection: 'row'}}>
                                <TouchableOpacity className={"rounded-full p-3  "} style={{backgroundColor:'#82AAED'}}>
                                    <CakeIcon size="27" color="white"  />
                                </TouchableOpacity>
                                <View className={"left-2"}>
                                    <Text
                                        style={{


                                            fontSize: 18,
                                            fontWeight: '700',
                                            textAlign:'left'
                                        }}
                                    > pizza</Text>

                                    <Text style={{color:'gray',

                                        paddingLeft:5,
                                        width:150,
                                        textAlign:'left',}}>at pizzaria</Text>
                                </View>
                            </View>

                            <View className={" p-1"}>
                                <Text>Rs.2500</Text>
                                <Text style={{color:'gray'}}>3/7/2021</Text>
                            </View>

                        </TouchableOpacity>
                    <TouchableOpacity  style={{...styles.btn}} className={"flex-row justify-between"}>
                        <View style={{ flexDirection: 'row'}}>
                            <TouchableOpacity className={"rounded-full p-3 "} style={{backgroundColor:'#82AAED'}}>
                                <CakeIcon size="27" color="white"  />
                            </TouchableOpacity>
                            <View className={"left-2"}>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        fontWeight: '700',
                                        textAlign:'left'
                                    }}
                                > pizza</Text>

                                <Text style={{color:'gray',

                                    paddingLeft:5,
                                    width:150,
                                    textAlign:'left',}}>at pizzaria</Text>
                            </View>
                        </View>

                        <View className={" p-1"}>
                            <Text>Rs.2500</Text>
                            <Text style={{color:'gray'}}>3/7/2021</Text>
                        </View>

                    </TouchableOpacity>
                </View>
            <TouchableOpacity
                className={"absolute bottom-10 right-5 rounded-full p-1"}
                style={{backgroundColor:themeColors.btnColor,position:'absolute'}}
                onPress={() => navigation.navigate('ExpenseForm')}
            >
                <PlusSmallIcon size="40" color="white"  />
            </TouchableOpacity>

        </View>

</SafeAreaView>
    );
}
const styles = StyleSheet.create({
    Box:{
        width:'100%',
        height:200,
        borderRadius: 15,
        flexDirection: 'row',
        padding: 22,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowRadius: 4,

    },
    btn:{
        backgroundColor:'white',
        minHeight:80,
        borderRadius: 15,
        padding: 22,

    },

})