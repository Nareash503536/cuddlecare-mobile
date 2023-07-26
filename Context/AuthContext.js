import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { BASE_URL } from "../config";

const TOKEN_KEY = "token";
export const API_URL = BASE_URL + '/login';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const register = async (username, password) => {
        setIsLoading(true);
        const apiURL = BASE_URL + "/login";
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        try {
            const response = await axios.post(apiURL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        } catch (err) {
            console.log(err);
        }
        setIsLoading(false);
    }

    const login = async (username, password) => {
        const apiURL = BASE_URL + "/login";
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        try {
            const response = await axios.post(apiURL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setAuthState({
                token: response.data.accessToken,
                authenticated: true
            })
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
            await SecureStore.setItemAsync(TOKEN_KEY, response.data.accessToken);
            return response;
        } catch (err) {
            console.log(err);
        }
    }

    const logout = () => {
        setAuthState({
            token: null,
            authenticated: false
        })
        console.log(authState.authenticated);
        axios.defaults.headers.common['Authorization'] = '';
        SecureStore.deleteItemAsync(TOKEN_KEY);
        setIsLoading(false);
    }

    useEffect(() => {
        setIsLoading(true);
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                setAuthState({
                    token: token,
                    authenticated: true
                })
            }
        }
        loadToken()
        setIsLoading(false);
    }, [])

    const [isLoading, setIsLoading] = useState(false);

    const [authState, setAuthState] = useState({
        token: null,
        authenticated: null
    });

    return (
        <AuthContext.Provider value={{ register, login, logout, authState, isLoading}}>
            {children}
        </AuthContext.Provider>
    )
}