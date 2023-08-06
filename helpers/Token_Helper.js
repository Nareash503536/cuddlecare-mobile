import * as SecureStore from 'expo-secure-store';
import { BASE_URL } from "../config";
import axios from 'axios';

var jwt_decode = require('jwt-decode')

function isTokenExpired(token) {
    var decoded = jwt_decode(token)

    console.log(decoded);

    if (decoded.exp < Date.now() / 1000) {
        return true
    } else {
        return false
    }
}

async function getAccessUsingRefresh(refreshToken) {
    const refreshTokenAPI = BASE_URL + '/refresh-token';
    try {
        const refreshTokenResponse = await axios.get(refreshTokenAPI, {
            headers: {
                'Authorization': `Bearer ${refreshToken}`
            }
        });
        return refreshTokenResponse;
    } catch (err) {
        console.log("RefreshKey error: " + err);
    }
}

async function getVerifiedKeys(accessToken, refreshToken) {
    console.log('Loading keys from storage');
    console.log(accessToken);
    console.log(refreshToken);

    if (accessToken != null && refreshToken != null) {
        console.log('checking access')

        if (!isTokenExpired(accessToken)) {
            console.log('returning access')

            return { accessToken, refreshToken }
        } else {
            console.log('access expired')

            console.log('checking refresh expiry')

            if (!isTokenExpired(refreshToken)) {
                console.log('fetching access using refresh')

                const response = await getAccessUsingRefresh(refreshToken)

                // await SecureStore.setItemAsync(ACCESS_KEY, response.data.accessToken);

                // await AsyncStorage.setItem('keys', JSON.stringify(response)) ///

                console.log('UPDATED ONE');

                return response.data
            } else {
                console.log('refresh expired, please login')

                return null
            }
        }
    } else {
        console.log('access not available please login')

        return null
    }
}



const setCredentials = async (accessToken, refreshToken) => {
    try {
        await SecureStore.setItemAsync(ACCESS_KEY, accessToken);
        await SecureStore.setItemAsync(ACCESS_KEY, refreshToken);

    } catch (e) {
        console.log(e)
    }
}

const getCredentials = async () => {
    try {
        let accessToken = await SecureStore.getItemAsync(ACCESS_KEY);
        let refreshToken = await SecureStore.getItemAsync(REFRESH_KEY);

        let cred = await getVerifiedKeys(accessToken, refreshToken);

        if (accessToken != null && refreshToken != null && cred != null) {
            return cred
        } else {
            return null
        }
    } catch (e) {
        console.log(e)
    }

    return null;
}

export default {
    setCredentials,
    getCredentials,
    getVerifiedKeys,
    isTokenExpired,
    getAccessUsingRefresh,
}