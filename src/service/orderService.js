import axios from "axios";
import getHeaders from "./headers";

const API_URL = process.env.REACT_APP_BE_URL

const headers = getHeaders();

class OrderService {

    getAllOrderOffline() {
        return axios.get(API_URL + "/api/order/offlineOrders");
    }

    getOrderByIdTable(idTable) {
        return axios.get(API_URL + "/api/order/getCurrentOrderOfTable/" + idTable);
    }

    confirmDoneOrder(idOrder) {
        return axios.put(API_URL + "/api/order/confirmDoneOrderOfTable/" + idOrder, null, { headers })
    }

    updateStatusOrder(idOrder, statusOrder) {
        return axios.put(API_URL + "/api/order/updateStatusOrder/" + idOrder, { orderStatus: statusOrder }, { headers });
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
