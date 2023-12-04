import axios from "axios";
const API_URL = process.env.REACT_APP_BE_URL

class CommentService {

    getCommentByIdProduct(idProduct) {
        return axios.get(API_URL + "/api/comment/?productId=" + idProduct);
    }
    deleteComment(idComment) {
        return axios.delete(API_URL + "/api/comment/adminDeleteComment/" + idComment);
    }

}

const commentService = new CommentService();

export default commentService;
