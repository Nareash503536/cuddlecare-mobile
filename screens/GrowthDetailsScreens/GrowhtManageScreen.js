import {SafeAreaView} from "react-native-safe-area-context";
import GrowthForm from "../../components/Growth/GrowthForm";
import {GlobalStyles} from "../../constants/styles";
import {StyleSheet, Text, View} from "react-native";
import Button from "../../components/UI/Button";
import {useNavigation} from "@react-navigation/native";
import {themeColors} from "../../theme";
import {useDispatch} from "react-redux";
import {addGrowth} from "../../slices/growthSlice";


//generate array of objects including dummy values for growth

export default function GrowhtManageScreen() {
    let navigation = useNavigation();
    const dispatch = useDispatch();
    function deleteExpenseHandler() {
        // expensesCtx.deleteExpense(editedExpenseId);
        navigation.goBack();
    }

    function cancelHandler() {
        navigation.goBack();
    }

    function confirmHandler(growthData) {
        console.log(growthData)
        growthData.id = 'e5';
        // if (isEditing) {
        //     expensesCtx.updateExpense(
        //         editedExpenseId,
        //         {
        //             description: 'Test!!!!',
        //             amount: 29.99,
        //             date: new Date('2022-05-20'),
        //         }
        //     );
        // } else {
        dispatch(addGrowth(growthData));
        console.log("growthData",growthData)

        // }
        navigation.goBack();
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
