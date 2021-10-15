import { Component } from "react";
import UserService from "../../service/UserService";
import Utils from "../../utils/Utils";
import { WithNotification } from "../utilities/WithNotification";

class DetailsProfil extends Component {
  state = {
    disabled: true,
    name: this.props.user.last_name,
    firstName: this.props.user.first_name,
    username: this.props.user.username,
    email: this.props.user.email,
    address: this.props.user.address,
    complementAddress: this.props.user.complement_address,
    errorMessage: null,
    typeMessage: Utils.ERROR_MESSAGE
  };

  modifyAction = (event) => {
    event.preventDefault();
    this.setState({ errorMessage: null , typeMessage: Utils.ERROR_MESSAGE});
    this.setState({ disabled: !this.state.disabled });
  };

  submit = (event) => {
    event.preventDefault();
    this.setState({ errorMessage: null , typeMessage: Utils.ERROR_MESSAGE});
    const { name, firstName, email, username, address, complementAddress } = this.state;
    UserService.udpateUser(name, firstName, email, username, address, complementAddress)
      .then((resp) => {
        if (resp.status === 200) this.setState({ errorMessage: "Profil mis à jour", typeMessage: Utils.SUCCESS_MESSAGE });
      })
      .catch((error) =>
        this.setState({
          errorMessage: "Votre profil n'a pas pu être mise à jour. Veuillez contacter votre administrateur.",
          typeMessage: Utils.ERROR_MESSAGE
        })
      );
  };
  resetMessageError = () => {
    this.setState({ errorMessage: null });
  };
  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({ errorMessage: null , typeMessage: Utils.ERROR_MESSAGE});

    switch (name) {
      case "name":
        this.setState({ name: value });
        break;
      case "firstName":
        this.setState({ firstName: value });
        break;
      case "username":
        this.setState({ username: value });
        break;
      case "address":
        this.setState({ address: value });
        break;
      case "email":
        this.setState({ errorMessage: "Vous ne pouvez pas modifier votre email." });
        break;
      case "complementAddress":
        this.setState({ complementAddress: value });
        break;
      default:
    }
  };

  render() {
    return (
      <WithNotification message={this.state.errorMessage} typeMessage={this.state.typeMessage}>
        <form>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="name">Nom</label>
              <input
                type="text"
                className="form-control"
                value={this.state.name || ""}
                name="name"
                disabled={this.state.disabled}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="firstName">Prénom</label>
              <input
                type="text"
                className="form-control"
                value={this.state.firstName || ""}
                name="firstName"
                disabled={this.state.disabled}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                value={this.state.email || ""}
                name="email"
                disabled
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="username">Pseudo</label>
              <input
                type="text"
                className="form-control"
                value={this.state.username || ""}
                name="username"
                disabled={this.state.disabled}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="address">Adresse</label>
            <input
              type="text"
              className="form-control"
              name="address"
              placeholder="1234 Main St"
              disabled={this.state.disabled}
              value={this.state.address || ""}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="complementAddress">complément d'adresse</label>
            <input
              type="text"
              className="form-control"
              name="complementAddress"
              placeholder="Apartment, studio, or floor"
              value={this.state.complementAddress || ""}
              disabled={this.state.disabled}
              onChange={this.handleChange}
            />
          </div>

          <button className="btn btn-primary" onClick={this.modifyAction}>
            modifier
          </button>

          {!this.state.disabled && (
            <button type="submit" className="btn btn-primary ml-1" onClick={this.submit}>
              Enregister
            </button>
          )}
        </form>
      </WithNotification>
    );
  }
}

export default DetailsProfil;
