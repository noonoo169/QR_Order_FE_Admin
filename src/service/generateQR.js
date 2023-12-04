import axios from "axios";
const API_URL = process.env.REACT_APP_BE_URL

class GenerateQRService {

    generate(urlWeb, IdTable) {
        return axios.get(API_URL + `/api/QRCode/genrateQRCode/${urlWeb}/${IdTable}/350/350`,
            {
                responseType: 'arraybuffer',
            });
    }

}

const generateQRService = new GenerateQRService();

export default generateQRService;
