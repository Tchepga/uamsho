import React, { useState, Fragment } from "react";
import { withRouter } from "react-router";
import EntrepriseInscription from "./EntrepriseInscription";
import UserInscription from "./UserInscription";

const Inscription = ({ history }) => {
  const [typeInscription, setTypeInscription] = useState("particulier");
  return (
    <Fragment>
      <div
        className="jumbotron jumbotron-fluid"
        style={{ paddingTop: "15%", backgroundColor: "#FF9000" }}
      >
        <div className="container">
          <h1 className="display-3" style={{textAlign:'center',marginBottom:'40px'}}><b>Inscription</b></h1>
          <p className="lead">
            
            <label className="col-sm-4 col-form-label" htmlFor="typeUser"> Choisissez le type d'utilisateur</label>
            <select
              className="col-sm-8"
              id="typeUser"
              onChange={(e) => setTypeInscription(e.target.value)}
              required
            >
              <option value="particulier">Particulier</option>
              <option>Entreprise</option>
            </select>
            <span className="invalid-feedback">
              Please select a valid type user.
            </span>
          </p>
        </div>
      </div>

      <div
        className="col-8 offset-2"
        style={{ backgroundColor: "#E8A87C" }}
      ></div>
      <hr className="col-md-10" />
      {typeInscription === "particulier" ? (
        <UserInscription />
      ) : (
        <EntrepriseInscription />
      )}
    </Fragment>
  );
};

export default withRouter(Inscription);
