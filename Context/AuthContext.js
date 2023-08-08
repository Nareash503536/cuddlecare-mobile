import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { BASE_URL } from "../config";
import Token_Helper from "../helpers/Token_Helper";

const ACCESS_KEY = "token";
const REFRESH_KEY = "refreshToken";
export const API_URL = BASE_URL + '/login';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const login = async (username, password) => {
        const apiURL = BASE_URL + "/login";
        const formData = new FormData();
        console.log(username, password);
        formData.append('username', username);
        formData.append('password', password);
        try {
            const response = await axios.post(apiURL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setAuthState({
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken,
                authenticated: false
            })
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
            await SecureStore.setItemAsync(ACCESS_KEY, response.data.accessToken);
            await SecureStore.setItemAsync(REFRESH_KEY, response.data.refreshToken);
            return response;
        } catch (err) {
            console.log("Login error: " + err);
        }
    }

    const updateKeys = async() => {
        const accessToken = await SecureStore.getItemAsync(ACCESS_KEY);
        const refreshToken = await SecureStore.getItemAsync(REFRESH_KEY);
        const keys = await Token_Helper.getVerifiedKeys(accessToken, refreshToken);

        if(keys){
            setAuthState({
                accessToken: keys.accessToken,
                refreshToken: keys.refreshToken,
                authenticated: authState.authenticated
            });
            await SecureStore.setItemAsync(ACCESS_KEY, keys.accessToken);
            await SecureStore.setItemAsync(REFRESH_KEY, keys.refreshToken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${keys.accessToken}`;
            console.log(keys);
        } else {
            logout();
        }
    }

    const logout = async() => {
        setAuthState({
            accessToken: null,
            refreshToken: null,
            authenticated: false
        })
        axios.defaults.headers.common['Authorization'] = '';
        SecureStore.deleteItemAsync(ACCESS_KEY);
        SecureStore.deleteItemAsync(REFRESH_KEY);
        setIsLoading(false);
    }

    useEffect(() => {
        setIsLoading(true);
        const loadToken = async () => {
            const accessToken = await SecureStore.getItemAsync(ACCESS_KEY);
            const refreshToken = await SecureStore.getItemAsync(REFRESH_KEY);
            if (accessToken && refreshToken) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                setAuthState({
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    authenticated: true
                })
            }
        }
        loadToken()
        setIsLoading(false);
    }, [])

    const [isLoading, setIsLoading] = useState(false);

    const [authState, setAuthState] = useState({
        accessToken: null,
        refreshToken: null,
        authenticated: false
    });

    return (
        <AuthContext.Provider value={{
            login,
            logout,
            authState,
            setAuthState,
            isLoading,
            setIsLoading,
            updateKeys
        }}>
            {children}
        </AuthContext.Provider>
    )
}