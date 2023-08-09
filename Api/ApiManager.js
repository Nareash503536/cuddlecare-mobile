import axios  from "axios";

export const ApiManager = axios.create({
        baseURL: "http://192.168.137.19:8082",
        responseType: "json",
});
