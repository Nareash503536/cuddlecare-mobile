import {Button, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {BarChart, LineChart, PieChart} from "react-native-chart-kit";
import {ExpenseApi} from "../../Api/ExpenseApi";
import React, {useContext, useEffect, useState} from "react";
import { Dimensions } from "react-native";
import {TopBar} from "../TopBar";
import {themeColors} from "../../theme";
import {COLORS} from "../../constants/theme";
import {GlobalStyles} from "../../constants/styles";
import {BASE_URL} from "../../config";
import axios from "axios";
import {AuthContext} from "../../Context/AuthContext";
const screenWidth = Dimensions.get("window").width-30;
export default function ExpenseBarGraph(){
    const {updateKeys} = useContext(AuthContext);
    const [amount, setAmount] = useState([]);
    const [expenseDetails, setexpenseDetails] = useState(null);
    const [Categories, setCategories] = useState([]);

    const [pieChartData, setPieChartData] = useState([]);
    const [weeklyAmount, setWeeklyAmount] = useState([]);
    const [monthlyAmount, setMonthlyAmount] = useState([]);
    const [yearlyAmount, setYearlyAmount] = useState([]);
    const [weeks, setWeeks] = useState([]);
    const [months, setMonths] = useState([]);
    const [years, setYears] = useState([]);
    const [xAxis, setxAxis] = useState([]);


    const [yAxis, setyAxis] = useState([]);



    // const [tempweeks, setTempweeks] = useState([]);
    // const [tempmonths, setTempmonths] = useState([]);
    // const [tempyears, setTempyears] = useState([]);
    const pickcolors = ["#A1E0E6","#91C9CE","#296166","#7DAEB3","#5EDEEA"];
    useEffect(() => {
        fetchExpense();
    },[]);
    useEffect(() => {
        if (expenseDetails) {
            console.log("he hoo me here",  expenseDetails);
            calculateAmount();
            AmountForDate();

        }
    }, [expenseDetails]);
    useEffect(() => {

        setxAxis(weeks); // Set initial xAxis state to weeks
        const tempWeeks = weeks.map((item) => Number(weeklyAmount[item]));
        setyAxis(tempWeeks); // Set initial yAxis state to tempWeeks
        console.log("inside use effect",weeks,tempWeeks);

    }, [weeks,weeklyAmount]);


    const  chartConfig={
        backgroundColor: "#eee",
        backgroundGradientFrom: "#7AABAF",
        backgroundGradientTo: "#7AABAF",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16,

        },
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            backgroundColor: "#7AABAF",
            stroke: "#fff"
        },


    }



    const fetchExpense = async () => {
        await updateKeys();
        try {
            const apiURL = BASE_URL + "/expenses/all";
            const response = await axios.get(apiURL,null);
            setexpenseDetails(response.data);
            console.log(response.data);
        } catch (e) {
            console.log("expense:"+e);
        }
    };

    function AmountForDate(){
        const WeekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        const Months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        let month={}
        let week={}
        let year={}
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const currentWeek = currentDate.getDay();
        const currentWeekStart = new Date();
        const currentWeekEnd = new Date();
        currentDate.setHours(0, 0, 0, 0);
        currentWeekStart.setDate(currentDate.getDate() - currentWeek);
        currentWeekEnd.setDate(currentDate.getDate() - currentWeek+7);
        currentWeekStart.setHours(0, 0, 0, 0);
        currentWeekEnd.setHours(0, 0, 0, 0);



        // let tempDate=itemDate.toISOString().split('T')[0]
        console.log("week start",currentWeekStart,"week end",currentWeekEnd);
        expenseDetails.forEach((item)=>{
            let itemDate= new Date(item.date);

            if(itemDate.getFullYear() >= currentYear) {
                year[itemDate.getFullYear()] =(year[itemDate.getFullYear()]||0)+ item.amount;
            }
            if((currentWeekStart <= itemDate) && (itemDate < currentWeekEnd)) {

                week[WeekDays[itemDate.getDay()]] =(week[WeekDays[itemDate.getDay()]]||0)+ item.amount;
            }
            if(itemDate.getFullYear() === currentYear) {
                month[Months[itemDate.getMonth()]] =(month[Months[itemDate.getMonth()]]||0)+ item.amount;
            }
        });


        setWeeklyAmount(week);
        setMonthlyAmount(month);
        setYearlyAmount(year);
        const tempweeks = Object.keys(week);
        setWeeks(tempweeks);
        const tempmonths = Object.keys(month);
        setMonths(tempmonths);
        const tempyears = Object.keys(year);
        setYears(tempyears);

        console.log("this is month",month);
        console.log("this is Day",week);
        console.log("this is year",year);
    }

    function GraphForDate(){
        setxAxis(weeks);
        const Tempweeks = weeks.map((item) => Number(weeklyAmount[item]));
        setyAxis(Tempweeks);
    }
    function GraphForMonth(){
        setxAxis(months);
        const tempMonths = months.map((item) => Number(monthlyAmount[item]));
        setyAxis(tempMonths);
    }
    function GraphForYear(){
        setxAxis(years);
        const tempYears = years.map((item) => Number(yearlyAmount[item]));

        setyAxis(tempYears);
    }


    function calculateAmount() {
        const NameAmount = {};

        const finaldata = []
        expenseDetails.forEach((item) => {
            if (!NameAmount[item.expenseName]) {
                NameAmount[item.expenseName] = 0;
            }
            NameAmount[item.expenseName] += item.amount;
        });

        const Categories = Object.keys(NameAmount);
        const calculatedAmount = Categories.map((item) => Number(NameAmount[item]));
        setCategories(Categories);
        setAmount(calculatedAmount);
        let randomIndex = 0;
        for (const key in NameAmount) {
            const piedata = {};

            piedata["name"] = key;
            piedata["population"]=NameAmount[key];
            piedata["legendFontColor"]= "#7F7F7F";
            piedata["legendFontSize"]= 15;
            piedata["color"]= pickcolors[randomIndex];
            randomIndex+=1;
            finaldata.push(piedata);
        }
        setPieChartData(finaldata);
        console.log("this is piedata",(new Date(expenseDetails[0].date)).getFullYear());
    }





    const hello=[20, 45, 28, 80, 99];



    let lineData = null;

    if (xAxis && yAxis) {
        lineData = {
            labels: xAxis,
            datasets: [
                {
                    data: yAxis,
                }
            ],
            legend: ["Total Expenses"],
        };
    }

    const emptyData = {
        labels: [0],
        datasets: [
            {
                data: [0],
            }
        ],
        legend: ["Total Expenses"],
    };


