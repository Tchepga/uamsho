import React, { useCallback, useState } from "react"
import { withRouter } from "react-router"
import firebase from "./firebase"
import 'react-notifications/lib/notifications.css'
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications"
import { apiUrl } from "./../../environement"

//, backgroundColor: "red"
const UserInscription = ({ history }) => {
  const [user, setUser] = useState({
    password: "",
    confirmation: "",
    message: "",
    callbackMessage: "",
  });
  const customResponse = ["ALREADY_PRESENT", "USER_ADD"];
  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      const {
        cni,
        firstName,
        lastName,
        username,
        birthday,
        adress,
        email,
        password,
        additionnalInfoAdress,
        country,
      } = event.target.elements;

      if (email.value === "" || password.value === "") {
        NotificationManager.error("Vous devez renseigner votre email et mot de passe !")
      } else if (cni.length === 9) {
        NotificationManager.error("Numéro de CNI non-conforme.")
      } else {

        try {
          await firebase
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value)

          fetch(apiUrl + "/api/inscription", {
            method: "POST",
            headers: {
              "Content-type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify({
              cni: parseInt(cni.value),
              firstname: firstName.value,
              lastname: lastName.value,
              birthday: birthday.value,
              username: username.value,
              name: "",
              siret: "",
              adress: adress.value,
              email: email.value,
              password: password.value,
              additionnalInfoAdress: additionnalInfoAdress.value,
              typeUser: "particulier",
              descriptionActivity: "",
              bankId: [],
              country: country.value,
            }),
          })
            .then(function (response) {
              return response.text();
            })
            .then(function (data) {
              switch (data) {
                case customResponse[0]:
                  setUser({ callbackMessage: "Utilisateur déjà inscris!" });
                  alert("Utilisateur déjà inscris!", "Close after 3000ms", 3000);
                  break;
                case customResponse[1]:
                default:
                  firebase.auth().createUserWithEmailAndPassword(email, password)
                  .then((userCredential) => {
                    // Signed in 
                    var user = userCredential.user;
                    firebase
                      .auth()
                      .signInWithEmailAndPassword(user.value, user.value)
                      .catch((error) => {
                        if (error.code === 'auth/user-not-found') {
                          NotificationManager.error('Erreur lors de l\'inscription.')
                        }
                      });
                    // ...
                  })
                  .catch((error) => {
                    NotificationManager.error(
                      error.message,
                      error.code
                    );
                    // ..
                  });
                  setUser({ callbackMessage: "Vous êtes maintenant inscris !" });
                  //alert("Vous êtes maintenant inscris!", "Inscription");
                  NotificationManager.success(
                    "Vous êtes maintenant inscris !",
                    "Inscription"
                  );
                  history.push("/profil");
                  break;
              }
            });

        } catch (error) {
          NotificationManager.error('Error message', 'Click me!', 5000, () => {
            alert('callback');
          });
        }
      }
    },
    [history, customResponse]
  );

  const validatePassword = (event) => {
    if (event) {
      if (event.target.name === "password") {
        setUser({ password: event.target.value });
        //if (user.password.length < 8) setUser({message: "Sécurite faible"});
      }
      if (event.target.name === "confirmation") {
        setUser({ confirmation: event.target.value });
        if (user.confirmation !== user.password)
          setUser({ message: "check your confirmation" });
      }
    }
  };

  return (
    <div>
      <NotificationContainer />
      <div className="container bg-light">
        <div className="py-5 text-center">
          <p className="lead">
            Renseignez les informations nécessaires. Certaines sont requises.
        </p>
        </div>
        <div className="row">
          <div className="col-md-10 offset-md-1 order-md-1">
            <form
              className="needs-validation"
              noValidate
              onSubmit={handleSignUp}
              id="form-inscription"
            >
              <div className="row">
                <h4 className="col-md-12" style={{ textAlign: "center" }}>
                  Civilités
              </h4>
                <div className="col-md-12 form-group row">
                  <label htmlFor="cni" className="col-md-3 col-form-label">
                    Numéro CNI:
                  </label>
                  <input
                    type="text"
                    className="col-md-9"
                    id="cni"
                    name="cni"
                    placeholder="Entrer votre numéro de CNI"
                    style={{ borderRadius: "5px" }}
                  />
                  <div className="invalid-feedback" style={{ width: "100%" }}>
                    Your CNI number is required.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="cniTof" className="form-label">Photo CNI</label>
                  <input className="form-control" type="file" id="cniTof"/>
                </div>
                <div className="input-group">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="firstName">Prénom</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      placeholder="entrer votre nom"
                      required
                      name="firstName"
                    />
                    <div className="invalid-feedback">
                      Valid firstname is required.
                  </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="lastName">Nom</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      placeholder="entrer votre nom"
                      required
                    />
                    <div className="invalid-feedback">
                      Valid lastName is required.
                  </div>
                  </div>
                </div>
                <div className="col-md-12 mb-3">
                  <label htmlFor="username">Pseudo</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">@</span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Pseudo"
                      required
                    />
                    <div className="invalid-feedback" style={{ width: "100%" }}>
                      Your username is required.
                  </div>
                  </div>
                </div>
                <div className="col-md-12 mb-3">
                  <label htmlFor="birthday">Date de naissance</label>
                  <input
                    type="date"
                    className="form-control"
                    id="birthday"
                    placeholder="XX/XX/XXXX"
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="you@example.com"
                  />
                  <div className="invalid-feedback">
                    Please enter a valid email address for shipping updates.
                </div>
                </div>
                <div className="col-md-12 mb-3">
                  <label htmlFor="address">Adresse</label>
                  <input
                    type="text"
                    className="form-control"
                    id="adress"
                    placeholder="X rue de XXX"
                    required
                  />
                  <div className="invalid-feedback">
                    Please enter your shipping adress.
                </div>
                </div>
                <div className="col-md-12 mb-3">
                  <label htmlFor="additionnalInfoAdress">
                    Complément d'adresse{" "}
                    <span className="text-muted">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="additionnalInfoAdress"
                    placeholder="bâtiment X, appartement XXXX... "
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="country">Pays</label>
                  <select
                    className="custom-select d-block w-100"
                    id="country"
                    required
                  >
                    <option value="Cameroun">Cameroun</option>
                    <option>France</option>
                  </select>
                  <div className="invalid-feedback">
                    Please select a valid country.
                </div>
                </div>
                <hr className="col-md-11 mb-4" />
                <div className="input-group">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="password">Mot de passe </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder=" Mot de passe"
                      required
                      name="password"
                      onChange={validatePassword}
                    />
                    <div className="invalid-feedback">{user.message}.</div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="lastName">confirmation</label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmation"
                      placeholder="Confirmer votre mot de passe"
                      onChange={validatePassword}
                      name="confirmation"
                      required
                    />

                    <div className="alert-danger">{user.message}</div>
                  </div>
                </div>
                <hr className="col-md-11 mb-4" />
                <button
                  className="btn btn-primary btn-lg btn-block"
                  type="submit"
                >
                  Valider votre inscription
              </button>
              </div>
            </form>
          </div>
        </div>
      </div></div>
  );
};

export default withRouter(UserInscription);
