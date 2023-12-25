import axios from "axios";
import getHeaders from "./headers";
const API_URL = process.env.REACT_APP_BE_URL

const headers = getHeaders();

class ProductService {

    saveProduct(product) {
        const accessToken = localStorage.getItem("accessToken");
        return axios.post(API_URL + "/api/product/add", product, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "multipart/form-data", 
            },
        });
    }
    getAllProduct() {
        return axios.get(API_URL + "/api/product");
    }
    getProductById(id) {
        return axios.get(API_URL + "/api/product/" + id);
    }

    getProductByCategoryName(nameCategory) {
        return axios.get(API_URL + "/api/product/?categoryName=" + nameCategory);
    }

    updateProduct(id, product) {
        return axios.put(API_URL + `/api/product/update/${id}`, product);
    }

    deleleProduct(id) {
        return axios.delete(API_URL + "/api/product/delete/" + id, { headers })
    }
}

const productService = new ProductService();

export default productService;
