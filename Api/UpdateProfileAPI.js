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

    return {
        getUser,
        uploadProfilePic,
        updateUserByAttribute
    };
}