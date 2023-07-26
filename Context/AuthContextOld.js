import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState, useEffect} from "react";
import axios from "axios";
import { BASE_URL } from "../config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [auth, setAuth] = useState({});

    setInterval(() => {
        if(userToken){
            console.log(userToken);
            isValid();
        }
    }, 60000);

    const isValid = () => {
        const apiURL = BASE_URL + "/isValid";
        try {
            const response = axios.get(apiURL, {
                headers: {
                    'Authorization': 'Bearer ' + userToken,
                }
            });
            console.log(response.data);
        } catch (err) {
            if(err.response.status === 403){
                console.log("Access token expired");
                refresh();
            }
        }
    }

    const refresh = () => {
        const apiURL = BASE_URL + "/refresh-token";
        try {
            const response = axios.get(apiURL, {
                headers: {
                    'Authorization': 'Bearer ' + refreshToken,
                }
            });
            setUserToken(response.data.accessToken);
            AsyncStorage.setItem('userToken', JSON.stringify(response.data.accessToken));
            setRefreshToken(response.data.refreshToken);
            AsyncStorage.setItem('refreshToken', JSON.stringify(response.data.refreshToken));
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    const login = async(username, password) => {
        setIsLoading(true)
        // console.log(username);
        // console.log(password);   
        const apiURL = BASE_URL + "/login";
        const formData = new FormData();
        formData.append('username', "user0@gmail.com");
        formData.append('password', "1234");
        try {
            const response = await axios.post(apiURL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                    }});
            setUserToken(response.data.accessToken);
            setRefreshToken(response.data.refreshToken);
            AsyncStorage.setItem('userToken', JSON.stringify(response.data.accessToken));
            AsyncStorage.setItem('refreshToken', JSON.stringify(response.data.refreshToken));
            // console.log(userToken);
            // console.log(refreshToken);
        } catch(err){
            console.log(err);
        }
        setIsLoading(false);
    }

    const logout = () => {
        setUserToken(null);
        AsyncStorage.removeItem('userToken');
        setIsLoading(false);
    }

    const isLoggedIn = async() => {
        try{
            setIsLoading(true);
            let storedUserToken = await AsyncStorage.getItem('userToken');
            storedUserToken = JSON.parse(userToken);
            if (storedUserToken) {
                setUserToken(storedUserToken);
            }
            setIsLoading(false);
        } catch(e){
            console.log("Logged in error");
        }
    }

    useEffect(() => {
        isLoggedIn();
    }, [])

    return (
        <AuthContext.Provider value={{ login, logout, isLoading, userToken, auth, setAuth}}>
        {children}
        </AuthContext.Provider>
    );
}