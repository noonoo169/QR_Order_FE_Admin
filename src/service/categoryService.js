import axios from "axios";
import getHeaders from "./headers";
const API_URL = process.env.REACT_APP_BE_URL

const headers = getHeaders();

class CategoryService {

    saveCategory(category) {
        return axios.post(API_URL + "/api/category/add", category, { headers });
    }
    getAllCategory() {
        return axios.get(API_URL + "/api/category");
    }

    updateCategory(id, nameCategory) {

        return axios.put(API_URL + `/api/category/update/${id}?name=${encodeURIComponent(nameCategory)}`, null, { headers });
    }

    deleleCategory(id) {
        return axios.delete(API_URL + "/api/category/delete/" + id, { headers })
    }
}

const categoryService = new CategoryService();

export default categoryService;
