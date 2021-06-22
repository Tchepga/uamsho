import React, { Fragment } from "react";
import DetailsProfil from "../components/profil/DetailsProfil";
import firebase from "../components/authentification/firebase";
import Menu from "../components/menu/Menu";
import PassOrder from "../components/profil/PassOrder";
import CurrentArticle from "../components/profil/CurrentArticle";
import CurrentDebate from "../components/profil/CurrentDebate";

class Profil extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isProfil: true,
      isArticle: false,
      isDebate: false,
      isOrders: false,
      user: "",
    };
    this.changeDetails = this.changeDetails.bind(this);
  }

  async componentDidMount() {
    /*firebase.auth().onAuthStateChanged((user) => {
      fetch(process.env.REACT_APP_API_URL + "/api/user?email=" + user.email)
        .then((response) => response.json())
        .then((data) =>
          this.setState({ user: data, isLoading: true }, function () {
            console.log(this.state.user);
          })
        );
    });
    console.log(this.state);*/
  }

  changeDetails(event) {
    console.log(event.target.value);
    const type = event.target.value;

    this.setState({isProfil: false, isDebate: false, isOrders: false, isArticle: false});
    switch (type) {
      case "DEBATE":
        this.setState({ isDebate: true });
        break;
      case "ORDER":
        this.setState({ isOrders: true });
        break;
      case "ARTICLE":
        this.setState({ isArticle: true });
        break;
      case "PROFIL":
      default:
        this.setState({ isProfil: true });
    }
  }

  render() {
    return (
      <Fragment>
        <Menu color="#696d6e" />
        <div className="container">
          <div className="row mt-5">
            <div className="card col-4">
              <div style={{ textAlign: "center" }}>
                <i
                  className=" far fa-user"
                  style={{ fontSize: "100px", padding: "16px" }}
                ></i>
              </div>
              <div className="card-body">
                <h5 className="card-title" style={{ textAlign: "center" }}>
                  {this.state.user.lastname}
                </h5>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <button
                    type="button"
                    value="PROFIL"
                    className="btn btn-light"
                    style={{ width: "100%" }}
                    onClick={this.changeDetails}
                  >
                    Profil
                  </button>
                </li>
                <li className="list-group-item">
                  <button
                    type="button"
                    value="ORDER"
                    className="btn btn-light"
                    style={{ width: "100%" }}
                    onClick={this.changeDetails}
                  >
                    Mes commandes
                  </button>
                </li>
                <li className="list-group-item">
                  <button
                    type="button"
                    value="ARTICLE"
                    className="btn btn-light"
                    style={{ width: "100%" }}
                    onClick={this.changeDetails}
                  >
                    Articles intéressés
                  </button>
                </li> 
                <li className="list-group-item">
                  <button
                    type="button"
                    value="DEBATE"
                    className="btn btn-light"
                    style={{ width: "100%" }}
                    onClick={this.changeDetails}
                  >
                    Débâts en cours
                  </button>
                </li>
                <li className="list-group-item">
                  <button
                    type="button"
                    className="btn btn-light"
                    style={{ width: "100%" }}
                    onClick={() => {
                      //firebase.auth().signOut();
                    }}
                  >
                    Déconnexion
                  </button>
                </li>
              </ul>
            </div>
            <div className="col-8">
              {this.state.isProfil && <DetailsProfil user={this.state.user} />}
              {this.state.isOrders && <PassOrder user={this.state.user} />}
              {this.state.isArticle && <CurrentArticle user={this.state.user} />}
              {this.state.isDebate && <CurrentDebate user={this.state.user} />}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Profil;