//for testing purpose
    const lineData2 = {
        labels: Categories,
        datasets: [
            {
                data: hello,
            }
        ],

    };
    //until this

    return(
        <SafeAreaView className={"flex-1 mt-8"}>
            <TopBar/>


            <View className={"flex flex-1 gap-5 p-5"}>

                <View className={"flex-col flex-1 justify-center items-center"} >
                    <View  className={"flex-row justify-center mt-5"}>
                        <TouchableOpacity
                            className={" rounded-l-lg  py-1 px-3"}
                            onPress={() =>GraphForDate()}
                            style={styles.btn}
                        ><Text style={styles.btntxt}  className={"text-center"}>Week</Text></TouchableOpacity>
                        <TouchableOpacity
                            className={"  py-1 px-3"}
                            onPress={() => GraphForMonth()}
                            style={styles.btn}
                        ><Text style={styles.btntxt}  className={"text-center"}>Month</Text></TouchableOpacity>
                        <TouchableOpacity
                            className={"  rounded-r-lg py-1 px-3"}
                            onPress={() => GraphForYear()}
                            style={styles.btn}
                        ><Text style={styles.btntxt}  className={"text-center"}>Year</Text></TouchableOpacity>
                    </View>


                    {(
                        xAxis.length > 0 && yAxis.length > 0 && (
                            <>
                                {console.log("this is xaxis", xAxis)}
                                <LineChart
                                    data={lineData}
                                    width={screenWidth}
                                    height={306}
                                    verticalLabelRotation={30}
                                    yAxisLabel="Rs."
                                    chartConfig={chartConfig}

                                    bezier
                                    style={{
                                        marginVertical: 8,
                                        borderRadius: 16,

                                    }}
                                />
                            </>
                        )
                    )}
                    {(
                        xAxis.length === 0 && yAxis.length === 0 && (
                            <>
                                <LineChart
                                    data={emptyData}
                                    width={screenWidth}
                                    height={306}
                                    verticalLabelRotation={30}
                                    yAxisLabel="Rs."
                                    chartConfig={chartConfig}

                                    bezier
                                    style={{
                                        marginVertical: 8,
                                        borderRadius: 16,

                                    }}
                                />
                            </>
                        )
                    )}
                </View>
                {/*<View>*/}
                {/*    <BarChart*/}

                {/*        data={data}*/}
                {/*        width={screenWidth}*/}
                {/*        height={220}*/}
                {/*        yAxisLabel="$"*/}
                {/*        chartConfig={chartConfig}*/}
                {/*        verticalLabelRotation={30}*/}
                {/*    />*/}
                {/*</View>*/}

                <View className={"flex-col  justify-center items-center bg-white rounded-2xl p-5 shadow-2xl"}>
                    <Text style={styles.titleTxt}>Total Expense per Category</Text>
                    <PieChart
                        data={pieChartData}
                        width={screenWidth}
                        height={170}
                        chartConfig={chartConfig}
                        accessor={"population"}
                        backgroundColor={"transparent"}
                        paddingLeft={"10"}
                        center={[10, 0]}
                        absolute
                    />
                </View>

            </View>
        </SafeAreaView>
    )

}
const styles = StyleSheet.create({
    btn: {
        width: 80,

        backgroundColor: "rgba(222,222,225,0.68)",


    },
    btntxt: {
        color:'#7AABAF',
    },
    titleTxt:{
        color:themeColors.colorDark,
        fontSize:20,

    }
});