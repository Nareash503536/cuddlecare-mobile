import axios  from "axios";

export const ApiManager = axios.create({
        baseURL: "http://10.22.165.112:3000",
        responseType: "json",
});
