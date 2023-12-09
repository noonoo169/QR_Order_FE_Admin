import axios from "axios";
import getHeaders from "./headers";
const API_URL = process.env.REACT_APP_BE_URL

const headers = getHeaders();

class AdminActionService {

    createAccountForStaff(staff) {
        return axios.post(API_URL + "/api/adminAction/createAccountForStaff", staff, { headers });
    }

    deleteAccountUser(username) {
        return axios.delete(API_URL + "/api/adminAction/deleteUserAccount", {
            params: {
                username: username
            },
            headers
        });
    }

    resetUserPassword(username) {
        return axios.put(API_URL + `/api/adminAction/resetUserPassword?username=${encodeURIComponent(username)}`, null, { headers });
    }

}

const adminActionService = new AdminActionService();

export default adminActionService;
