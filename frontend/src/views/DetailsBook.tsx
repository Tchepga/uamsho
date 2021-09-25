import axios from "axios";
import { Component, Fragment, MouseEvent } from "react";
import { withRouter } from "react-router";
import Footer from "../components/footer/Footer";
import Menu from "../components/menu/Menu";
import { book } from "../model/book";
import { AuthContext } from "../providers/Provider";
import Utils from "../utils/Utils";
import "./DetailsBook.css";

export interface DetailsBookState {
  book: book;
  choiceQuantity: number;
}
class DetailsBook extends Component<any, DetailsBookState> {

  static contextType = AuthContext;

  state = {
    book: {} as book,
    choiceQuantity: 0
  }

  componentDidMount() {

    this.getBook(this.props.match.params.id);
  }

  getBook(id: number) {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/book/" + id)
      .then((res) => {
        this.setState({ book: res.data });
      })
      .catch((error) => console.log(error));
  }

  addToPanier = (event: MouseEvent<HTMLButtonElement>) => {

    const data = this.state;
    // axios.post(process.env.REACT_APP_API_URL + "/api/panier", { data })
    //   .then((resp)=> console.log(resp)) //() => 
    //   .catch(error => console.error(error))

    Utils.setCookie("book"+data.book.id.toString(), data.book.id.toString() + "_" + data.choiceQuantity, 1);
    this.props.history.push("/panier");

  }

  render() {
    const book = this.state.book;

    if (book != null) {
      let likesNode = [];
      let likes = this.state.book.nbre_stars;
      if (likes !== null) {
        // à gérer après
        for (let j = 0; j < 5; j++) {
          likesNode.push(<i className="fas fa-heart mr-1" key={j}></i>);
        }
      } else {
        for (let j = 0; j < 5 - likes; j++) {
          likesNode.push(<i className="far fa-heart mr-1" key={j}></i>);
        }
      }

      return (
        <Fragment>
          <Menu color="gray" />
          <div className="container">
            <div className="row mt-5">
              <img
                className="col-3 mr-2"
                src={Utils.getIllustration(book.illustration)}
                alt={book.illustration !== null ? "" : "Pas d'image"}
              />
              <div className="col-8 mb-5">
                <h2>
                  <b>{book.title}</b>
                </h2>
                <h6 className="card-title mt-3">{likesNode}</h6>
                <h4>Bibliographie:</h4>
                <p>
                  {book.description}
                </p>
                <div className="row">
                  <span className="badge bg-primary ml-3">Edition : {book.edition}</span>
                  <span className="badge bg-warning ml-2">Edité le : {Utils.dateFromString(book.date_edition)}</span>
                  <span className="badge bg-light ml-2">Nombre de page : {book.number_page}</span>
                </div>
                <div className="row mt-3">
                  <span className="badge bg-info ml-3">Auteur : {book.author}</span>
                </div>
                <b style={{ color: "#ff1744", fontSize: "30px" }}>{book.price} € TTC</b>
                <div className="mb-3 row">
                  <label htmlFor="quantity" className="col-sm-2 col-form-label">
                    Quantité
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="number"
                      className="form-control col-2"
                      id="quantity"
                      onChange={(event) => this.setState({ choiceQuantity: parseInt(event.currentTarget.value) })}
                    />
                    {this.state.book.quantity === 0 &&
                      <span style={{ color: "#d32f2f" }}>Article indisponible pour l'instant</span>}
                  </div>
                </div>
                <button type="submit"
                  className="btn btn-dark"
                  disabled={this.state.book.quantity === 0 || this.state.choiceQuantity === 0}
                  onClick={this.addToPanier}>
                  Ajouter au panier
                </button>
                <button className="btn btn-dark mr-3 ml-3">
                  <i className="fas fa-heart"></i>
                </button>
                <button className="btn btn-dark mr-3 ml-3">
                  Donner son avis
                </button>
              </div>
            </div>
          </div>
          <Footer />
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Menu color="gray" />
          <h2 className="alert-warning container mt-5">
            Un problème est subvenu lors de l'affichage de ce livre. Veuillez
            contacter votre administrateur.
          </h2>
        </Fragment>
      );
    }
  }
}

export default withRouter(DetailsBook);
