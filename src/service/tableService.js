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
    updateTable(id, nameTable) {

        return axios.put(API_URL + `/api/table/update/${id}?name=${encodeURIComponent(nameTable)}`, null, { headers });
    }

    deleteTable(idTable) {
        return axios.delete(API_URL + `/api/table/delete/${idTable}`, { headers });
    }

}

const tableService = new TableService();

export default tableService;
