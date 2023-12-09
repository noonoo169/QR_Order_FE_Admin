import axios from "axios";
import getHeaders from "./headers";
const API_URL = process.env.REACT_APP_BE_URL
const headers = getHeaders();

class ComboService {

    saveCombo(combo) {
        return axios.post(API_URL + "/api/combo/add", combo, { headers });
    }
    getAllCombo() {
        return axios.get(API_URL + "/api/combo/");
    }
    updateCombo(id, combo) {
        return axios.put(API_URL + "/api/combo/update/" + id, combo, { headers });
    }
    deleteCombo(id) {
        return axios.delete(API_URL + "/api/combo/delete/" + id, { headers });
    }

}

const comboService = new ComboService();

export default comboService