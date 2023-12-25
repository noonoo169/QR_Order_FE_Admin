import axios from "axios";
import getHeaders from "./headers";
const API_URL = process.env.REACT_APP_BE_URL
const headers = getHeaders();

class TableService {

    saveTable(tableName) {
        return axios.post(API_URL + "/api/table/add?tableName=" + tableName, null, { headers });
    }
    getAllTable() {
        return axios.get(API_URL + "/api/table/");
    }

    getNameTableById(idTable) {
        return axios.get(API_URL + `/api/table/${idTable}`);
    }

}

const tableService = new TableService();

export default tableService;
