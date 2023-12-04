import axios from "axios";
const API_URL = process.env.REACT_APP_BE_URL

class OrderService {

    saveCategory(category) {
        return axios.post(API_URL + "/api/category/add", category);
    }
    getAllOrderOffline() {
        return axios.get(API_URL + "/api/order/offlineOrders");
    }

    getOrderByIdTable(idTable) {
        return axios.get(API_URL + "/api/order/getCurrentOrderOfTable/" + idTable);
    }

    confirmDoneOrder(idOrder) {
        return axios.put(API_URL + "/api/order/confirmDoneOrderOfTable/" + idOrder)
    }

    updateStatusOrder(idOrder, statusOrder) {
        return axios.put(API_URL + "/api/order/updateStatusOrder/" + idOrder, { orderStatus: statusOrder });
    }

    updateCategory(id, nameCategory) {
        return axios.put(API_URL + `/api/category/update/${id}?name=${encodeURIComponent(nameCategory)}`);
    }

    deleleCategory(id) {
        return axios.delete(API_URL + "/api/category/delete/" + id)
    }
}

const orderSerive = new OrderService();

export default orderSerive;
