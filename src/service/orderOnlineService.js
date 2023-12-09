import axios from "axios";
import getHeaders from "./headers";
const API_URL = process.env.REACT_APP_BE_URL
const headers = getHeaders();

class OrderOnlineService {

    getAllOrderOnline() {
        return axios.get(API_URL + "/api/order/onlineOrders", { headers });
    }

    getOnlineOrderById(id) {
        return axios.get(API_URL + "/api/order/onlineOrder/" + id);
    }

}

const orderOnlineService = new OrderOnlineService();

export default orderOnlineService;