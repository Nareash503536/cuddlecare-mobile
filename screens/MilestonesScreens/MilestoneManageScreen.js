import {SafeAreaView} from "react-native-safe-area-context";
import {GlobalStyles} from "../../constants/styles";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Button from "../../components/UI/Button";
import {useNavigation} from "@react-navigation/native";
import {themeColors} from "../../theme";
import {useDispatch} from "react-redux";
import {addGrowth} from "../../slices/growthSlice";
import {storeGrowth} from "../../util/http";
import React, {useState} from "react";
import ErrorOverlay from "../../components/UI/ErrorOverlay";
import {ArrowLeftIcon} from "react-native-heroicons/outline";
import MilestoneForm from "../../components/Milestones/MilestoneForm";
import {addMilestone} from "../../slices/milestoneSlice";


//generate array of objects including dummy values for growth

export default function MilestoneManageScreen({route}) {
    const { milestone, status } = route.params;
    let navigation = useNavigation();
    const dispatch = useDispatch();
    const [error, setError] = useState();
    console.log(milestone)
    function deleteExpenseHandler() {
        // expensesCtx.deleteExpense(editedExpenseId);
        navigation.goBack();
    }

    function cancelHandler() {
        navigation.goBack();
    }

    async function confirmHandler(completeMilestoneData) {
        console.log(completeMilestoneData)
        try{
            // const id = await storeGrowth(growthData);
            const id = Math.floor(Math.random() * 100) + 1
            dispatch(addMilestone({...completeMilestoneData,id:id}));
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
            <View>
                <View className={"flex-row justify-center my-5"}>
                    <Text className={"flex-row justify-center text-2xl text-gray-500"}
                          style={styles.title}
                    >Complete Milestone</Text>
                </View>
                <MilestoneForm
                    milestone={milestone}
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
            </View>
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
// {"date": "", "description": "dsfsdf", "milestone": "Holds head up when on tummy"}
