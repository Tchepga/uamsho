import './Menu.css';
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import { connect } from 'react-redux';

// function mapStateToProps(state) {
//     return {

//     };
// }

class Menu extends Component {
    render() {
        return (
            <div className="container" id="Menu">
                <ul className="nav justify-content-end mb-3 ">
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            Vos suggestions
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            Commander
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            Connexion
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="#">
                            Créer un compte
                        </a>
                    </li>
                </ul>
                <ul className="nav justify-content-center">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#">
                            <i className="fas fa-book-open fa-lg"></i>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            Livres
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            Articles
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            Echanges/Débâts
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            Contact
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <i className="fas fa-search"></i>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <i className="fas fa-shopping-basket"></i>
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Menu;
// export default connect(
//     mapStateToProps,
// )(Menu);
