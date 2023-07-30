import axios from "axios";

const BACKEND_URL = "https://cuddle-care-default-rtdb.firebaseio.com";
export async function storeGrowth(growthData) {
    const response = await axios.post(BACKEND_URL + '/growth.json', growthData);
    const id = response.data.name;
    return id;
}

export async function fetchGrowth() {

    const response = await axios.get(BACKEND_URL + "/growth.json");
    const growth = []; // this is array of objects

//console log kral blannna fetch date monwd kiyal

    for (const key in response.data) {
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description,
        };
        growth.push(expenseObj);
    }

    return growth;

}

export  function updateGrowth(id, growthData) {
    return axios.patch(BACKEND_URL + `/growth/${id}.json`, growthData);
}
export function deleteGrowth(id) {
    return axios.delete(BACKEND_URL + `/growth/${id}.json`);
}

