import axios from "axios";
const API_URL = process.env.REACT_APP_BE_URL

class ProductService {

    saveProduct(product) {
        return axios.post(API_URL + "/api/product/add", product);
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
        return axios.delete(API_URL + "/api/product/delete/" + id)
    }
}

const productService = new ProductService();

export default productService;
