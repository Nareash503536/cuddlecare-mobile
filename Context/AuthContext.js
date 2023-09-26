import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { BASE_URL } from "../config";
import Token_Helper from "../helpers/Token_Helper";
import UpdateProfileAPI from "../Api/UpdateProfileAPI";

const ACCESS_KEY = "token";
const REFRESH_KEY = "refreshToken";
const USER = "user";
const BABYSET = "babies";
const BABY = 'baby';
export const API_URL = BASE_URL + '/login';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [baby, setBaby] = useState(null);
    const [babySet, setBabySet] = useState(null);

    useEffect(() => {
        async function updateUser() {
            if (user) {
                try {
                    await SecureStore.setItemAsync(USER, JSON.stringify(user));
                } catch (error) {
                    console.log("Update user error: " + error);
                }
            }
        }
        updateUser();
    }, [user]);

    useEffect(() => {
        async function updateBabySet() {
            if (babySet) {
                try {
                    await SecureStore.setItemAsync(BABYSET, JSON.stringify(babySet));
                    console.log(babySet);
                    setBaby(babySet[0]);
                } catch (error) {
                    console.log("Update baby set error: " + error);
                }
            }
        }
        updateBabySet();
    }, [babySet]);

    const saveBaby = async () => {
        await updateKeys();
        let babies = [];
        if (user.relationship === "caregiver") {
            babies = await UpdateProfileAPI().getCaregiverBabySet(user.email);
        } else {
            babies = await UpdateProfileAPI().getParentBabySet(user.email);
        }
        await SecureStore.setItemAsync(BABYSET, JSON.stringify(babies));
        await SecureStore.setItemAsync(BABY, JSON.stringify(babies[0]));
        setBabySet(babies);
        setBaby(babies[0]);
        console.log(babies);
    }

    const saveUser = async (email) => {
        await updateKeys();
        try {
            const user = await UpdateProfileAPI().getUser(email);
            console.log(user);
            setUser(user);
            await SecureStore.setItemAsync(USER, JSON.stringify(user));
            await saveBaby();
        } catch (error) {
            console.log("Save user error: " + error);
        }
    }

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
            await saveUser(username);
            return response;
        } catch (err) {
            console.log("Login error: " + err);
        }
    }

    const updateKeys = async () => {
        const accessToken = await SecureStore.getItemAsync(ACCESS_KEY);
        const refreshToken = await SecureStore.getItemAsync(REFRESH_KEY);
        const keys = await Token_Helper.getVerifiedKeys(accessToken, refreshToken);

        if (keys) {
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

    const logout = async () => {
        setAuthState({
            accessToken: null,
            refreshToken: null,
            authenticated: false
        })
        axios.defaults.headers.common['Authorization'] = '';
        SecureStore.deleteItemAsync(ACCESS_KEY);
        SecureStore.deleteItemAsync(REFRESH_KEY);
        SecureStore.deleteItemAsync(USER);
        SecureStore.deleteItemAsync(BABYSET);
        SecureStore.deleteItemAsync(BABY);
        setIsLoading(false);
    }

    useEffect(() => {
        setIsLoading(true);
        const loadToken = async () => {
            const accessToken = await SecureStore.getItemAsync(ACCESS_KEY);
            const refreshToken = await SecureStore.getItemAsync(REFRESH_KEY);
            const user = await SecureStore.getItemAsync(USER);
            const babySet = await SecureStore.getItemAsync(BABYSET);
            const baby = await SecureStore.getItemAsync(BABY);
            if (accessToken && refreshToken) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                setAuthState({
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    authenticated: true
                })
            }
            if (user) {
                setUser(JSON.parse(user));
            }
            if (babySet && baby) {
                setBabySet(JSON.parse(babySet));
                setBaby(JSON.parse(baby));
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
            updateKeys,
            user,
            setUser,
            baby,
            setBaby,
            babySet,
            setBabySet,
        }}>
            {children}
        </AuthContext.Provider>
    )
}