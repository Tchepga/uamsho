import "./Menu.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/Provider";
import Utils from "../../utils/Utils";
import { withRouter } from "react-router";

class Menu extends Component {
  state = {
    scopesLabel: ["Livre", "Article", "Débats"],
  };

  search = (event) => {
    event.preventDefault();
    
    this.props.history.push({
      pathname: "/search",
      search: "?scope=" + this.state.scopesLabel + "&inputSearch=" + this.inputSearch.value,
      params:{scope: this.state.scopesLabel, inputSearch: this.inputSearch.value}
    });
  };

  removeScope = (event) => {
    const scopeName = event.target.innerText;
    let { scopesLabel } = this.state;
    const index = scopesLabel.indexOf(scopeName.trim());

    if (index > -1) {
      this.setState({ scopesLabel: scopesLabel.splice(index, 1) });
    }
  };

  render() {
    let searchScopeBalise = [];

    this.state.scopesLabel.forEach((scopeLabel, index) => {
      searchScopeBalise.push(
        <div className="input-group-prepend" key={index}>
          <div
            className="input-group-text cursor-pointer"
            id="btnGroupAddonSearch"
            style={{ background: "#fafafa" }}
            onClick={this.removeScope}
          >
            {scopeLabel + Utils.SPACE}
            <i className="fas fa-times mt-1" style={{ color: "#a1887f" }} />
          </div>
        </div>
      );
    });

    return (
      <div id="Menu" style={{ backgroundColor: this.props.color }}>
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
            <AuthContext.Consumer>
              {(context) =>
                context.currentUser ? (
                  <Link className="nav-link" aria-current="page" to="/profil">
                    <i
                      style={{ marginRight: "7px" }}
                      className="far fa-user"
                    ></i>
                    {context.currentUser.first_name}
                  </Link>
                ) : (
                  <Link
                    className="nav-link"
                    aria-current="page"
                    to="/connexion"
                  >
                    Connexion
                  </Link>
                )
              }
            </AuthContext.Consumer>
          </li>
          <AuthContext.Consumer>
            {(context) =>
              context.currentUser ? (
                <Link className="nav-link" aria-current="page" to="/profil">
                  Déconnexion
                </Link>
              ) : (
                <Link className="nav-link" aria-current="page" to="/connexion">
                  Créer un compte
                </Link>
              )
            }
          </AuthContext.Consumer>
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
            <button
              className="nav-link"
              data-toggle="modal"
              data-target=".bd-search-modal-lg"
            >
              <i className="fas fa-search"></i>
            </button>
          </li>
          <li className="nav-item">
            {/* eslint-disable-next-line */}
            <a className="nav-link" href="#">
              <i className="fas fa-shopping-basket"></i>
            </a>
          </li>
        </ul>

        <div
          className="modal fade bd-search-modal-lg"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="searchInputModal"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <form>
                <div className="input-group">
                  {searchScopeBalise}
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Que recherchez vous?"
                    aria-label="search-input"
                    aria-describedby="btnGroupAddonSearch"
                    name="searchInput"
                    ref={(elm) => (this.inputSearch = elm)}
                  />
                  <div className="input-group-prepend">
                    <div
                      className="input-group-text cursor-pointer"
                      id="btnGroupAddonSearch"
                      style={{ background: "#FFC300" }}
                      onClick={this.search}
                    >
                      <i className="fas fa-search"></i>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Menu.defaultProps = {
  color: "",
};
export default withRouter(Menu);
