// import React, { useCallback, useContext } from "react";
import firebase from "../components/authentification/firebase";
import "./Authentification.css";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import Constance from "../components/utilities/Constance";
import { AuthContext } from "../providers/Provider";
import Inscription from "../components/authentification/Inscription";

const uiConfig = {
  signInFlow: "popup",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

class Authentification extends Component {
  componentDidMount() {
    if (
      this.props.location !== undefined &&
      this.props.location.warningMessage !== undefined
    ) {
      NotificationManager.warning(this.props.location.warningMessage);
    }
  }

  constructor(props) {
    super();
    this.state = {
      currentUser: null,
      isAuthenticate: false,
      currentCitation: "« La vraie émancipation de la femme, c’est celle qui responsabilise la femme. »",
      author: "Thomas Sankara",
      showInscriptionComp : false
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(event) {
    event.preventDefault();
    const { email, password } = event.target.elements;

    try {
      firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(function () {
          firebase
            .auth() // app name as argument
            .signInWithEmailAndPassword(email.value, password.value)
            .catch((error) => {
              if (
                error.code === Constance.FAIL_AUTHENTIFICATION ||
                error.message === Constance.EMAIL_NOT_FOUND ||
                error.code === Constance.FAIL_PASSWORD
              ) {
                NotificationManager.error("Mail ou mot de passe incorrect !");
              } else {
                console.log(error);
                alert(error);
              }
            });
        });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div>
        <NotificationContainer />
        <AuthContext.Consumer>
          {(context) =>
            context.currentUser ? (
              <Redirect to="/profil" />
            ) : (
              <div className="row" style={{ marginRight: "0px" }}>
                <div className="offset-1 col-4" style={{ marginTop: "50px" }}>
                  <form
                    // style={{ margin: "auto", marginTop: "100px" }}
                    onSubmit={this.handleLogin}
                  >
                    <div className="text-center mb-4">
                      <Link className="nav-link" aria-current="page" to="/">
                        <h3 className="logo"><b>uamsho</b></h3>
                      </Link>
                      <h1 className="h3 mb-3 font-weight-normal">
                        Connectez-vous !
                      </h1>
                      <p>Renseignez votre email et mot de passe</p>
                    </div>

                    <div className="form-label-group">
                      <input
                        type="email"
                        id="inputEmail"
                        className="form-control"
                        placeholder="Email address"
                        name="email"
                        required
                        autoFocus
                      />
                      <label htmlFor="inputEmail">Adresse email</label>
                    </div>

                    <div className="form-label-group">
                      <input
                        type="password"
                        id="inputPassword"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        required
                      />
                      <label htmlFor="inputPassword">Password</label>
                    </div>
                    <button
                      className="btn btn-lg btn-success btn-block"
                      type="submit"
                    >
                      Valider
                    </button>
                  </form>
                  <button
                    className="btn btn-lg btn-warning btn-block mt-1"
                    onClick={() => this.setState({ showInscriptionComp: !this.state.showInscriptionComp })}>
                    Inscrivez-vous
                  </button>
                  {this.state.showInscriptionComp ? <Inscription /> : null}
                  <StyledFirebaseAuth
                    id="googleAuth"
                    uiConfig={uiConfig}
                    firebaseAuth={firebase.auth()}
                  />
                  <p className="mt-5 mb-3 text-muted text-center">
                    &copy;UAMSHO 2021{" "}
                  </p>
                </div>
                <div className="col-6"
                  style={{ margin: "auto", paddingLeft: "100px", paddingTop: "50px", marginRight: "0px", marginBottom: "0px", width: "100%", backgroundColor: "#FFC300" }}>
                  <h5 className="row mx-5">
                    {this.state.currentCitation}
                  </h5>
                  <b className="row justify-content-center">
                    {this.state.author}
                  </b>
                  <img src="img/authen_back.png" alt="no_found" className="" />
                </div>
              </div>
            )
          }
        </AuthContext.Consumer>
      </div>
    );
  }
}

export default Authentification;
