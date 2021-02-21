import './App.css'
import Home from './views/Home'
import { BrowserRouter as Router, Route } from "react-router-dom"
import Book from './views/Book';
import DetailsBook from './views/DetailsBook'

function App() {
  return (
    <div className="App">
      <div className="content-root">
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
        </Router>
      </div>
    </div>
  );
}

export default App
