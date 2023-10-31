import axios from "axios";
import { BASE_URL } from "../config";

export default function VaccinationAPI() {

    const getAllVaccinations = async () => {
        let API_URL = BASE_URL + "/getAllVaccines";
        try {
            let response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.log("Get all vaccinations error: " + error);
        }
    }

    const getVaccinationByBabyID = async (babyID) => {
        let API_URL = BASE_URL + "/getVaccineByBaby";
        try {
            let response = await axios.post(API_URL, null, {
                params: {
                    babyID: babyID
                }
            });
            return response.data;
        } catch (error) {
            console.log("Get vaccination by babyID error: " + error);
        }
    }


    return {
        getAllVaccinations,
        getVaccinationByBabyID
    }
}