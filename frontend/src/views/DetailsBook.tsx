import firebase from "firebase";
import { Component, Fragment, MouseEvent } from "react";
import { withRouter } from "react-router";
import Footer from "../components/footer/Footer";
import Menu from "../components/menu/Menu";
import Card from "../components/utilities/Card";
import SidebarComments from "../components/utilities/SidebarComments";
import { book } from "../model/book";
import { like } from "../model/like";
import { AuthContext } from "../providers/Provider";
import BookService from "../service/BookService";
import LikeService from "../service/LikeService";
import Utils from "../utils/Utils";
import "./DetailsBook.css";

export interface DetailsBookState {
  book: book;
  similarBooks: Array<book>;
  choiceQuantity: number;
  liked: boolean;
  showComment: boolean;
  likes: Array<like> | null;
}
class DetailsBook extends Component<any, DetailsBookState> {

  static contextType = AuthContext;

  state = {
    book: {} as book,
    likes: [] as Array<like>,
    similarBooks: [] as Array<book>,
    choiceQuantity: 1,
    liked: false,
    showComment: false
  }

  async componentDidMount() {
    this.processData();
  }

  isLiked = (likes: Array<like>, currentUser: any): boolean => {

    // optimiser plus tard

    for (let i = 0; i < likes.length; i++) {
      if (likes[i].owner.email === currentUser.email) {
        return true;
      }
    };
    return false;
  }

  processData = () => {

    firebase
      .auth()
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        BookService.getSimilarBook(this.props.match.params.id)
          .then((books) => this.setState({ similarBooks: books }));
        LikeService.retrieve(this.props.match.params.id)
          .then((likes) => {
            if (likes !== null) {

              BookService.getBook(this.props.match.params.id)
                .then((book) => this.setState({ book: book, likes: likes, liked: this.isLiked(likes, user) }));
            }
          });
      } else {
        BookService.getSimilarBook(this.props.match.params.id)
          .then((books) => this.setState({ similarBooks: books }));

        BookService.getBook(this.props.match.params.id)
          .then((book) => this.setState({ book: book }));
      }
    });

  }

  addComment = (content: string): void => {

    const context = this.context

    if (Utils.isNotNullObject(context.currentUser)) {
      BookService.addComment(content, context.currentUser.email, this.state.book.id)
    } else {
      alert("Vous devez êtes connecté pour ajouter un commentaire");
    }
  }


  showComment = () => {
    this.setState({ showComment: !this.state.showComment })
  }

  updateLike = (user: any | null) => {
    if (user !== null) {
      if (!this.state.liked) {
        LikeService.addLike(this.state.book, "book", user).then(() => setTimeout(() => {
          this.processData();
        }, 100));
      } else {

        if (Utils.isNotNullObject(this.state.likes)) {

          const like = this.state.likes.find((like) => like.owner.email === user.email);
          if (like !== undefined) {
            LikeService.remove(like.id, user).then(() => LikeService.retrieve(this.props.match.params.id)
              .then((likes) => {
                if (likes !== null) {
                  this.setState({ likes: likes, liked: this.isLiked(likes, user) });
                }
              }));
          }
        }
      }

    } else {
      alert(">>Vous devez être connecté pour liked un article!<<");
    }
  }

  addToPanier = (event: MouseEvent<HTMLButtonElement>) => {

    const data = this.state;


    Utils.setCookie("book" + data.book.id.toString(), data.book.id.toString() + "_" + data.choiceQuantity, 1);
    this.props.history.push("/panier");

  }

  render() {
    const book = this.state.book;
    let similarBookBalises: {} | null | undefined = [];

    if (book != null) {
      // book likes
      let likesNode = [];
      const nbreStars = Math.ceil(this.state.likes.length / 10);

      if (Utils.isNotNullObject(this.state.likes)) {
        for (let j = 0; j < nbreStars; j++) {
          likesNode.push(<i className="fas fa-star mr-1 text-danger" key={j} ></i>);
        }

        for (let j = 0; j < 5 - nbreStars; j++) {
          likesNode.push(<i className="far fa-star mr-1" key={j}></i>);
        }
      }

      //similar books
      const similarBooks = this.state.similarBooks;
      if (similarBooks !== undefined && similarBooks.length !== 0) {
        similarBookBalises = similarBooks.map((book: book) => (
          <a
            href={`/books/${book.id}`}
            className="col-3 px-0 my-2"
            key={book.id}
          >
            <Card book={book} />
          </a>
        ))
      }

      return (
        <Fragment>
          <div id="details-book">
            <Menu />

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
                          className={this.state.liked ? "col-2 btn btn-primary btn-sm btn-sm" : "col-2 btn btn-secondary btn-sm"}
                          onClick={() => this.updateLike(context.currentUser)}>
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
                  <div className="row m-2">
                    {book.price !== 0 ? <b style={{ color: "#ff1744", fontSize: "30px" }}>{book.price} € TTC</b> :
                      <span className="badge" style={{ color: "white", backgroundColor: "green" }}>gratuit</span>}
                  </div>
                  <button type="submit"
                    className="btn btn-dark"
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
              {this.state.similarBooks !== undefined && this.state.similarBooks.length > 0 && <h3 className="row  mt-4">Livres similaires</h3>}
              <div className="row">
                {similarBookBalises}
              </div>
            </div>
            <SidebarComments
              book={this.state.book}
              visible={this.state.showComment}
              show={this.showComment}
              add={this.addComment}
              delete={BookService.deleteComment} />
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
