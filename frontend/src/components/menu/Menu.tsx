import "./Menu.css";
import React, { Component, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/Provider";
import Utils from "../../utils/Utils";
import { withRouter } from "react-router";
import Inscription from "../authentification/Inscription";
import firebase from "../authentification/firebase";
import { Language } from "../../i18n/Language";
import { Translation } from "react-i18next";
import i18next from "i18next";

export interface MenuState {
  scopesLabel: Array<string>;
  showInscriptionComp: boolean;
  isAuth: boolean;
}
class Menu extends Component<any, MenuState> {

  private inputSearch: React.RefObject<HTMLInputElement> = React.createRef();
  static defaultProps: { color: string; };
  static contextType = AuthContext;


  state = {
    scopesLabel: ["Livre", "Article", "Débats"],
    showInscriptionComp: false,
    isAuth: false
  };

  updateUserData = () => {
    if (Utils.isNotNullObject(this.context.currentUser)) {
      this.setState({ isAuth: true });
    } else {
      this.setState({ isAuth: true });
    }
  }
  /**
   * search on title by scope
   * @param event Mouse event 
   */
  search = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    this.props.history.push({
      pathname: "/search",
      search: "?scope=" + this.state.scopesLabel + "&inputSearch=" + this.inputSearch.current?.value,
      params: { scope: this.state.scopesLabel, inputSearch: this.inputSearch.current?.value }
    });
  };

  /**
   *  remove scope of search
   * @param event on Div element
   */
  removeScope = (event: MouseEvent<HTMLDivElement>) => {
    const scopeName = event.currentTarget.innerText;
    let { scopesLabel } = this.state;
    const index = scopesLabel.indexOf(scopeName.trim());

    if (index > -1) {
      this.setState({ scopesLabel: scopesLabel.splice(index, 1) });
    }
  };

  activeLanguage = (event: MouseEvent<HTMLButtonElement>) => {
    
    const lang = event.currentTarget.innerText.toLowerCase();
    if (Array.from(Object.values(Language)).find(item => item === lang) ) {
      localStorage.setItem("LANG", lang);
      i18next.changeLanguage(lang);
      this.forceUpdate();
    }
  };

  render() {
    const searchScopeBalise = this.state.scopesLabel.map((scopeLabel, index) => (
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
    ));

    const langMarkup = Object.values(Language).map((lang, index) => {
      const className = lang === localStorage.getItem("LANG") ? "active" : "";
      return <button key={index}
        className={"mt-3 " + className}
        onClick={this.activeLanguage}>
        {lang.toLocaleUpperCase()}
      </button>
    });

    let styleMenu = {};
    if (this.props.isHome) {
      styleMenu = { backgroundColor: this.props.color };
    } else {
      styleMenu = { backgroundColor: this.props.color, backgroundImage: `url(img/menu_cr.jpg)` };
    }
    return (
      <Translation>
        {t => (
          <div id="Menu" style={styleMenu}>
            <div className="row" style={{ width: "100%"}}>
              <div id="lang" className="lang col-2 pl-3">{langMarkup}</div>
              <ul className="nav col-10 justify-content-end mb-3 ">
                <li className="nav-item">
                  {/* eslint-disable-next-line */}
                  <a className="nav-link" href="#">
                    {t("SUGGESTION")}
                  </a>
                </li>
                <li className="nav-item">
                  {/* eslint-disable-next-line */}
                  <a className="nav-link" href="#">
                  {t("ORDER")}
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
                          {t("CONNEXION")}
                        </Link>
                      )
                    }
                  </AuthContext.Consumer>
                </li>

                <AuthContext.Consumer>
                  {(context) =>
                    context.currentUser ? (
                      <li>
                        <a
                          href="/"
                          className="mr-1 mt-2"
                          onClick={() => {
                            firebase.auth().signOut();
                          }}
                        >
                          {t("DECONNEXION")}
                        </a>
                      </li>
                    ) : (
                      <li>
                        <button
                          className="btn_as_link mt-2 mr-1"
                          onClick={() => this.setState({ showInscriptionComp: !this.state.showInscriptionComp })}>
                          {t("C_ACCOUNT")}
                        </button>
                        {this.state.showInscriptionComp ? <Inscription /> : null}
                      </li>
                    )
                  }

                </AuthContext.Consumer>
              </ul >
            </div>
            <ul className="nav justify-content-center">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  <h3 className="logo"><b>uamsho</b></h3>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/books">
                  Ebook
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/article">
                  Article
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/debates">
                  {t('DEBATE')}
                </Link>
              </li>
              <li className="nav-item">
                {/* eslint-disable-next-line */}
                <a className="nav-link text-light" href="#">
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
                <a className="nav-link" href="/panier">
                  <i className="fas fa-shopping-basket text-light"></i>
                  {Utils.getBookCookie().length > 0 &&
                    <span
                      className="badge badge-pill badge-danger"
                      style={{ transform: "translate(0px, -5px)" }}>
                      {Utils.getBookCookie().length}
                    </span>}
                </a>
              </li>
            </ul>

            <div
              className="modal fade bd-search-modal-lg"
              tabIndex={-1}
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
                        ref={this.inputSearch}
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
          </div >)
        }
      </Translation>
    );
  }
}
Menu.defaultProps = {
  color: "",
};
export default withRouter(Menu);
