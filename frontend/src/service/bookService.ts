import axios from 'axios';
import { book } from '../model/book';
import { user } from '../model/user';
import Utils from '../utils/Utils';
const BookService = {
  
  bookOnTop() {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/article/ontop")
      .then((response) => {
        //this.setState({ books: response.data });
      })
      .catch((error) => console.log(error));
  },

  async getBook(bookId: number) : Promise<book>{
    if (bookId !== 0) {
      const response = await axios
        .get(process.env.REACT_APP_API_URL + "/api/book/" + bookId)
        .catch((error: any) => console.error(error));

        return response?.data;
    }else {
      throw new Error("Invalid bookId!")
    }
  },
  async getSimilarBook(bookId: number): Promise<Array<book>>{
    if (bookId !== 0) {
    const response = await axios
      .get(process.env.REACT_APP_API_URL + "/api/book/" + bookId + "/similar")
      .catch((error) => console.log(error));

      return response?.data;
    }else{
      throw new Error("Invalid bookId!")
    }
  },

  addComment(content: string, email: string, bookId: number) {
    axios
      .post(process.env.REACT_APP_API_URL + "/api/book/" + bookId + "/add-comment",
        { content: content, email: email, id: bookId })
      .then((res) => {
        if (res.status === Utils.CREATED_STATUS) {
          this.getBook(bookId)
        };
      })
      .catch((error) => console.error(error));

  },

  deleteComment(pk: number, user: user) {
    // check role
    // call axios api request to delete

    console.log("DeleteComment not implemented!")
  }
}

export default BookService;