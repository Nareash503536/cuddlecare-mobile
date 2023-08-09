import {ApiManager} from "./ApiManager";

const BudgetApi = async () => {
    try {
        const response = await ApiManager.get("/budget/all",{
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

const BudgetApiPost = async (data) => {
    console.log("hey check me", data);
    const jsonData = JSON.stringify(data);
    try {
        const response = await ApiManager.post("/budget", jsonData, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response;
    } catch (error) {
        console.log(error.response.data);
    }
};
const BudgetApiTotalBudget = async () => {

    try {
        const response = await ApiManager.get("/budget/totalBudget",{
            headers: {
                "Content-Type": "application/json",
            },

        });

        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
const BudgetEnddate = async () => {

    try {
        const response = await ApiManager.get("/budget/endDate",{
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

export {BudgetApi,BudgetApiPost,BudgetApiTotalBudget,BudgetEnddate};