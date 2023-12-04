import axios from "axios";
const API_URL = process.env.REACT_APP_BE_URL

class ComboService {

    saveCombo(combo) {
        return axios.post(API_URL + "/api/combo/add", combo);
    }
    getAllCombo() {
        return axios.get(API_URL + "/api/combo/");
    }
    updateCombo(id, combo) {
        return axios.put(API_URL + "/api/combo/update/" + id, combo);
    }
    deleteCombo(id) {
        return axios.delete(API_URL + "/api/combo/delete/" + id);
    }

}

const comboService = new ComboService();

export default comboService