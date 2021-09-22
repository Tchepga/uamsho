import React, { Component, Fragment } from 'react';
import Footer from '../footer/Footer';
import Menu from '../menu/Menu';

class OnTopDebate extends Component {
    render() {
        return (
            <Fragment>
              <Menu />
              <div className="container">
                <div className="row mt-5">
                  <img
                    className="col-3 mr-2"
                    src="#"
                  />
                  <div className="col-8 mb-5">
                    <h2>
                      <b>titre</b>
                    </h2>
                    <h6 className="card-title mt-3">likesNode</h6>
                    <h4>Bibliographie:</h4>
                    <p>
                      description
                    </p>
                    <div className="row">
                      <span className="badge bg-primary ml-3">Edition : </span>
                      <span className="badge bg-warning ml-2">Edité le : </span>
                      <span className="badge bg-light ml-2">Nombre de page : </span>
                    </div>
                    <div className="row mt-3">
                      <span className="badge bg-info ml-3">Auteur :</span>
                    </div>
                    <b style={{ color: "#ff1744", fontSize: "30px" }}>TTC</b>
                    <div className="mb-3 row">
                      <label htmlFor="quantity" className="col-sm-2 col-form-label">
                        Quantité
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="number"
                          className="form-control col-2"
                          id="quantity"
                        />
                          <span style={{ color: "#d32f2f" }}>Article indisponible pour l'instant</span>
                      </div>
                    </div>
                    <button type="submit"
                      className="btn btn-dark">
                      Ajouter au panier
                    </button>
                    <button className="btn btn-dark mr-3 ml-3">
                      <i className="fas fa-heart"></i>
                    </button>
                    <button className="btn btn-dark mr-3 ml-3">
                      Donner son avis
                    </button>
                  </div>
                </div>
              </div>
              <Footer />
            </Fragment>
          );
    }
}

export default OnTopDebate;