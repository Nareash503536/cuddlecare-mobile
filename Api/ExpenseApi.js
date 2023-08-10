import {ApiManager} from "./ApiManager";

const ExpenseApi = async () => {

    try {
        const response = await ApiManager.get("/expenses/all",{
            headers: {
                "Content-Type": "application/json",
            },
            // data: data,
        });


        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const ExpenseApiPost = async (data) => {
    console.log("hey check me", data);
    const jsonData = JSON.stringify(data);
    try {
        const response = await ApiManager.post("/expenses", jsonData, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response;
    } catch (error) {
        console.log(error.response.data);
    }
};
const ExpenseApiTotalExpense = async () => {

    try {
        const response = await ApiManager.get("/expenses/totalExpense",{
            headers: {
                "Content-Type": "application/json",
            },
            // data: data,
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
const ExpenseApiTotalIncome = async () => {

    try {
        const response = await ApiManager.get("/expenses/totalIncome",{
            headers: {
                "Content-Type": "application/json",
            },
            // data: data,
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
const ExpenseFirstdate = async () => {

    try {
        const response = await ApiManager.get("/expenses/firstDate",{
            headers: {
                "Content-Type": "application/json",
            },
            // data: data,
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
const ExpenseDelete = async (expenseID) => {
    try {
        const response = await ApiManager.delete("/expenses/delete/"+expenseID,{
            headers: {
                "Content-Type": "application/json",
            },
            // data: data,
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
const ExpenseEdit = async (data,expenseID) => {
    console.log("expenseedit", data,expenseID);
    try {
        const jsonData = JSON.stringify(data);
        const response = await ApiManager.put("/expenses/edit/"+expenseID,jsonData,{
            headers: {
                "Content-Type": "application/json",
            },

        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export {ExpenseApi,ExpenseApiPost,ExpenseApiTotalIncome,ExpenseApiTotalExpense,ExpenseFirstdate,ExpenseDelete,ExpenseEdit};