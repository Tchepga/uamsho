import axios from 'axios';

export class ApiBookService{

    bookOnTop(){
        axios
      .get(process.env.REACT_APP_API_URL + "/api/article/ontop")
      .then((response) => {
        //this.setState({ books: response.data });
      })
      .catch((error) => console.log(error));
    }
}