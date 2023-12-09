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

    updateCategory(id, nameCategory) {
        return axios.put(API_URL + `/api/category/update/${id}?name=${encodeURIComponent(nameCategory)}`);
    }

    deleleCategory(id) {
        return axios.delete(API_URL + "/api/category/delete/" + id)
    }
}

const tableService = new TableService();

export default tableService;
