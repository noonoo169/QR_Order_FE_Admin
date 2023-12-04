import axios from "axios";
const API_URL = process.env.REACT_APP_BE_URL

class LoginService {
    login(loginData) {
        return axios.post(API_URL + "/api/auth/login", loginData);
    }
}


const loginService = new LoginService();

export default loginService;
