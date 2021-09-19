import axios from "axios";
import { ChangeEvent, Component, Fragment } from "react";
import { book } from "../../model/book";
import { AuthContext } from "../../providers/Provider";
import Utils from "../../utils/Utils";
import Footer from "../footer/Footer";
import Menu from "../menu/Menu";

export interface PanierState {
  currentUser: any,
  items: Array<book>;
  change: string;
  costDelivery: number;
  total: number;
}
class Panier extends Component<any, PanierState> {

  static contextType = AuthContext;

  state = {
    currentUser: null,
    items: [] as Array<book>,
    change: "€",
    costDelivery: 5, // TOTO à traiter
    total: 0
  }

  removeBook = (book : book) => {
    let items = this.state.items;
    Utils.deleteBookCookie("book" + book.id.toString())
    
    const indexELement = items.findIndex(item => item.id === book.id);
   
    if(indexELement !== 0){
      items = items.slice(indexELement);
      this.setState({ items: items});
    }else {
      this.setState({ items: []});
    }
    

  }
  updateQuantity = (event: ChangeEvent<HTMLInputElement>, id: number) => {
    let { items } = this.state;
    let sum = 0;

    const indexELement = items.findIndex(item => item.id === id);
    let copyItems = [...items];
    copyItems[indexELement] = { ...copyItems[indexELement], choiceQuantity: parseInt(event.currentTarget.value) };

    items.forEach((item: book) => sum += item.price * item.choiceQuantity);

    this.setState({ items: copyItems, total: sum });

    Utils.setCookie("book" + id.toString(), id.toString() + "_" + event.currentTarget.value, 1);
  }

  componentDidMount() {


    const booksInfo: Array<string> = Utils.getBookCookie();
    let sum = 0;
    booksInfo.forEach((bookInfo: string) => {

      const data = bookInfo.split('_')
      if (Utils.isNotNullObject(data)) {
        axios
          .get(process.env.REACT_APP_API_URL + "/api/book/" + data[0])
          .then((res) => {

            let items = this.state.items;
            let item: book = res.data;
            item.choiceQuantity = parseInt(data[1])
            items.push(item)

            items.forEach((item: book) => sum += item.price * item.choiceQuantity);

            this.setState({ items: items, total: sum });
          })
          .catch((error) => console.log(error));
      }
    });

  }

  render() {

    const data = this.state.items;

    const itemsBalises = data.map((book: book) => (
      <li className="list-group-item" key={book.id}>
        <div className="row">
          <img
            className="col-2"
            style={{ maxHeight: "80px" }}
            src={Utils.getIllustration(book)}
            alt="première de couverture"
          />
          <div className="col-5">
            <b>{book.title}</b>
            <br />
            <b>
              {book.price}
              {this.state.change}
            </b>
          </div>
          <input
            type="number"
            className="offset-1 col-2 align-self-center"
            value={book.choiceQuantity}
            onChange={(event) => this.updateQuantity(event, book.id)} />
          <i className="col-1 offset-1 fas fa-minus-circle fa-2x align-self-center cursor-pointer" onClick={() => this.removeBook(book)}/>
        </div>
      </li>
    ));

    return (
      <div className="default-color">
        <Menu/>
        <div className="container mt-5 mb-2">
          <div className="row">
            <div className="card col-8">
              <div className="card-header">
                <b>Panier</b>
              </div>
              <ul className="list-group list-group-flush">{itemsBalises.length>0 ? itemsBalises: 
                                                            <span className="mt-1">Aucun article présent.</span>}</ul>
            </div>
            <div className="row col-4">
              <div className="card col-12">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <div className="row">
                      <span className="col-7">{this.state.items.length} articles</span>
                      <span className="col-5 text-right">{this.state.total + this.state.change}</span>
                    </div>
                    <div className="row">
                      <span className="col-5">Livraison</span>
                      <span className="col-7 text-right">{this.state.costDelivery + " " + this.state.change} </span>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="row">
                      <span className="col-7">Total TTC</span>
                      <span className="col-5 text-right">{this.state.total + this.state.costDelivery + this.state.change}</span>
                    </div>
                  </li>
                  <li className="list-group-item align-self-end">
                    <button type="button" className="btn btn-dark">
                      Commander
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Panier;
