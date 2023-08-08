import { ApiManager } from "./ApiManager";

const SleepApi = async (data) => {
    console.log("hey check me", data);
    const jsonData = JSON.stringify(data);
    try {
        const response = await ApiManager.post("/save", jsonData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response;
    } catch (error) {
        console.error(error.response.data);
    }
}

const SleepApiGetLast = async () => {
    try {
        const currentDate = new Date().toISOString().slice(0, 10);
        const response = await ApiManager.get("/last-sleep/" + currentDate);
        return response;
    } catch (error) {
        console.error(error.response.data);
    }
}

const SleepApiGetAll = async () => {
    try {
        const currentDate = new Date().toISOString().slice(0, 10);
        const response = await ApiManager.get("/all-sleeps/" + currentDate);
        return response;
    } catch (error) {
        console.error(error.response.data);
    }
}

const SleepApiGetTotal = async () => {
    try {
        const currentDate = new Date().toISOString().slice(0, 10);
        const response = await ApiManager.get("/total-sleep-duration/" + currentDate);
        return response;
    } catch (error) {
        console.error(error.response.data);
    }
}

export { SleepApi, SleepApiGetLast, SleepApiGetAll, SleepApiGetTotal };