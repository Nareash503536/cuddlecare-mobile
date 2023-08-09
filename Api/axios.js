import axios from "axios";

export default axios.create({
    baseURL: "http://192.168.137.19:8082"
});