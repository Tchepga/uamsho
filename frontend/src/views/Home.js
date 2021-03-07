import React, { Component } from "react";
import Menu from "../components/menu/Menu";
import Carousel from "../components/carousel/Carousel";
import "./Home.css";
import OnTop from "../components/ontop/OnTop";
import OntopArticle from "../components/ontop/OntopArticle";
import Footer from "../components/footer/Footer";

export default class Home extends Component {
  render() {
    return (
      <div id="home">
        <Menu />
        <Carousel />
        <OnTop />
        <div id="services" className="row">
          <div className="col-3 text-center mb-2">
            <div className="mt-5">
              <i className="fas fa-truck fa-2x mt-3"> </i>{" "}
            </div>
            <b> Livraison dans le monde entier. </b>
          </div>
          <div className="col-3 text-center mb-2">
            <div className="mt-5">
              <i className="fas fa-credit-card fa-2x mt-3"> </i>
            </div>
            <b> Visa - Mastercard - Paypal - Mobile money </b>
          </div>
          <div className="col-3 text-center mb-2">
            <div className="mt-5">
              <i className="fas fa-exchange-alt fa-2x mt-3"> </i>
            </div>
            <b> Participez aux Discussions / Débâts </b>
          </div>
          <div className="col-3 text-center mb-2">
            <div className="mt-5">
              <i class="far fa-question-circle fa-2x mt-3"> </i>
            </div>
            <b> Disponible 24 h / 24 h 7 j / 7 j </b>
          </div>
        </div>
        <OntopArticle />
        <Footer />
      </div>
    );
  }
}
