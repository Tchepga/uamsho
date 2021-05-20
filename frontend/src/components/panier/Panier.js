import React, { Component } from "react";
import { Fragment } from "react";
import Footer from "../footer/Footer";
import Menu from "../menu/Menu";

class Panier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          id: 1,
          titre: "Mon livre1",
          prix: 20,
        },
        {
          id: 2,
          titre: "Mon livre2",
          prix: 30,
        },
      ],
    };
    this.monnaie = "€";
  }

  render() {
    let itemsBalises = [];
    const data = this.state.items;

    for (let i = 0; i < data.length; i++) {
      itemsBalises.push(
        <li className="list-group-item" key={i}>
          <div className="row">
            <img
              className="col-2"
              style={{ maxHeight: "80px" }}
              src="/img/open-book-clipart-03.png"
              alt="première de couverture"
            />
            <div className="col-5">
              <b>{data[i].titre}</b>
              <br />
              <b>
                {data[i].prix}
                {this.monnaie}
              </b>
            </div>
            <input type="number" className="offset-1 col-2 align-self-center" />
            <i className="col-1 offset-1 fas fa-minus-circle fa-2x align-self-center" />
          </div>
        </li>
      );
    }
    return (
      <Fragment>
        <Menu color="gray" />
        <div className="container mt-5">
          <div className="row">
            <div className="card col-8">
              <div className="card-header">
                <b>Panier</b>
              </div>
              <ul className="list-group list-group-flush">{itemsBalises}</ul>
            </div>
            <div className="row col-4">
              <div className="card col-12">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <div className="row">
                      <span className="col-7">XXX articles</span>
                      <span className="col-5 text-right">28 €</span>
                    </div>
                    <div className="row">
                      <span className="col-5">Livraison</span>
                      <span className="col-7 text-right">1 €</span>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="row">
                      <span className="col-7">Total TTC</span>
                      <span className="col-5 text-right">29 €</span>
                    </div>
                  </li>
                  <li className="list-group-item align-self-end">
                    <button type="button" className="btn btn-dark">
                      Enregister
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

export default Panier;
