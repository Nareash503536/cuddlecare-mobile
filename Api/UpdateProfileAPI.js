import axios from "axios";
import { BASE_URL } from "../config";

export default function UpdateProfileAPI() {
    
    const getUser = async (email) => {
        let API_URL = BASE_URL + "/returnUser";
        try {
            let response = await axios.post(API_URL, null, {
                params: {
                    email: email
                }
            });
            return response.data;
        } catch (error) {
            console.log("Get user error: " + error);
        }
    }

    const uploadProfilePic = async (email, uri) => {
        let API_URL = BASE_URL + "/setProfilePicture";
        try {
            let response = await axios.post(API_URL, null, {
                params: {
                    email: email,
                    profilePicture: uri
                }
            });
            return response.data;
        } catch (error) {
            console.log("Upload profile pic error: " + error);
        }
    }

    const updateUserByAttribute = async(email, attribute, value) => {
        let API_URL = BASE_URL + "/updateUserByAttribute";
        try {
            let response = await axios.post(API_URL, null, {
                params: {
                    email: email,
                    attribute: attribute,
                    value: value
                }
            });
            return response.data;
        } catch (error) {
            console.log("Update user by attribute error: " + error);
        }
    }

    const getParentBabySet = async (email) => {
        let API_URL = BASE_URL + "/getBabiesByParent";
        try {
            let response = await axios.post(API_URL, null, {
                params: {
                    email: email
                }
            });
            return response.data;
        } catch (error) {
            console.log("Get parent baby set error: " + error);
        }
    }

    const getCaregiverBabySet = async (email) => {
        let API_URL = BASE_URL + "/getCaregiverBabySet";
        try {
            let response = await axios.post(API_URL, null, {
                params: {
                    email: email
                }
            });
            return response.data;
        } catch (error) {
            console.log("Get caregiver baby set error: " + error);
        }
    }

    const updateBabyByAttribute = async (babyId, attribute, value) => {
        let API_URL = BASE_URL + "/updateBabyByAttribute";
        try {
            let response = await axios.post(API_URL, null, {
                params: {
                    id: babyId,
                    attribute: attribute,
                    value: value
                }
            });
            return response.data;
        } catch (error) {
            console.log("Update baby by attribute error: " + error);
        }
    }

    const uploadBabyPic = async (babyId, uri) => {
        let API_URL = BASE_URL + "/setBabyPicture";
        try {
            let response = await axios.post(API_URL, null, {
                params: {
                    id: babyId,
                    babyPicture: uri
                }
            });
            console.log("Response", response.data);
            return response.data;
        } catch (error) {
            console.log("Upload baby pic error: " + error);
        }
    }

    const deleteBaby = async (babyId) => {
        let API_URL = BASE_URL + "/deleteBaby";
        console.log("babyId", babyId)
        try {
            let response = await axios.post(API_URL, null, {
                params: {
                    id: babyId
                }
            });
            return response.data;
        } catch (error) {
            console.log("Delete baby error: " + error);
        }
    }

    const addBaby = async(email, babyInfo) => {
        let API_URL = BASE_URL + "/addBaby";
        try {
            let response = await axios.post(API_URL, null, {
                params: {
                    email: email,
                    dob: babyInfo.date.value,
                    name: babyInfo.name.value,
                    gender: babyInfo.gender.value
                }
            });
            return response.data;
        } catch (error) {
            console.log("Add baby error: " + error);
        }
    }


    return {
        getUser,
        uploadProfilePic,
        updateUserByAttribute,
        getParentBabySet,
        updateBabyByAttribute,
        uploadBabyPic,
        deleteBaby,
        addBaby,
        getCaregiverBabySet
    };
}