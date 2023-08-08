import {View, Text, Alert, Switch, Dimensions} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useEffect, useState} from "react";
import {StatusBar} from "expo-status-bar";
import {
    BWSD0,
    BWSD1,
    BWSD1neg,
    BWSD2,
    BWSD2neg,
    BWSD3,
    BWSD3neg,
    GWSD0, GWSD1,
    GWSD1neg, GWSD2,
    GWSD2neg, GWSD3,
    GWSD3neg,
    WxAxisPoints,
    WyAxisPoints
} from "../../constants/GrowthChartZScoreData/weightZscoreData";
import {
    BHSD0,
    BHSD1,
    BHSD1neg, BHSD2,
    BHSD2neg, BHSD3,
    BHSD3neg, GHSD0, GHSD1, GHSD1neg, GHSD2, GHSD2neg, GHSD3, GHSD3neg,
    HxAxisPoints,
    HyAxisPoints
} from "../../constants/GrowthChartZScoreData/heightZscoreData";
import {
    BCSD0, BCSD1,
    BCSD1neg, BCSD2,
    BCSD2neg, BCSD3,
    BCSD3neg,
    CxAxisPoints,
    CyAxisPoints, GCSD0, GCSD1, GCSD1neg, GCSD2, GCSD2neg, GCSD3, GCSD3neg
} from "../../constants/GrowthChartZScoreData/headCircumZscoreData";

import {GeneralChart} from "./GeneralChart";


const deviceHight = Dimensions.get('window').height;

const objectMapping = {
    "BWSD3neg": BWSD3neg,"BWSD2neg": BWSD2neg,"BWSD1neg": BWSD1neg,"BWSD0": BWSD0,"BWSD1": BWSD1,"BWSD2": BWSD2,"BWSD3": BWSD3,"WyAxisPoints":WyAxisPoints,"WxAxisPoints":WxAxisPoints,
    "BHSD3neg": BHSD3neg,"BHSD2neg": BHSD2neg,"BHSD1neg": BHSD1neg,"BHSD0": BHSD0,"BHSD1": BHSD1,"BHSD2": BHSD2,"BHSD3": BHSD3,"HyAxisPoints":HyAxisPoints,"HxAxisPoints":HxAxisPoints,
    "BCSD3neg": BCSD3neg,"BCSD2neg": BCSD2neg,"BCSD1neg": BCSD1neg,"BCSD0": BCSD0,"BCSD1": BCSD1,"BCSD2": BCSD2,"BCSD3": BCSD3,"CyAxisPoints":CyAxisPoints,"CxAxisPoints":CxAxisPoints,
    "GWSD3neg": GWSD3neg,"GWSD2neg": GWSD2neg,"GWSD1neg": GWSD1neg,"GWSD0": GWSD0,"GWSD1": GWSD1,"GWSD2": GWSD2,"GWSD3": GWSD3,
    "GHSD3neg": GHSD3neg,"GHSD2neg": GHSD2neg,"GHSD1neg": GHSD1neg,"GHSD0": GHSD0,"GHSD1": GHSD1,"GHSD2": GHSD2,"GHSD3": GHSD3,
    "GCSD3neg": GCSD3neg,"GCSD2neg": GCSD2neg,"GCSD1neg": GCSD1neg,"GCSD0": GCSD0,"GCSD1": GCSD1,"GCSD2": GCSD2,"GCSD3": GCSD3,
}
export function ChartGenerator(
    {
        Gender="Girl",
        chartType="Height",
        chartData=[],
    }
) {

    const [axisLabal, setAxisLabal] = useState({});
    let axisLabals = {};

    useEffect(() => {
        chartPropFactory();
        setAxisLabal(axisLabals);
    }, []);

    function propFactory(prefixString) {
        switch (chartType) {
            case 'Weight':
                prefixString+="W";
                axisLabals= {xLable:"Month",yLable:"Weight(kg)"};
                break;
            case 'Height':
                prefixString+="H";
                axisLabals= {xLable:"Month",yLable:"Height(cm)"};
                break;
            case 'HeadCircum':
                prefixString+="C";
                axisLabals= {xLable:"Month",yLable:"Head Circum(cm)"};
                break;
            default:
                prefixString+="B";
                axisLabals= {xLable:"Month",yLable:"BMI(kg)"};
        }
        // setAxisLabal(axisLabals);
        return(
            <GeneralChart
                chart_data={chartData}
                SD3neg={objectMapping[prefixString+'SD3neg']}
                SD2neg={objectMapping[prefixString+'SD2neg']}
                SD1neg={objectMapping[prefixString+'SD1neg']}
                SD0={objectMapping[prefixString+'SD0']}
                SD1={objectMapping[prefixString+'SD1']}
                SD2={objectMapping[prefixString+'SD2']}
                SD3={objectMapping[prefixString+'SD3']}
                circleColor={"#daa520"}
                axisColor='#9dd'
                tooltipVisible={true}
                onPressItem={(data)=> Alert.alert(`Month-> ${data.month} : Weight-> ${data.value}`)}
                yAxisPoints={objectMapping[prefixString[1]+'yAxisPoints']}
                xAxisPoints={objectMapping[prefixString[1]+'xAxisPoints']}
            />
        )

    }
    function chartPropFactory(){
        if(Gender ==="Boy"){
            return propFactory("B");
        }else{
            return propFactory("G");
        }
    }

    return (
        <SafeAreaView className={'bg-white flex-1' }>
            <StatusBar barStyle={'dark-content'}/>



            <View>
                {chartPropFactory()}
            </View>

            <View className={' absolute left-2 pb-3'} style={{top: deviceHight*0.02}}>
                <Text className={"text-gray-400"}> {axisLabal["yLable"]}</Text>
            </View>
            <View className={'bg-transparent absolute right-4 '} style={{bottom: deviceHight*0.05}} >
                <Text className={"text-gray-400"}>{axisLabal["xLable"]}</Text>
            </View>

        </SafeAreaView>
    )
}
