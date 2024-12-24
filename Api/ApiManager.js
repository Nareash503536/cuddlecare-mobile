import axios  from "axios";

export const ApiManager = axios.create({

        baseURL: "http://192.168.43.22:8082",
        responseType: "json",
});
