import "./App.css";
import Home from "./views/Home";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import Book from "./views/Book";
import DetailsBook from "./views/DetailsBook";
import DetailsArticle from "./views/DetailsArticle";
import Panier from "./components/panier/Panier";
import Article from "./views/Article";
import Profil from "./views/Profil";
import { AuthProvider } from "./providers/Provider";
import firebase from "./components/authentification/firebase";
import Authentification from "./views/Authentification";
import { Spinner } from "react-bootstrap";
import { Component } from "react";

class App extends Component {
  
  render() {
   
      return (
        <div className="App">
          <div className="content-root">
            <AuthProvider>
              <Router>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/books">
                  <Book />
                </Route>
                <Route exact path="/books/:id">
                  <DetailsBook />
                </Route>
                <Route exact path="/panier">
                  <Panier />
                </Route>
                <Route exact path="/article">
                  <Article />
                </Route>
                <Route path="/article/:id">
                  <DetailsArticle />
                </Route>
                <Route exact path="/connexion">
                  <Authentification />
                </Route>
                <Route
                  exact
                  path="/profil"
                  render={() =>
                    !!this.state.user ? (
                      <Profil />
                    ) : (
                      <Redirect
                        to={{
                          pathname: "/connexion",
                          warningMessage:
                            "Vous devez être connecté pour créer un projet.",
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
