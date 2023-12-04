import axios from "axios";
const API_URL = process.env.REACT_APP_BE_URL

class OrderOnlineService {

    getAllOrderOnline() {
        return axios.get(API_URL + "/api/order/onlineOrders");
    }

}

const orderOnlineService = new OrderOnlineService();

export default orderOnlineService;
