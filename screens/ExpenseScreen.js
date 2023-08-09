import {View, Text, StyleSheet, FlatList, TouchableOpacity, Image} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import React, {useEffect, useState} from 'react'
import {useNavigation} from "@react-navigation/native";
import {ExpenseApiTotalExpense, ExpenseApiTotalIncome, ExpenseFirstdate} from "../api/ExpenseApi";
import { SafeAreaView } from 'react-native-safe-area-context';
import {themeColors} from "../theme";
import {CalendarDaysIcon, PlusSmallIcon} from "react-native-heroicons/solid";
import {ExpenseApi} from "../api/ExpenseApi";
import {Bars3CenterLeftIcon} from "react-native-heroicons/mini";
import {BellIcon, ChartBarSquareIcon} from "react-native-heroicons/outline";
import {TopBar} from "../components/TopBar";
import {BudgetApi, BudgetApiTotalBudget, BudgetEnddate} from "../api/BudgetApi";
import CalendarPicker from "../components/CalendarPicker";
import InfoBars from "../components/Expense/InfoBars";
import {GlobalStyles} from "../constants/styles";
import DropdownComponent from "../components/Expense/DropdownComponent";
export function ExpenseScreen (){
    let navigation = useNavigation();
    const [expenseDetails, setexpenseDetails] = useState(null);
    const[budgetDetails, setbudgetDetails] = useState(null);
    const [TotalExpense, setTotalExpense] = useState(0);
    const [TotalIncome, setTotalIncome] = useState(null);
    const [Enddate, setEnddate] = useState(null);
    const [firstdate, setFirstdate] = useState(null);
    const[exception, setException] = useState("No data found");
    const [selectedDate, setSelectedDate] = useState(null);
    const [category, setCategory] = useState("Expense");

    const categories = [
        {label:'Expenses',value:'Expense'},
        {label:'Budget',value:'Budget'},
        ];

    const setDateFunction=(names,Sdate)=>{

        const getDate = new Date(Sdate).toLocaleDateString();
        setSelectedDate(getDate);

    }

    function StringtoDate(DateString){
    const [day,month,year] = DateString.split("/");
    const NewDate =year+"-"+month+"-"+day;
    const finalDate = new Date(NewDate);
    return finalDate.toDateString()


    }
    const setCategoryFunction=(names,value)=>{
        setCategory(value);
    }
    function compareDates (firstDate,secondDate) {
        console.log(firstDate,secondDate)
        if(firstDate.getFullYear()===secondDate.getFullYear()&& firstDate.getMonth()===secondDate.getMonth() && firstDate.getDate()===secondDate.getDate() ){
            return true;
        }
        const year = firstDate.getFullYear()<secondDate.getFullYear();
        if(year){
            return false;
        }
        const month =firstDate.getMonth()<secondDate.getMonth();
        if(month){
            return false;
        }
        const day = firstDate.getDate()>secondDate.getDate();
        if(day){
            return true;
        }
    return false;
    }
    // filter data according to date
    const dateFileteredExpense = expenseDetails?(selectedDate ? expenseDetails.filter((item) => new Date(item.date).toLocaleDateString() === selectedDate):expenseDetails):''
    function parseDateFromString(dateString) {
        const [ day,month, year] = dateString.split('/');

        return new Date(`${year}-${month}-${day}`);
    }
    function parseDateFromStrings(dateString) {
        const firstpart= dateString.split('T')[0];
        const [ day,month, year] = firstpart.split('-');

        return new Date(`${year}-${month}-${day}`);
    }
//filter budget according to date
    const dateFilteredBudget = budgetDetails?(selectedDate?budgetDetails.filter((item)=>
            compareDates( parseDateFromString(selectedDate), new Date(item.startdate))&&
                compareDates( new Date(item.enddate), parseDateFromString(selectedDate))

    ):budgetDetails):''


    //when data not fou
    const noDataFound = dateFileteredExpense?dateFileteredExpense.length === 0:false;
    const noDataFoundbudget = dateFilteredBudget?dateFilteredBudget.length === 0:false;

    useEffect(() => {
        fetchExpense();
        gettotalExpense();
        gettotalBudget();
        fetchBudget();
        fetchEnddate();
        fetchFirstdate();
    },[]);
    const fetchExpense = async () => {
        try {
            const response = await ExpenseApi();
            setexpenseDetails(response);
            console.log(response);
        } catch (e) {
            console.log("expense:"+e);
        }
    };
    const fetchBudget = async () => {
        try {
            const response = await BudgetApi();
            setbudgetDetails(response);
        } catch (e) {
            console.log(e);
        }
    };
    const fetchEnddate = async () => {
        try {
            const response = await BudgetEnddate();
            setEnddate(response);

        } catch (e) {
            console.log(e);
        }
    };
    const fetchFirstdate = async () => {
        try {
            const response = await ExpenseFirstdate();
            setFirstdate(response);

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
    const gettotalBudget = async () => {
        try {
            const response = await BudgetApiTotalBudget();

            setTotalIncome(response);


        } catch (e) {
            console.log('error: '+e);
            setException(e);

            console.log(exception);
        }
    };
    const ExpenseNames ={
        Cloths:'cart',Travel:'train',Medical:'pulse',Diaper:'paw',Food:'pizza',Others:'bicycle'
    };


    return (
<SafeAreaView style={{backgroundColor: '#f3f5f7'}}  className={"flex-1 relative"} >
    <TopBar/>
        <View className={"flex-1 relative mt-5 "}>

                            <View style={{

                                alignItems:'center',
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                            }}>
                                <LinearGradient colors={['#56b1da','#badee3','#82e0ed']} style={{...styles.Box}}>
                                    <View style={{width:'100%',flexDirection:'column' ,justifyContent:'center'}}>
                                        <View style={{width:'100%',alignItems:'center',gap:5}}>
                                            <Text
                                                style={{
                                                    color:'white',
                                                    fontSize: 20,

                                                    fontWeight: '600',

                                            }}>
                                                {TotalIncome? 'Current Balance':'Total Expenses'}
                                            </Text>
                                            {firstdate&&(
                                                <Text style={{fontFamily:'',color:GlobalStyles.colors.primary700,fontSize:12}}>{TotalIncome?new Date(TotalIncome.startdate).toLocaleDateString()+'-'+new Date(TotalIncome.enddate).toLocaleDateString():(Enddate?new Date(Enddate).toLocaleDateString():new Date(firstdate).toLocaleDateString())+'- Present'}</Text>
                                            )}
                                            <Text style={{color:'white',fontSize: 32,fontWeight: 700}}>Rs.{TotalIncome?((TotalIncome?TotalIncome.amount:0.00)-(TotalExpense?TotalExpense:0.00)):(TotalExpense?TotalExpense:0.00)}</Text>

                                        </View>
                                        {TotalIncome&&(
                                        <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between'}}>
                                                <View style={{ marginLeft: 10}}>
                                                    <Text style={{
                                                        color:'white',


                                                        fontSize: 18,
                                                        fontWeight: '700'}} >Budget</Text>
                                                    <Text style={{
                                                        color:'white',


                                                        fontSize: 18,
                                                        fontWeight: '700'}}>Rs.{TotalIncome&&(TotalIncome.amount)?TotalIncome.amount:'0.00'}</Text>
                                                </View>
                                                <View style={{ marginRight: 10}}>
                                                    <Text style={{
                                                        color:'white',


                                                        fontSize: 18,
                                                        fontWeight: '700'}}>Expenses</Text>
                                                    <Text style={{
                                                        color:'white',

                                                        fontSize: 18,
                                                        fontWeight: '700'}}>Rs.{TotalExpense?TotalExpense:'0.00'}</Text>
                                                </View>
                                        </View>
                                        )}
                                    </View>



                                </LinearGradient>

                            </View>
                <View style={{

                    paddingVertical: 10,
                    paddingHorizontal: 20,
                }} className={"flex-1  gap-5"}>


                    <View style={{ flexDirection: 'row', justifyContent:'space-between',  position:'relative'}}>
                       <Text className={"mt-3"} style={{fontSize: 20,
                        fontWeight: '800'}}>Transactions </Text>
                        <View className={"mt-3"}>
                            <CalendarPicker
                                mode='date'
                                lable={"Pick Start Date"}
                                name = 'seldate'
                                inputHandler={setDateFunction}
                            />
                        </View>
                        {/*budget and expense selection*/}
                        {/*<View style={{width:'60%'}}>*/}
                        {/*    <DropdownComponent onCategorySelect={setCategoryFunction}   data={categories} />*/}

                        {/*</View>*/}

                    </View>
                    {selectedDate&&<View className={"justify-center"}><Text className={"text-center text-xl"} style={{color:themeColors.btnColor}}>{StringtoDate(selectedDate)}</Text></View>}

<View>
    {category === 'Budget' ? (
        budgetDetails && <InfoBars details={dateFilteredBudget} keyField='budgetID' category='Budget' />
    ) : (
        expenseDetails && <InfoBars details={dateFileteredExpense} keyField='expenseID' category='Expense' />
    )}

    {noDataFound &&noDataFoundbudget &&(
        <View>
            <Text className={"text-center font-bold text-2xl my-3"} style={{ color: GlobalStyles.colors.primary700 }}>No Data found</Text>
        </View>
    )}

</View>

                </View>
            <TouchableOpacity
                className={"absolute bottom-24 right-5 rounded-full p-1"}
                style={{backgroundColor:themeColors.btnColor}}
                onPress={() => navigation.navigate('ExpenseChart')}
            >
                <ChartBarSquareIcon   size="40" color="white" />
            </TouchableOpacity>
            <TouchableOpacity
                className={"absolute bottom-10 right-5 rounded-full p-1"}
                style={{backgroundColor:themeColors.btnColor,position:'absolute'}}
                onPress={() => navigation.navigate('ExpenseTab')}
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
    hoverbtn:{
        backgroundColor:'gray',
        minHeight:80,
        borderRadius: 15,
        padding: 22,
        opacity:0.2,
    },

})
