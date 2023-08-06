import {Button, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {BarChart, LineChart, PieChart} from "react-native-chart-kit";
import {ExpenseApi} from "../../Api/ExpenseApi";
import {useEffect, useState} from "react";
import { Dimensions } from "react-native";
import {TopBar} from "../TopBar";
import {themeColors} from "../../theme";
import {COLORS} from "../../constants/theme";
const screenWidth = Dimensions.get("window").width-30;
export default function ExpenseBarGraph(){
    const [amount, setAmount] = useState([]);
    const [expenseDetails, setexpenseDetails] = useState([]);
    const [Categories, setCategories] = useState([]);

    const [pieChartData, setPieChartData] = useState([]);
    const [weeklyAmount, setWeeklyAmount] = useState([]);
    const [monthlyAmount, setMonthlyAmount] = useState([]);
    const [yearlyAmount, setYearlyAmount] = useState([]);
    const [weeks, setWeeks] = useState([]);
    const [months, setMonths] = useState([]);
    const [years, setYears] = useState([]);
    const [xAxis, setxAxis] = useState([]);
    const tempWeeks = weeks.map((item) => Number(weeklyAmount[item]));

    const [yAxis, setyAxis] = useState(   tempWeeks);



    // const [tempweeks, setTempweeks] = useState([]);
    // const [tempmonths, setTempmonths] = useState([]);
    // const [tempyears, setTempyears] = useState([]);
    const pickcolors = ["#5EDEEA","#A1E0E6","#296166","#7DAEB3","#91C9CE"];
    useEffect(() => {
        fetchExpense();
    },[]);
    useEffect(() => {
        if (expenseDetails.length > 0) {
            calculateAmount();
            AmountForDate();
            setxAxis(weeks); // Set initial xAxis state to weeks
            setyAxis(tempWeeks); // Set initial yAxis state to tempWeeks
        }
    }, [expenseDetails]);
    // useEffect(() => {
    //     setxAxis(weeks);
    // }, [weeks]);
    // useEffect(() => {
    //     const tempWeeks = weeks.map((item) => Number(weeklyAmount[item]));
    //     setyAxis(tempWeeks);
    // }, [weeks, weeklyAmount]);
    const  chartConfig={
        backgroundColor: "#eee",
        backgroundGradientFrom: "#7AABAF",
        backgroundGradientTo: "#7AABAF",
            decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
            borderRadius: 16
        },
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            backgroundColor: "#7AABAF",
            stroke: "#fff"
        },

    }

    const fetchExpense = async () => {
        try {
            const response = await ExpenseApi();
            setexpenseDetails(response);

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
console.log("xaxis",xAxis);
console.log("yaxis",yAxis);


    const lineData = {
        labels: xAxis,
        datasets: [
            {
                data: yAxis,
            }
        ],
        legend: ["Total Expenses"] // optional
    };


    return(
        <SafeAreaView className={"flex-1 mt-8"}>
            <TopBar/>


            <View className={"flex flex-1 gap-5 mt-8  p-5"}>
                <View className={"flex-col flex-1 justify-center items-center"}>
                    <View  className={"flex-row justify-end  absolute right-0 top-6 z-10"}>
                        <TouchableOpacity
                            className={" rounded-l-xl border-r py-1 px-3"}
                            onPress={() =>GraphForDate()}
                            style={styles.btn}
                        ><Text style={styles.btntxt}  className={"text-center"}>Week</Text></TouchableOpacity>
                        <TouchableOpacity
                            className={" border-r  py-1 px-3"}
                            onPress={() => GraphForMonth()}
                            style={styles.btn}
                        ><Text style={styles.btntxt}  className={"text-center"}>Month</Text></TouchableOpacity>
                        <TouchableOpacity
                            className={"  rounded-r-xl py-1 px-3"}
                            onPress={() => GraphForYear()}
                            style={styles.btn}
                        ><Text style={styles.btntxt}  className={"text-center"}>Year</Text></TouchableOpacity>
                    </View>
                {expenseDetails && Categories && (
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
                    />)}
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
            <View className={"flex-row  justify-center items-center bg-white rounded-2xl p-5"}>
                <PieChart
                    data={pieChartData}
                    width={screenWidth}
                    height={220}
                    chartConfig={chartConfig}
                    accessor={"population"}
                    backgroundColor={"transparent"}
                    paddingLeft={"10"}
                    center={[10, 10]}
                    absolute
                />
            </View>
        </View>
    </SafeAreaView>
        )

}
const styles = StyleSheet.create({
    btn: {

        backgroundColor: "rgba(222,222,225,0.68)",
        borderWidth: 0.2,
        borderColor: '#7AABAF',
    },
    btntxt: {
        color:'#7AABAF',
    }
});