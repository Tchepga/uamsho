import axios from "axios";
import { article } from "../model/article";
import { book } from "../model/book";
import { debate } from "../model/debate";
import { like } from "../model/like";
import Utils from "../utils/Utils";

const LikeService = {
  async addLike(instance: book | article | debate, typeInstance: string, currentUser: any) {

    if (Utils.isNotNullObject(instance)) {
      axios
        .post(process.env.REACT_APP_API_URL + "/api/like", { instance: instance.id, typeInstance: typeInstance, email: currentUser.email })
        .then((response) => response.status === Utils.CREATED_STATUS ? console.log('likes added') : console.error("error when adding like"))
        .catch((error: any) => console.error(error));

    } else {
      throw new Error("Invalid bookId!")
    }
  },

  async remove(likeId: number, currentUser: any) {
    if (likeId !== 0) {
      return await axios
        .delete(process.env.REACT_APP_API_URL + "/api/like/" + likeId + "?email=" + currentUser.email)
        .catch((error: any) => console.error(error));

    } else {
      throw new Error("Invalid bookId!")
    }
  },

  async retrieve(bookId: number): Promise<Array<like>| null> {

    
    if (bookId !== 0) {
      const response = await axios
      .get(process.env.REACT_APP_API_URL + "/api/like/retrieve?bookId=" + bookId)
      .catch((error: any) => console.error(error));
      
      return response?.data;
    } else {
      return null;
    }
  }
}

export default LikeService;