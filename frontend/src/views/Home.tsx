import React, { Component } from "react";
import Carousel from "../components/carousel/Carousel";
import Footer from "../components/footer/Footer";
import Menu from "../components/menu/Menu";
import OnTop from "../components/ontop/OnTop";
import OntopArticle from "../components/ontop/OntopArticle";
import OnTopDebate from "../components/ontop/OnTopDebate";
import "./Home.css";


export default class Home extends Component {

  render() {
    return (
      <div className="home">
        <Menu isHome={true}/>
        <Carousel />

        <OnTop />
        <OnTopDebate />
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
            <b> Visa - Paypal - Mobile money </b>
          </div>
          <div className="col-3 text-center mb-2">
            <div className="mt-5">
              <i className="fas fa-exchange-alt fa-2x mt-3"> </i>
            </div>
            <b> Participez aux Discussions / Débâts </b>
          </div>
          <div className="col-3 text-center mb-2">
            <div className="mt-5">
              <i className="far fa-question-circle fa-2x mt-3"> </i>
            </div>
            <b> Disponible 24h/24h, 7j / 7j </b>
          </div>
        </div>
        <OntopArticle />

        <Footer />
      </div>
    );
  }
}
