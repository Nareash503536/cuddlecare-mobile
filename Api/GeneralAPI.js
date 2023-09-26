import axios from "axios";
import { BASE_URL } from "../config";

export default function GeneralAPI(){
    const returnCaregivers = () => {
        let API_URL = BASE_URL + "/getCaregiverList";
        try {
            let response = axios.get(API_URL);
            return response;
        } catch (error) {
            console.log("Get caregivers error: " + error);
        }
    }

    const requestCaregiver = (babyID, caregiverID) => {
        let API_URL = BASE_URL + "/requestToCaregive";
        try {
            let response = axios.post(API_URL, null, {
                params: {
                    babyID: babyID,
                    caregiverID: caregiverID
                }
            });
            return response;
        } catch (error) {
            console.log("Request caregiver error: " + error);
        }
    }

    const rejectRequest = (babyID, caregiverID) => {
        let API_URL = BASE_URL + "/removeRequest";
        try {
            let response = axios.post(API_URL, null, {
                params: {
                    babyID: babyID,
                    caregiverID: caregiverID
                }
            });
            return response;
        } catch (error) {
            console.log("Reject request error: " + error);
        }
    }

    const getRequestedCaregivers = (babyID) => {
        let API_URL = BASE_URL + "/getRequestedCaregivers";
        try {
            let response = axios.post(API_URL, null, {
                params: {
                    babyID: babyID
                }
            });
            return response;
        } catch (error) {
            console.log("Get requested caregivers error: " + error);
        }
    }

    const returnCurrentCaregivers = (babyID) => {
        let API_URL = BASE_URL + "/getCurrentCaregiver";
        try {
            let response = axios.post(API_URL, null, {
                params: {
                    babyID: babyID
                }
            });
            return response;
        } catch (error) {
            console.log("Get current caregivers error: " + error);
        }
    }

    const removeCaregiver = (babyID, caregiverID) => {
        let API_URL = BASE_URL + "/removeCaregiver";
        try {
            let response = axios.post(API_URL, null, {
                params: {
                    babyID: babyID,
                    caregiverID: caregiverID
                }
            });
            return response;
        } catch (error) {
            console.log("Remove caregiver error: " + error);
        }
    }

    const acceptBabyRequest = (babyID, email) => {
        let API_URL = BASE_URL + "/acceptBabyRequest";
        try {
            let response = axios.post(API_URL, null, {
                params: {
                    babyID: babyID,
                    email: email
                }
            });
            return response;
        } catch (error) {
            console.log("Accept baby request error: " + error);
        }
    }

    const cancelbabyRequest = (babyID, email) => {
        let API_URL = BASE_URL + "/cancelBabyRequest";
        try {
            let response = axios.post(API_URL, null, {
                params: {
                    babyID: babyID,
                    email: email
                }
            });
            return response;
        } catch (error) {
            console.log("Cancel baby request error: " + error);
        }
    }

    const returnRequestedBabies = (email) => {
        let API_URL = BASE_URL + "/getRequestedBabies";
        try {
            let response = axios.post(API_URL, null, {
                params: {
                    email: email
                }
            });
            return response;
        } catch (error) {
            console.log("Get requested babies error: " + error);
        }
    }



    return {
        returnCaregivers,
        requestCaregiver,
        rejectRequest,
        getRequestedCaregivers,
        returnCurrentCaregivers,
        removeCaregiver,
        acceptBabyRequest,
        cancelbabyRequest,
        returnRequestedBabies
    }
}