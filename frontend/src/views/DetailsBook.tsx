import axios from "axios";
import { Component, Fragment, MouseEvent } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Menu from "../components/menu/Menu";
import CardBook from "../components/utilities/CardBook";
import SidebarComments from "../components/utilities/SidebarComments";
import { book } from "../model/book";
import { AuthContext } from "../providers/Provider";
import Utils from "../utils/Utils";
import "./DetailsBook.css";

export interface DetailsBookState {
  book: book;
  similarBooks: Array<book>;
  choiceQuantity: number;
  liked: boolean;
  showComment: boolean;
}
class DetailsBook extends Component<any, DetailsBookState> {

  static contextType = AuthContext;

  state = {
    book: {} as book,
    similarBooks: [] as Array<book>,
    choiceQuantity: 1,
    liked: false,
    showComment: false
  }

  componentDidMount() {
    this.getBook(this.props.match.params.id);
    this.getSimilarBook(this.props.match.params.id);
  }

  getBook(id: number) {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/book/" + id)
      .then((res) => {
        const data = res.data;
        this.setState({ book: data, liked: this.isLiked(data) });
      })
      .catch((error) => console.log(error));
  }

  getSimilarBook = (id: book) => {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/book/" + id + "/similar")
      .then((res) => {
        this.setState({ similarBooks: res.data });
      })
      .catch((error) => console.log(error));
  }


  isLiked = (book: book): boolean => {
    return false;
  }

  addComment = (content: string): void => {

    const context = this.context

    if (Utils.isNotNullObject(context.currentUser)) {
      axios
        .post(process.env.REACT_APP_API_URL + "/api/book/" + this.state.book.id + "/add-comment",
          {content: content, email: context.currentUser.email, id : this.state.book.id })
        .then((res) => {
          if(res.status===Utils.CREATED_STATUS){
            this.getBook(this.state.book.id)
          };
        })
        .catch((error) => console.error(error));
    }else {
      alert("Vous devez êtes connecté pour ajouter un commentaire");
    }
  }

  deleteComment = () : void =>{
    console.log("ajout commentaire")
  }
  showComment = () => {
    this.setState({ showComment: !this.state.showComment })
  }

  addLiked = (user: object | null) => {
    console.log(user);
  }

  addToPanier = (event: MouseEvent<HTMLButtonElement>) => {

    const data = this.state;
    // axios.post(process.env.REACT_APP_API_URL + "/api/panier", { data })
    //   .then((resp)=> console.log(resp)) //() => 
    //   .catch(error => console.error(error))

    Utils.setCookie("book" + data.book.id.toString(), data.book.id.toString() + "_" + data.choiceQuantity, 1);
    this.props.history.push("/panier");

  }

  render() {
    const book = this.state.book;
    let similarBookBalises: {} | null | undefined = [];

    if (book != null) {
      // book likes
      let likesNode = [];
      let likes = this.state.book.nbre_stars;
      if (likes !== null) {
        // à gérer après
        for (let j = 0; j < 5; j++) {
          likesNode.push(<i className="fas fa-star mr-1" key={j}></i>);
        }
      } else {
        for (let j = 0; j < 5 - likes; j++) {
          likesNode.push(<i className="far fa-star mr-1" key={j}></i>);
        }
      }

      //similar books
      const similarBooks = this.state.similarBooks;
      if (similarBooks.length !== 0) {
        similarBookBalises = similarBooks.map((book: book) => (
          <Link
            to={{
              pathname: `/books/${book.id}`,
              //@ts-ignore
              params: { id: book.id },
            }}
            className="col-3 px-0 my-2"
            key={book.id}
          >
            <CardBook book={book} />
          </Link>
        ))
      }

      return (
        <Fragment>
          <div id="details-book">
            <Menu color="gray" />

            <div className="container">
              <div className="row mt-5 mb-1">
                <img
                  className="col-4 mr-2"
                  src={Utils.getIllustration(book.illustration)}
                  alt={book.illustration !== null ? "" : "Pas d'image"}
                />
                <div className="col-7">
                  <div className="row">
                    <h2 className="col-10">
                      <b className="col-8">{book.title}</b>
                    </h2>
                    <AuthContext.Consumer>
                      {(context) => (
                        <button
                          id="like"
                          className={this.state.liked ? "btn btn-primary btn-sm btn-sm" : "col-2 btn btn-secondary btn-sm"}
                          onClick={() => this.addLiked(context.currentUser)}>
                          {this.state.liked ? "J'aime" : "Je n'aime pas"}
                        </button>
                      )}
                    </AuthContext.Consumer>
                  </div>
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
                        min="0"
                        value={this.state.choiceQuantity}
                        onChange={(event) => this.setState({ choiceQuantity: parseInt(event.currentTarget.value) })}
                      />
                    </div>
                  </div>
                  <button type="submit"
                    className="btn btn-dark"
                    disabled={this.state.book.quantity === 0 || this.state.choiceQuantity === 0}
                    onClick={this.addToPanier}>
                    Ajouter au panier
                  </button>
                  <button
                    className="btn btn-dark mr-3 ml-3"
                    onClick={() => this.setState({ showComment: !this.state.showComment })}>
                    Commentaires
                  </button>
                </div>
              </div>
              {this.state.similarBooks.length > 0 && <h3 className="row  mt-4">Livres similaires</h3>}
              <div className="row">
                {similarBookBalises}
              </div>
            </div>
            <SidebarComments 
              book={this.state.book} 
              visible={this.state.showComment} 
              show={this.showComment} 
              add={this.addComment} 
              delete={this.deleteComment}/>
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
