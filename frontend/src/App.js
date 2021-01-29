import './App.css'
import Home from './views/Home'
import { BrowserRouter as Router, Route } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <div className="content-root">
        <Router>
          <Route exact path="/">
            <Home />
          </Route>
        </Router>
      </div>
    </div>
  );
}

export default App
