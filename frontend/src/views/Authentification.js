// import React, { useCallback, useContext } from "react";
import firebase from "../components/authentification/firebase";
import "./Authentification.css";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
// import { useAlert } from 'react-alert'
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications"

import React, {Component} from 'react';

const uiConfig = {
  signInFlow: "popup",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

class Authentification extends Component {
  componentDidMount(){
    if(this.props.location !== undefined && this.props.location.warningMessage !== undefined) {
      NotificationManager.warning(this.props.location.warningMessage)
    }
  }

  constructor(props) {
    super();
    this.state = {value: ''};
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(event) {
    event.preventDefault();
    console.log(event);
    const { email, password } = event.target.elements;


    try {
      firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(function () {
          firebase
            .auth()
            .signInWithEmailAndPassword(email.value, password.value)
            .catch((error) => {
              if (error.code === 'auth/user-not-found') {
                NotificationManager.error('mail ou mot de passe incorrect !')
              }
            });
        })
    
      //history.push("/connexion")
    } catch (error) {
      NotificationManager.error(error)
    }
  }
  
  render() {
    return (
      <div>
        <NotificationContainer />
        <form
          className="form-signin col-4"
          style={{ margin: "auto", marginTop: "100px" }}
          onSubmit={this.handleLogin}
        >
          <div className="text-center mb-4">
            <img
              className="mb-4"
              src="logo.png"
              alt="logo"
              width="120"
              height="72"
            />
            <h1 className="h3 mb-3 font-weight-normal">Connectez-vous !</h1>
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

          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button className="btn btn-lg btn-success btn-block" type="submit">
            Valider
          </button>
      </form>
      <a href="/inscription" style={{ margin: "auto", width: "31%" }} className="btn btn-lg btn-warning btn-block mt-1" >
        Inscrivez-vous
      </a>
      <StyledFirebaseAuth
        id="googleAuth"
        uiConfig={uiConfig}
        firebaseAuth={firebase.auth()}
      />
      <p className="mt-5 mb-3 text-muted text-center">&copy;CROWD237 2021 </p>
      </div>
    );
  }
}

export default Authentification;

// const Authentification = ({ history }) => {
//   // const alert = useAlert()
//   const handleLogin = useCallback(
//     async (event) => {
//       event.preventDefault();
//       const { email, password } = event.target.elements;
//       try {
//         firebase
//           .auth()
//           .setPersistence(firebase.auth.Auth.Persistence.SESSION)
//           .then(function () {
//             firebase
//               .auth()
//               .signInWithEmailAndPassword(email.value, password.value)
//               .catch((error) => {
//                 if (error.code === 'auth/user-not-found') {
//                   NotificationManager.error('mail ou mot de passe incorrect !')
//                 }
//               });

//           })
//         history.push("/connexion")
//       } catch (error) {
//         NotificationManager.error(error)
//       }
//     },
//     [history]
//   );
//   const { currentUser } = useContext(AuthContext);

//   if (currentUser) {
//     return <Redirect to="/" />;
//   }
//   return (
//     <div>
/*{/* <NotificationContainer/>
<form
  className="form-signin col-4"
  style={{ margin: "auto", marginTop: "100px" }}
  onSubmit={this.handleLogin}
>
  <div className="text-center mb-4">
    <img
      className="mb-4"
      src="logo.png"
      alt="logo"
      width="120"
      height="72"
    />
    <h1 className="h3 mb-3 font-weight-normal">Connectez-vous !</h1>
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

  <div className="checkbox mb-3">
    <label>
      <input type="checkbox" value="remember-me" /> Remember me
    </label>
  </div>
  <button className="btn btn-lg btn-success btn-block" type="submit">
    Valider
  </button>
</form>
<a href="/inscription" style={{ margin: "auto", width: "31%" }} className="btn btn-lg btn-warning btn-block mt-1" >
Inscrivez-vous
</a>
<StyledFirebaseAuth
id="googleAuth"
uiConfig={uiConfig}
firebaseAuth={firebase.auth()}
/>
<p className="mt-5 mb-3 text-muted text-center">&copy;CROWD237 2021 </p>
</div>
   );
 };

export default withRouter(Authentification); } */
