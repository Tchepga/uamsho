import firebase from "../authentification/firebase";


import React, { FormEvent } from "react";
import { Modal } from "react-bootstrap";
import UserService from "../../service/UserService";
import Utils from "../../utils/Utils";
import { WithNotification } from "../utilities/WithNotification";
import { errorState } from "../utilities/errorState";

export interface InscriptionState extends errorState {
  show: boolean;
  validated: boolean;
  isValidName: boolean;
  isValidPrenom: boolean;
  isValidEmail: boolean;
  isValidUsername: boolean;
  isValidAddress: boolean;
  onSubmit: boolean;
  isValidPassword: boolean;

}

class Inscription extends React.Component<any, InscriptionState> {

  state = {
    show: true,
    validated: false,
    isValidName: false,
    isValidPrenom: false,
    isValidEmail: false,
    isValidUsername: false,
    isValidAddress: false,
    isValidPassword: false,
    onSubmit: false,
    errorMessage: null,
    errorType: null

  }

  setShow() {
    this.setState({ show: !this.state.show });
  }
  addUser = (event: FormEvent<HTMLFormElement>) => {

    event.preventDefault();
    const target = event.currentTarget.elements;
    const name = target.namedItem("nom") as HTMLInputElement; // typechecks!
    const prenom = target.namedItem("prenom") as HTMLInputElement; // typechecks!
    const password = target.namedItem("password") as HTMLInputElement; // typechecks!
    const email = target.namedItem("email") as HTMLInputElement; // typechecks!
    const username = target.namedItem("username") as HTMLInputElement; // typechecks!
    const address = target.namedItem("address") as HTMLInputElement; // typechecks!
    const complementAddress = target.namedItem("complementAddress") as HTMLInputElement; // typechecks!

    this.setState({
      isValidAddress: false,
      isValidEmail: false,
      isValidName: false,
      isValidPassword: false,
      isValidPrenom: false,
      isValidUsername: false,
      errorMessage: null,
      errorType: null
    });

    this.setState({
      isValidName: this.isValidInput(name),
      isValidPrenom: this.isValidInput(prenom),
      isValidEmail: this.isValidInput(email),
      isValidUsername: this.isValidInput(username),
      isValidAddress: this.isValidInput(address),
      isValidPassword: this.isValidInput(password)
    })

    if (this.isValidInput(name) && this.isValidInput(prenom) && this.isValidInput(email) &&
      this.isValidInput(username) && this.isValidInput(password) && this.isValidInput(address)) {
      firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then((userCredential: any) => {
          // Signed in 
          const user = userCredential.user;
          if (user) {
            UserService.addUser(name.value, prenom.value, password.value,
              username.value, email.value, address.value, complementAddress !== null ? complementAddress.value : null)
              .then((response) => {
                if (response.status === Utils.CREATED_STATUS) {
                  this.setState({ errorMessage: "Inscription effectuée avec success! Vous pouvez maintenant vous connecter", 
                  errorType: Utils.SUCCESS_MESSAGE });
                }

                if (response.data === Utils.errorUserExistFromDJ) {
                  const currentUser = firebase.auth().currentUser;
                  if(currentUser !== null)
                  currentUser?.delete().then(() =>
                    this.setState({ errorMessage: "Il existe déjà un utilisateur avec ce mail!", errorType: Utils.ERROR_MESSAGE })
                  )
                  .catch((error : any) => console.log("firebase-error >>", error));
                }
              })
              .catch((error: any) => console.error(error));
          }
          // ...
        })
        .catch((error) => {
          if (error.code === Utils.USER_EXISTS) {
            UserService.addUser(name.value, prenom.value, password.value, username.value, email.value,
              address.value, complementAddress !== null ? complementAddress.value : null)
              .then((response) => {
                if (response.status === Utils.CREATED_STATUS) {
                  this.setState({ errorMessage: "Inscription effectuée avec success!", errorType: Utils.SUCCESS_MESSAGE });
                }

                if (response.data === Utils.errorUserExistFromDJ) {
                  this.setState({ errorMessage: "Il existe déjà un utilisateur avec ce mail!", errorType: Utils.ERROR_MESSAGE });
                }
              })
              .catch((error) => {
                console.log('error :>> ', error);
              });
          }
        });
    }

    this.setState({ onSubmit: true });
  }

  resetSubmit = () => {
    this.setState({ onSubmit: false, errorMessage: null, errorType: null })
  }

  isValidInput(element: HTMLInputElement): boolean {


    if (element !== null) {
      let regexEmail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
      let regexPassword = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/);
      let name = element.name;
      let value = element.value;

      if (name === "email" && regexEmail.test(value)) {
        return true;
      }

      if (name === "password" && regexPassword.test(value)) {
        return true;
      }

      if (name !== "email" && name !== "password" && element.value !== "") {
        return true;
      }
    }

    return false;
  }

  render() {
    return (
      <WithNotification message={this.state.errorMessage} type={this.state.errorType}>
        <Modal
          show={this.state.show}
          onHide={() => this.setShow()}
          dialogClassName="modal-90w"
          aria-labelledby="inscription-modal">
          <Modal.Header closeButton>
            <Modal.Title id="inscription-modal">
              Renseignez les différents informations
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="needs-validation" noValidate onSubmit={this.addUser} onChange={() => this.resetSubmit()}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="firstName">Prénom</label>
                  <input type="text" className="form-control" id="firstName" placeholder="Votre prénom" required name="prenom" />
                  <div className={!this.state.isValidPrenom && this.state.onSubmit ? "invalid-feedback d-block" : "invalid-feedback"}>
                    Valid first name is required.
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="lastName">Nom</label>
                  <input type="text" className="form-control" id="lastName" placeholder="Votre nom" required name="nom" />
                  <div className={!this.state.isValidName && this.state.onSubmit ? "invalid-feedback d-block" : "invalid-feedback"}>
                    Valid last name is required.
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="username">Username</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">PS</span>
                  </div>
                  <input type="text" className="form-control" id="username" placeholder="saisissez un pseudo" required name="username" />
                  <div className={!this.state.isValidUsername && this.state.onSubmit ? "invalid-feedback d-block" : "invalid-feedback"}>
                    Your username is required.
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" id="email" placeholder="email@example.com" name="email" />
                <div className={!this.state.isValidEmail && this.state.onSubmit ? "invalid-feedback d-block" : "invalid-feedback"}>
                  Please enter a valid email address for sign in.
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Mot de passe" required name="password" />
                <div className={!this.state.isValidPassword && this.state.onSubmit ? "invalid-feedback d-block" : "invalid-feedback"}>
                  Password should content at least 8 digits, and at least one digit upper case, one digit lower case.
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="address">Adresse</label>
                <input type="text" className="form-control" id="address" placeholder="1234 Main St" required name="address" />
                <div className={!this.state.isValidAddress && this.state.onSubmit ? "invalid-feedback d-block" : "invalid-feedback"}>
                  Please enter  address.
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="address">Complément d'adresse</label>
                <input type="text" className="form-control" id="ComplementAddress" placeholder="4 ième étage" required name="ComplementAddress" />
                <div className="invalid-feedback">
                  Please enter complement info about your address.
                </div>
              </div>

              <div className="mt-1 d-flex justify-content-end">
                <input type="submit" value="Enregistrer" className="btn btn-primary" />
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </WithNotification>
    )
  }
}

export default Inscription;
