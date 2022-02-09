import "./App.css";
import Home from "./views/Home";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import Book from "./views/Book";
import DetailsBook from "./views/DetailsBook";
import DetailsArticle from "./views/DetailsArticle";
import Panier from "./components/panier/Panier";
import Article from "./views/Article";
import Profil from "./views/Profil";
import { AuthContext, AuthProvider } from "./providers/Provider";
import Authentification from "./views/Authentification";
import { Component } from "react";
import ResultSearch from "./views/ResultSearch";
import firebase from "firebase";
import EditArticle from "./views/EditArticle";
import Debates from "./views/Debates";
import DetailsDebate from "./views/DetailsDebate";
import axios from "axios";
import NotFound from "./components/utilities/NotFound";
import { OnLoading } from "./components/utilities/OnLoading";
import Payment from "./views/Payment";
export interface AppState {
  user: any;
  isLoading: boolean;
}

class App extends Component<AppState> {

  state: AppState = {
    user: {},
    isLoading: false
  }


  componentDidMount() {
    firebase
      .auth()
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        axios.get(process.env.REACT_APP_API_URL + "/api/user?email=" + user.email)
          .then((response) =>
            this.setState({ user: response.data }))
          .catch((error) => console.error(error));
      }
    });
  }

  render() {
    return (
      <div className="App">
        <div className="content-root">
          <AuthProvider>
            <Router>
              <Route exact path="/" component={Home} />
              <Route exact path="/books" component={Book} />
              <Route exact path="/books/:id" component={DetailsBook} />
              <Route exact path="/article" component={Article} />
              <Route exact path="/article/:id" component={DetailsArticle} />
              <Route exact path="/search" component={ResultSearch} />
              <Route exact path="/panier" component={Panier} />
              <Route exact path="/connexion" component={Authentification} />
              <Route exact path="/debates" component={Debates} />
              <Route exact path="/debates/:id" component={DetailsDebate} />
              <Route exact path="/facturation" component={Payment} />
              <Route exact path="/not-found" component={NotFound} />

              <AuthContext.Consumer>
                {(context) => (
                  <Route
                    exact
                    path="/profil"
                    render={() =>
                      context.currentUser !== null && context.currentUser.email !== undefined ? (
                        <Profil />
                      ) : (
                        context.isLoading ?
                          <Redirect
                            to={{
                              pathname: "/connexion",
                              //warningMessage:
                              //"Vous devez être connecté pour créer un projet.",
                            }}
                          /> : <OnLoading />
                      )
                    }
                  />)}
              </AuthContext.Consumer>

              <Route
                exact
                path="/addArticle"
                render={() =>
                  !!this.state.user && this.state.user.email !== undefined ? (
                    <EditArticle />
                  ) : (
                    <Redirect
                      to={{
                        pathname: "/connexion",
                        //warningMessage:
                        //"Vous devez être connecté pour créer un projet.",
                      }}
                    />
                  )
                }
              />
            </Router>
          </AuthProvider>
        </div>
      </div>
    );
  }
}

export default App;