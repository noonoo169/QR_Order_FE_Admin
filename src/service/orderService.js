import axios from "axios";
import getHeaders from "./headers";

const API_URL = process.env.REACT_APP_BE_URL

const headers = getHeaders();

class OrderService {

    getAllOrderOffline() {
        return axios.get(API_URL + "/api/order/offlineOrders", { headers });
    }

    getOrderByIdTable(idTable) {
        return axios.get(API_URL + "/api/order/getCurrentOrderOfTable/" + idTable);
    }

    confirmDoneOrder(idOrder, paymentMethod) {
        return axios.put(API_URL + `/api/order/confirmDoneOrderOfTable/${idOrder}?paymentMethod=${paymentMethod}`, null, { headers })
    }

    updateStatusOrder(idOrder, statusOrder) {
        return axios.put(API_URL + "/api/order/updateStatusOrder/" + idOrder, { orderStatus: statusOrder }, { headers });
    }

    getAllOrder() {
        return axios.get(API_URL + "/api/order/getAllOrder");
    }

}

const orderSerive = new OrderService();

export default orderSerive;
