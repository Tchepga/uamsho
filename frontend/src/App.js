import './App.css'
import Home from './views/Home'
import { BrowserRouter as Router, Route } from "react-router-dom"
import Book from './views/Book';
import DetailsBook from './views/DetailsBook'
import Panier from './components/panier/Panier';
import Article from './views/Article';
import Profil from './views/Profil';
import {AuthProvider} from './providers/Provider';
import Authentification from './views/Authentification';
import PrivateRoute from './providers/PrivateRoute';

function App() {
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
          <Route exact path="/books/details">
            <DetailsBook />
          </Route>
          <Route exact path="/panier">
            <Panier />
          </Route>
          <Route exact path="/article">
            <Article />
          </Route>
          <Route exact path="/connexion">
            <Authentification />
          </Route>
          <PrivateRoute exact path="/profil">
            <Profil />
          </PrivateRoute>
        </Router>
        </AuthProvider>
      </div>
    
    </div>
  );
}

export default App
