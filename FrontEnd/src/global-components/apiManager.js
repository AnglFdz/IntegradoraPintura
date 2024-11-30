import axios from "axios";

const apiManager = axios.create({
    baseURL: `http://localhost:8000/api`,
    responseType: "json",
    allowCredentials: false,
    headers: {
        "Content-Type": "application/json",
    },
});



export default apiManager;