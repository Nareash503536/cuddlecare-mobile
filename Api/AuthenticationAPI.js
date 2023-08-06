import axios from 'axios';
import { BASE_URL } from '../config';


export default function AuthenticationAPI() {

    const isAuthenticated = async (email) => {
        const apiURL = BASE_URL + "/isAuthenticated";
        try {
            let response = await axios.post(apiURL, null,
                {
                    params: {
                        email: email
                    }
                });
            return response;
        } catch (error) {
            console.log("Authentication error : " + error);
        }
    }

    const registerCaregiver = async (
        CaregiverEmail,
        CaregiverPassword,
        CaregiverName,
        CaregiverPhoneNumber,
        CaregiverDOB,
        CaregiverGender) => {
        let API_URL = BASE_URL + "/register/caregiver";
        try {
            let response = await axios.post(API_URL, null, {
                params: {
                    CaregiverEmail:CaregiverEmail,
                    CaregiverPassword:CaregiverPassword,
                    CaregiverName:CaregiverName,
                    CaregiverPhoneNumber:CaregiverPhoneNumber,
                    CaregiverDOB:CaregiverDOB,
                    CaregiverGender:CaregiverGender
                }
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    const registerParent = async (
        BabyDOB,
        BabyGender,
        BabyName,
        BabyRelationship,
        ParentName,
        ParentPhoneNumber,
        ParentDOB,
        ParentEmail,
        ParentPassword) => {
        let API_URL = BASE_URL + "/register/parent";
        try {
            let response = await axios.post(API_URL, null, {
                params: {
                    BabyDOB: BabyDOB,
                    BabyGender: BabyGender,
                    BabyName: BabyName,
                    BabyRelationship: BabyRelationship,
                    ParentName: ParentName,
                    ParentPhoneNumber: ParentPhoneNumber,
                    ParentDOB: ParentDOB,
                    ParentEmail: ParentEmail,
                    ParentPassword: ParentPassword
                }
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    const setToken = async (email) => {
        apiURL = BASE_URL + "/setAuthenticated";
        try {
            const response = await axios.post(apiURL, null,
                {
                    params: {
                        email: email
                    }
                });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    return{
        isAuthenticated,
        registerCaregiver,
        registerParent,
        setToken
    }
}
