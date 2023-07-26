import {SafeAreaView} from "react-native-safe-area-context";
import GrowthForm from "../../components/Growth/GrowthForm";
import {GlobalStyles} from "../../constants/styles";
import {StyleSheet, Text, View} from "react-native";
import Button from "../../components/UI/Button";
import {useNavigation} from "@react-navigation/native";
import {themeColors} from "../../theme";
import {useDispatch} from "react-redux";
import {addGrowth} from "../../slices/growthSlice";
import {storeGrowth} from "../../util/http";
import {useState} from "react";
import ErrorOverlay from "../../components/UI/ErrorOverlay";


//generate array of objects including dummy values for growth

export default function GrowhtManageScreen() {
    let navigation = useNavigation();
    const dispatch = useDispatch();
    const [error, setError] = useState();
    function deleteExpenseHandler() {
        // expensesCtx.deleteExpense(editedExpenseId);
        navigation.goBack();
    }

    function cancelHandler() {
        navigation.goBack();
    }

    async function confirmHandler(growthData) {
        try{
            const id = await storeGrowth(growthData);
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
                onCancel={cancelHandler}
                onSubmit={confirmHandler}
            />

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
