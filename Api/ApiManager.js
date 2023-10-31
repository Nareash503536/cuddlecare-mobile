import axios  from "axios";

export const ApiManager = axios.create({

        baseURL: "http://192.168.8.102:8082",
        responseType: "json",
});
