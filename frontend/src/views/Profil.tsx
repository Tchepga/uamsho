import React, { Fragment, MouseEvent } from "react";
import DetailsProfil from "../components/profil/DetailsProfil";
import Menu from "../components/menu/Menu";
import PassOrder from "../components/profil/PassOrder";
import CurrentArticle from "../components/profil/CurrentArticle";
import CurrentDebate from "../components/profil/CurrentDebate";
import { AuthContext } from "../providers/Provider";
import firebase from "firebase";
import { withRouter } from "react-router";
import { article } from "../model/article";
import axios from "axios";

export interface ProfilState {
  isLoading: boolean,
  isProfil: boolean,
  isArticle: boolean,
  isArticleFavorite: boolean,
  isDebate: boolean,
  isOrders: boolean,
  user: string,
  articles: Array<article>,
  favorisArticles: Array<article>

}
class Profil extends React.Component<any, ProfilState> {

  static contextType = AuthContext;

  constructor(props: any) {
    super(props)
    this.state = {
      isLoading: false,
      isProfil: true,
      isArticle: false,
      isArticleFavorite: false,
      isDebate: false,
      isOrders: false,
      user: "",
      articles: [],
      favorisArticles: []
    };

    this.changeDetails = this.changeDetails.bind(this);
  }
  componentDidMount() {

    // for redirection when article are created
    const location = this.props.location;
    if (location.state != null) {
      this.setState({ isArticle: location.state.isArticle, isProfil: false })
    }

    this.getFavorisArticles();
  }

  getArticle = () => {


    const currentUser = this.context.currentUser;
    axios
      .get(process.env.REACT_APP_API_URL + "/api/article?email=" + currentUser.email + "&username=" + currentUser.username)
      .then((res) => {
        this.setState({ articles: res.data.articles });
      })
      .catch((error) => console.log(error));

  }

  getFavorisArticles = () => {
    const currentUser = this.context.currentUser;

    axios
      .get(process.env.REACT_APP_API_URL + "/api/article?filter=FAVORIS&email=" + currentUser.email + "&username=" + currentUser.username)
      .then((res) => {
        this.setState({ articles: res.data });
      })
      .catch((error) => console.log(error));
  }
  changeDetails(event: MouseEvent<HTMLButtonElement>) {
    const type = event.currentTarget.value;
    console.log(type)

    this.setState({
      isProfil: false,
      isDebate: false,
      isOrders: false,
      isArticleFavorite: false,
      isArticle: false,
    });

    switch (type) {
      case "DEBATE":
        this.setState({ isDebate: true });
        break;
      case "ORDER":
        this.setState({ isOrders: true });
        break;
      case "ARTICLE":
        this.getArticle();
        this.setState({ isArticle: true });
        break;
      case "ARTICLE_FAVORITE":
          this.getFavorisArticles();
          this.setState({ isArticleFavorite: true });
          break;
      case "PROFIL":
      default:
        this.setState({ isProfil: true });
    }

  }

  render() {
    return (
      <AuthContext.Consumer>
        {(context) => (context.currentUser !== null &&
          <Fragment>
            <Menu />
            <div className="container">
              <div className="row mt-5">
                <div className="card col-4">
                  <div style={{ textAlign: "center" }}>
                    <i
                      className="far fa-user"
                      style={{ fontSize: "100px", padding: "16px" }}
                    ></i>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title" style={{ textAlign: "center" }}>
                      {context.currentUser.first_name}
                    </h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <button
                        type="button"
                        value="PROFIL"
                        className="btn btn-light"
                        style={{ width: "100%" }}
                        onClick={this.changeDetails}
                      >
                        Profil
                      </button>
                    </li>
                    <li className="list-group-item">
                      <button
                        type="button"
                        value="ORDER"
                        className="btn btn-light"
                        style={{ width: "100%" }}
                        onClick={this.changeDetails}
                      >
                        Mes commandes
                      </button>
                    </li>
                    <li className="list-group-item">
                      <button
                        type="button"
                        value="ARTICLE"
                        className="btn btn-light"
                        style={{ width: "100%" }}
                        onClick={this.changeDetails}
                      >
                        Mes articles
                      </button>

                    </li>
                    <li className="list-group-item">
                      <button
                        type="button"
                        value="ARTICLE_FAVORITE"
                        className="btn btn-light"
                        style={{ width: "100%" }}
                        onClick={this.changeDetails}
                      >
                        Articles favorites
                      </button>

                    </li>
                    <li className="list-group-item">
                      <button
                        type="button"
                        value="DEBATE"
                        className="btn btn-light"
                        style={{ width: "100%" }}
                        onClick={this.changeDetails}
                      >
                        Débâts en cours
                      </button>
                    </li>
                    <li className="list-group-item">
                      <button
                        type="button"
                        className="btn btn-light"
                        style={{ width: "100%" }}
                        onClick={() => {
                          firebase.auth().signOut();
                        }}
                      >
                        Déconnexion
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="col-8">
                  {this.state.isProfil && (
                    <DetailsProfil user={context.currentUser} />
                  )}
                  {this.state.isOrders && <PassOrder user={context.currentUser} />}
                  {this.state.isArticle && (
                    <CurrentArticle user={context.currentUser} isFavorite={false} data={this.state.articles} />
                  )}
                  {this.state.isArticleFavorite && (
                    <CurrentArticle user={context.currentUser} isFavorite={true} data={this.state.favorisArticles} />
                  )}
                  {this.state.isDebate && (
                    <CurrentDebate user={context.currentUser} />
                  )}
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default withRouter(Profil);
