import axios  from "axios";

export const ApiManager = axios.create({
        baseURL: "http://192.168.8.101:3000",
        responseType: "json",
});
