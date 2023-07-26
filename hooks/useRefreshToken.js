import { AuthContext } from "../Context/AuthContext";

const useRefreshToken = () => {
    const refresh = async () => {
        const setAuth = useContext(AuthContext);
        const response = await axios.post(BASE_URL + "/refresh-token", {
            withCredentials: true
        });
    }
}