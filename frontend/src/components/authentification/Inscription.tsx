import firebase from "../authentification/firebase";


import React, { FormEvent } from "react";
import { Modal } from "react-bootstrap";
import UserService from "../../service/UserService";
import Utils from "../../utils/Utils";

export interface InscriptionState {
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
    onSubmit: false
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

    this.isValidInput(name);
    this.isValidInput(prenom);
    this.isValidInput(email);
    this.isValidInput(username);
    this.isValidInput(address);
    this.isValidInput(password);

    const { isValidName, isValidEmail, isValidPrenom, isValidAddress, isValidUsername } = this.state;

    if (isValidAddress && isValidName && isValidEmail && isValidPrenom && isValidUsername) {
      firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then((userCredential: any) => {
          // Signed in 
          const user = userCredential.user;
          if (user) {
            UserService.addUser(name.value, prenom.value, password.value, username.value, address.value, complementAddress.value)
              .then((response) => {
                if (response.status === Utils.CREATED_STATUS) {
                  console.log("ok")
                }
              })
              .catch((error: any) => console.error(error));
          }
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    }

    this.setState({ onSubmit: true });
  }

  resetSubmit = () => {
    this.setState({ onSubmit: false })
  }

  isValidInput = (element: HTMLInputElement) => {

    if (element !== null) {
      let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      let regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
      let name = element.name;
      
      if (name === "email" && element.value.match(regexEmail)) {
        this.setState({ isValidEmail: true })
      }

      if (name === "password" /*&& element.value.match(regexPassword)*/) {
        this.setState({ isValidPassword: true })
      }

      if (element.value !== "") {
        if (name === "nom") {
          this.setState({ isValidName: true });
        }

        if (name === "prenom") {
          this.setState({ isValidPrenom: true });
        }

        if (name === "username") {
          this.setState({ isValidUsername: true });
        }

        if (name === "address") {
          this.setState({ isValidAddress: true });
        }


      }
    }
  }

  render() {
    return (
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
                Please enter your shipping address.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="address">Complément d'adresse</label>
              <input type="text" className="form-control" id="ComplementAddress" placeholder="4 ième étage" required name="ComplementAddress" />
              <div className="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>

            <div className="mt-1 d-flex justify-content-end">
              <input type="submit" value="Enregistrer" className="btn btn-primary" />
            </div>
          </form>
        </Modal.Body>
      </Modal>
    )
  }
}

export default Inscription;
