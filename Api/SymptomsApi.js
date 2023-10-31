import axios from "axios";
import { BASE_URL } from "../config";

const symptomSet = [
    "No negative symptoms",
    "General Fussiness",
    "Rash",
    "Cough",
    "Vomiting",
    "Low energy",
    "Runny nose",
    "No appetite",
    "Fever",
    "Abnormal breathing",
    "Spit-up",
];

export default function SymptomsAPI() {
    const addSymptoms = async (
        date, time, notes, symptomArray, babyID
        ) => {
        
        let responseArray = [];
        console.log(date, time, notes, symptomArray, babyID);
        let API_URL = BASE_URL + "/symptom/createSymptomForBaby";
        for (let i = 0; i < symptomArray.length; i++) {
            if(symptomArray[i] === true) {
                try {
                    let response = await axios.post(API_URL, null, {
                        params: {
                            date: date,
                            time: time,
                            additionalNotes: notes,
                            symptomName: symptomSet[i],
                            babyID: babyID
                        }
                    });
                    responseArray.push(response.data);
                } catch (error) {
                    console.log("Add " + symptomSet[i] + " symptom error: " + error);
                }
            }
        }
        return responseArray;
    }

    const getSymptomDates = async (babyID) => {
        let API_URL = BASE_URL + "/symptom/getDatesForSymptomByBaby";
        try {
            let response = await axios.get(API_URL, {
                params: {
                    babyID: babyID
                }
            });
            return response.data;
        } catch (error) {
            console.log("Get symptom dates error: " + error);
        }
    }

    const getSymptoms = async (date, babyID) => {
        let API_URL = BASE_URL + "/symptom/getSymptomForBabyByDate";
        try {
            let response = await axios.get(API_URL, {
                params: {
                    date: date,
                    babyID: babyID
                }
            });
            return response.data;
        } catch (error) {
            console.log("Get symptoms error: " + error);
        }
    }

    const deleteSymptoms = async (id) => {
        let API_URL = BASE_URL + "/symptom/removeSymptomForBabyByDate";
        console.log(id);
        try {
            let response = await axios.delete(API_URL, {
                params: {
                    symptomBabyID: id
                }
            });
            return response;
        } catch (error) {
            console.log("Delete symptom error: " + error);
        }
    }

    const updateSymptoms = async (date, time, additionalNotes, babyID, symptomBabyID, symptomName) => {
        let API_URL = BASE_URL + "/symptom/updateSymptomForBaby";
        try {
            let response = await axios.put(API_URL, null, {
                params: {
                    date: date,
                    time: time,
                    additionalNotes: additionalNotes,
                    babyID: babyID,
                    symptomBabyID: symptomBabyID,
                    symptomName: symptomName
                }
            });
            return response.data;
        } catch (error) {
            console.log("Update symptom error: " + error);
        }
    }

    return { 
        addSymptoms,
        getSymptomDates,
        getSymptoms,
        deleteSymptoms,
        updateSymptoms
    };
}