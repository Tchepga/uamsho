import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import { connect } from 'react-redux';

// function mapStateToProps(state) {
//     return {

//     };
// }

class Menu extends Component {
    render() {
        return (
            <div>
                <ul className="nav justify-content-end">
                    <li className="nav-item">
                        <a className="nav-link" href="#">Vos suggestions</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Commander</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Connexion</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="#">Créer un compte</a>
                    </li>
                </ul>
                <nav class="navbar navbar-dark bg-dark">
                    <a class="navbar-brand" href="#">WeReadAfrica</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul class="navbar-nav">
                            <li class="nav-item active">
                                <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Livres</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Articles</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Dropdown link
                                </a>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <a class="dropdown-item" href="#">Action</a>
                                    <a class="dropdown-item" href="#">Another action</a>
                                    <a class="dropdown-item" href="#">Something else here</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

        );
    }
}

export default Menu;
// export default connect(
//     mapStateToProps,
// )(Menu);