import {SafeAreaView} from "react-native-safe-area-context";
import GrowthForm from "../../components/Growth/GrowthForm";
import {GlobalStyles} from "../../constants/styles";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Button from "../../components/UI/Button";
import {useNavigation} from "@react-navigation/native";
import {themeColors} from "../../theme";
import {useDispatch, useSelector} from "react-redux";
import {addGrowth, selectGrowth, selectGrowthById} from "../../slices/growthSlice";
import {storeGrowth} from "../../util/http";
import React, {useEffect, useState} from "react";
import ErrorOverlay from "../../components/UI/ErrorOverlay";
import {ArrowLeftIcon} from "react-native-heroicons/outline";


//generate array of objects including dummy values for growth

export default function GrowhtManageScreen({ route }) {
    let selectedGrowth=[];
    if(route.params) {
        const {id} = route.params;
        selectedGrowth = useSelector(state => selectGrowthById(state, id));
    }

    let navigation = useNavigation();
    const dispatch = useDispatch();
    const [error, setError] = useState();

    function cancelHandler() {
        navigation.goBack();
    }

    async function confirmHandler(growthData) {
        try{
            // const id = await storeGrowth(growthData);
            let id = Math.floor(Math.random() * 100) + 1;
            dispatch(addGrowth({...growthData,id:id}));
        }catch (error) {
            setError('Netword Error');
        }
        navigation.goBack();
    }

    function errorHandler(){
        setError(null);
    }

    if(error){
        return <ErrorOverlay message={error} onConfirm={errorHandler}/>
    }

    return (
        <SafeAreaView>
            <View className={"flex-row justify-center my-5"}>
                <Text className={"flex-row justify-center text-2xl text-gray-500"}
                      style={styles.title}
                > Growth Measurements</Text>
            </View>
            <GrowthForm
                defaultValues={selectedGrowth}
                onCancel={cancelHandler}
                onSubmit={confirmHandler}
            />
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
        backgroundColor: GlobalStyles.colors.primary800,
    },
    title: {
        color: themeColors.colorDark,
    },
});
