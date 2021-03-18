import React, { Component } from "react";
import { Fragment } from "react";
import Footer from "../components/footer/Footer";
import Menu from "../components/menu/Menu";
import "./DetailsBook.css";
class DetailsBook extends Component {
  render() {
    let likesNode = [];
    let likes = 0;
    if (this.props.likes === null) likes = this.props.likes;
    for (let j = 0; j < likes; j++) {
      likesNode.push(<i className="fas fa-heart mr-1" key={j}></i>);
    }
    for (let j = 0; j < 5 - likes; j++) {
      likesNode.push(<i className="far fa-heart mr-1" key={j}></i>);
    }

    return (
      <Fragment>
        <Menu color="gray" />
        <div className="container">
          <div className="row mt-5">
            <img
              className="col-3 mr-2"
              src="/img/open-book-clipart-03.png"
              alt="première de couverture"
            />
            <div className="col-8 mb-5">
              <h2>
                <b>Ma belle Afrique de demain</b>
              </h2>
              <h6 className="card-title mt-3">{likesNode}</h6>
              <p>
                <b>Sommaire: </b> Ceci est un descriptif du contenu du livre,
                j'espère que ca pourra servir à quelque chose.
              </p>
              <span>XXX FCFA/€ TTC</span>
              <div class="mb-3 row">
                <label for="quantity" class="col-sm-2 col-form-label">
                  Quantité
                </label>
                <div class="col-sm-10">
                  <input
                    type="number"
                    readonly
                    class="form-control col-2"
                    id="quantity"
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-dark">
                Ajouter au panier
              </button>
              <button className="btn btn-dark mr-3 ml-3"><i className="fas fa-heart"></i></button>
              <button className="btn btn-dark mr-3 ml-3">Donner son avis</button>
            </div>
          </div>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

export default DetailsBook;
