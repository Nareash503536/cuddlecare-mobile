import React, {useContext, useEffect, useRef, useState} from "react";
import {StyleSheet, Image, Text, View, TouchableOpacity} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import Button from "../UI/Button";
import {themeColors} from "../../theme";
import {PlayIcon, Cog8ToothIcon, StopIcon} from "react-native-heroicons/solid";
import {AuthContext} from "../../Context/AuthContext";
import {useNavigation} from "@react-navigation/native";
import {BASE_URL} from "../../config";
import axios from "axios";

export function BreastFeeding() {

    const {updateKeys,baby} = React.useContext(AuthContext);
    const [startTime, setStartTime] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [totalTime, setTotalTime] = useState(null);
    const [righton, setRighton] = useState(false);
    const [lefton, setLefton] = useState(false);
    const [stop, setStop] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [feedingSide,setFeedingSide] = useState(null);

    useEffect(() => {
        if (isRunning) {
            const interval = setInterval(() => {
                setEndTime(new Date());
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [isRunning]);

    const storeData = async (data) => {
        await updateKeys();
        const apiUrl = BASE_URL+ '/BreastFeeding/add';
        try{
            const response = await axios.post(apiUrl, data);
            console.log(response.data);
        }catch (e) {
            console.log("Breast Feeding error: ",e);
        }
    }

    const startTimer = (side) => {
        if(side === "Left"){
            setLefton(true);
            setFeedingSide("Left");
        }else{
            setRighton(true);
            setFeedingSide("Right");
        }
        const currentDate = new Date();
        setStartTime(currentDate);
        setStartDate(currentDate);
        setIsRunning(true);
        console.log("baby time: ", baby);
    };

    const getTime = (actualTime) => {
        let hours = (actualTime.getHours() < 10 ? '0' : '') + actualTime.getHours();
        let minutes = (actualTime.getMinutes() < 10 ? '0' : '') + actualTime.getMinutes();
        let seconds = (actualTime.getSeconds() < 10 ? '0' : '') + actualTime.getSeconds();
        let currentTime = hours + ':' + minutes + ':' + seconds;
        return currentTime;
    }
    const saveTimerData = () => {
        setStop(false);

        const feedingDuration = totalTime;
        const starttime = getTime(startTime);
        const endtime = getTime(endTime);
        const feedingDate = startDate;
        const side = feedingSide;
        const data = {
            feedingDate,
            side,
            starttime,
            endtime,
            feedingDuration,
            baby

        };
        console.log("store data:",data);
        storeData(data).then(r => console.log("result: ",r));
        resetTimer();
    };
    const stopTimer = (side) => {
        if(side === "Left"){
            setLefton(false);
        }else{
            setRighton(false);
        }
        setIsRunning(false);
        setStop(true);
        const currentDate = new Date();
        setEndTime(currentDate);
        setTotalTime(endTime - startTime);
        calculateTotalTime();

    };
    const calculateTotalTime = () => {
        const elapsedTime = endTime - startTime;
        const seconds = Math.floor((elapsedTime / 1000) % 60);
        const minutes = Math.floor((elapsedTime / 1000 / 60) % 60);
        const hours = Math.floor((elapsedTime / 1000 / 3600) % 24);
        setTotalTime(`${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`);
    };

    const intervalRef = useRef(null);
    const padTime = time => {
        return String(time).padStart(2, '0');
    };
    const previewTime = () => {
        const currentTime = new Date();
        const elapsedTime = currentTime - startTime;
        const seconds = Math.floor((elapsedTime / 1000) % 60);
        const minutes = Math.floor((elapsedTime / 1000 / 60) % 60);
        const hours = Math.floor((elapsedTime / 1000 / 3600) % 24);
        // console.log("preview: ",currentTime, startTime, elapsedTime, seconds, minutes, hours);

        return (
            <View className={"flex flex-row justify-center "}>
                <Text className={"font-extrabold text-center text-5xl"} style={{color:'gray'}}>{padTime(hours)}</Text>
                <Text className={"font-extrabold text-center text-5xl"} style={{color:'gray'}}>:</Text>
                <Text className={"font-extrabold text-center text-5xl"} style={{color:'gray'}}>{padTime(minutes)}</Text>
                <Text className={"font-extrabold text-center text-5xl"} style={{color:'gray'}}>:</Text>
                <Text className={"font-extrabold text-center text-5xl"} style={{color:'gray'}}>{padTime(seconds)}</Text>
            </View>
        );
    };
    const renderTime = () => {
        if (isRunning) {
            return previewTime();
        } else if(totalTime){
            return (
                <View className={"flex flex-row justify-center "}>
                    <Text className={"font-extrabold text-center text-5xl"} style={{color:'gray'}}>
                        {totalTime}
                    </Text>
                </View>
            )
        }
        else{
            console.log("total time", totalTime)
            return (
                <View className={"flex flex-row justify-center "}>
                    <Text className={"font-extrabold text-center text-5xl"} style={{color:'gray'}}>00</Text>
                    <Text className={"font-extrabold text-center text-5xl"} style={{color:'gray'}}>:</Text>
                    <Text className={"font-extrabold text-center text-5xl"} style={{color:'gray'}}>00</Text>
                    <Text className={"font-extrabold text-center text-5xl"} style={{color:'gray'}}>:</Text>
                    <Text className={"font-extrabold text-center text-5xl"} style={{color:'gray'}}>00</Text>
                </View>
            );
        }
    };
    const resetTimer = () => {
        clearInterval(intervalRef.current);
        setStop(false);
        setStartTime(null);
        setStartDate(null);
        setEndTime(null);
        setTotalTime(null);
        setIsRunning(false);
    };
    return (
        <SafeAreaView  className={"flex-1 align-middle  relative p-5"}>
            <Image
                style={styles.babyimg}
                source={require('../../assets/images/babyMilkFeeding.png')}
            />

                <View >
                    <Text className={"font-extrabold text-center text-5xl"} style={{color:'gray'}}>{renderTime()}</Text>
                </View>
                {stop?<View className={"flex-row align-middle justify-center top-1 mb-5"}>
                    <Cog8ToothIcon style={{marginRight:5, color:themeColors.colorDark}} size="30"/>
                    <Text  style={styles.addmanual} onPress={resetTimer}>Reset </Text>
                </View>:<View className={"top-1 mb-5 "}><Text  style={{fontSize:20}} >  </Text></View>}
                <View className={"flex-row  justify-around   relative"}>
                    <TouchableOpacity style={styles.button}  onPress={()=>isRunning?stopTimer("Left"):startTimer("Left")}  >
                        {lefton?
                           <>
                               <StopIcon size="35" color="white" />
                               <Text style={styles.buttonText}>Stop</Text>
                           </>
                            :
                            <>
                                <PlayIcon size="35" color="white"  />
                                <Text style={styles.buttonText}>Left</Text>
                            </>

                        }

                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}  onPress={()=>isRunning?stopTimer("Right"):startTimer("Right")}   >
                        {righton?
                            <>
                                <StopIcon size="35" color="white" />
                                <Text style={styles.buttonText}>Stop</Text>
                            </>
                            :
                            <>
                                <PlayIcon size="35" color="white"  />
                                <Text  style={styles.buttonText}>Right</Text>
                            </>

                        }

                    </TouchableOpacity>
                </View>


            <TouchableOpacity style={styles.savebtn} onPress={()=>saveTimerData()} >
                <Text  style={styles.buttonText}>Save</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    babyimg: {
        width: 200,
        height: 300,
        alignSelf: 'center',
        top: -40,

    },
    buttonText: {
        color: 'white',
        fontSize: 20,

    },
    addmanual: {
        color:themeColors.colorDark,
        fontSize: 16,
        top:3,
    },
    button:{

        width: 150,
        height: 50,
        borderRadius: 4,
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: themeColors.colorDark,

    },
    savebtn:{
        position: 'absolute',
        width: '100%',
        bottom: 10,
        height: 50,
        borderRadius: 4,
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: themeColors.colorDark,

    }

})
