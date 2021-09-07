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
import Authentification from "./views/Authentification";
import { Component } from "react";
import ResultSearch from "./views/ResultSearch";
import firebase from "firebase";

class App extends Component {

  state={
    user: {}
  }

  componentDidMount(){
    firebase
    .auth()
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
      fetch(process.env.REACT_APP_API_URL + "/api/user?email=" + user.email)
        .then((response) => response.json())
        .then((data) => {
          this.setState({user : data});
        })
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
              <Route path="/search">
                <ResultSearch />
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
