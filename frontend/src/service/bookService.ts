import axios from 'axios';
import { user } from '../model/user';
const BookService = {

    bookOnTop(){
        axios
      .get(process.env.REACT_APP_API_URL + "/api/article/ontop")
      .then((response) => {
        //this.setState({ books: response.data });
      })
      .catch((error) => console.log(error));
    },

    deleteComment(pk : number, user : user){
       // check role
       // call axios api request to delete
    }
}

export default BookService;