import axios from "axios";
import getHeaders from "./headers";
const API_URL = process.env.REACT_APP_BE_URL

const headers = getHeaders();

class UserService {

    getAllUser() {
        return axios.get(API_URL + "/api/user/allUsers", { headers });
    }

    getRoleByUsername(username) {
        return axios.get(API_URL + "/api/user/getRoleByUsername?username=" + username);
    }

}

const userService = new UserService();

export default userService;
