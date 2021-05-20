import "./Menu.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class Menu extends Component {
  render() {
    return (
      <div  id="Menu" style={{backgroundColor: this.props.color }}>
        <ul className="nav justify-content-end mb-3 ">
          <li className="nav-item">
            {/* eslint-disable-next-line */}
            <a className="nav-link" href="#">
              Vos suggestions
            </a>
          </li>
          <li className="nav-item">
            {/* eslint-disable-next-line */}
            <a className="nav-link" href="#">
              Commander
            </a>
          </li>
          <li className="nav-item">
            {/* eslint-disable-next-line */}
            <a className="nav-link" href="#">
              Connexion
            </a>
          </li>
          <li className="nav-item">
            {/* eslint-disable-next-line */}
            <a className="nav-link disabled" href="#">
              Créer un compte
            </a>
          </li>
        </ul>
        <ul className="nav justify-content-center">
          <li className="nav-item">
            {/* eslint-disable-next-line */}
            <Link className="nav-link active" aria-current="page" to="/">
              <i className="fas fa-book-open fa-lg"></i>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/books">
              Livres
            </Link>
          </li>
          <li className="nav-item">
            {/* eslint-disable-next-line */}
            <a className="nav-link" href="/article">
              Articles
            </a>
          </li>
          <li className="nav-item">
            {/* eslint-disable-next-line */}
            <a className="nav-link" href="#">
              Echanges/Débâts
            </a>
          </li>
          <li className="nav-item">
            {/* eslint-disable-next-line */}
            <a className="nav-link" href="#">
              Contact
            </a>
          </li>
          <li className="nav-item">
            {/* eslint-disable-next-line */}
            <a className="nav-link" href="#">
              <i className="fas fa-search"></i>
            </a>
          </li>
          <li className="nav-item">
            {/* eslint-disable-next-line */}
            <a className="nav-link" href="#">
              <i className="fas fa-shopping-basket"></i>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
Menu.defaultProps = {
  color: ''
}
export default Menu;
