import axios from "axios";
const API_URL = process.env.REACT_APP_BE_URL

class CategoryService {

    saveCategory(category) {
        return axios.post(API_URL + "/api/category/add", category);
    }
    getAllCategory() {
        return axios.get(API_URL + "/api/category");
    }

    updateCategory(id, nameCategory) {
        return axios.put(API_URL + `/api/category/update/${id}?name=${encodeURIComponent(nameCategory)}`);
    }

    deleleCategory(id) {
        return axios.delete(API_URL + "/api/category/delete/" + id)
    }
}

const categoryService = new CategoryService();

export default categoryService;
