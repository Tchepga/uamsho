import axios from "axios";
import React, { Component } from "react";
import GenericCard from "../utilities/GenericCard";
import "./OntopArticle.css";
import Utils from "./../../utils/Utils";

class OntopArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [
        {
          id: 1,
          titre: "L'Afrique de demain",
          description:
            "Ceci est une description qui devrait être troncé, texte troncé",
        },
        {
          id: 2,
          titre: "Le savoir",
          description:
            "Ceci est une description qui devrait être troncé, texte troncé",
        },
        {
          id: 3,
          titre: "La philosophie africaine",
          description:
            "Ceci est une description qui devrait être troncé, texte troncé",
        },
        {
          id: 4,
          titre: "Moi et toi",
          description:
            "Ceci est une description qui devrait être troncé, texte troncé",
        },
        {
          id: 5,
          titre: "Vivre ou mourrir",
          description:
            "Ceci est une description qui devrait être troncé, texte troncé",
        },
      ],
    };
  }

  componentDidMount() {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/article/ontop")
      .then((response) => {
        this.setState({ books: response.data });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const bookData = this.state.books;
    let activeItems = [];
    let itemsSecond = [];
    let itemsThird = [];

    for (let i = 0; i < bookData.length; i++) {
      if (i < 3)
        activeItems.push(
          <div key={i} className="px-5 mt-5 col-4">
            <GenericCard
              
              id={bookData[i].id}
              title={bookData[i].titre}
              description={Utils.truncate(bookData[i].description)}
            />
          </div>
        );
      if (i < 6 && i > 3)
        itemsSecond.push(
          <div key={i} className="px-5 mt-5 col-4">
            <GenericCard
              
              id={bookData[i].id}
              title={bookData[i].titre}
              description={bookData[i].description}
            />
          </div>
        );

      if (i < 9 && i > 6)
        itemsThird.push(
          <div  key={i} className="col-4px-5 mt-5">
            <GenericCard
             
              id={bookData[i].id}
              title={bookData[i].titre}
              description={bookData[i].description}
            />
          </div>
        );
    }
    const carouselStyle = {
      backgroundColor: "white !important",
    };
    
    return (
      <div className="container">
        <h3 style={{ textAlign: "center" }}> Actualités </h3>
        <div
          id="multi-item-example"
          className="carousel slide carousel-multi-item"
          data-ride="carousel"
          style={carouselStyle}
        >
          {/*--Controls--*/}
          <div className="controls-top text-center">
            <a
              className="btn-floating mr-2"
              href="#multi-item-example"
              data-slide="prev"
            >
              <i className="fa fa-chevron-circle-left fa-lg"></i>
            </a>
            <a
              className="btn-floating"
              href="#multi-item-example"
              data-slide="next"
            >
              <i className="fa fa-chevron-circle-right fa-lg"></i>
            </a>
          </div>

          {/*--Indicators--*/}
          <ol className="carousel-indicators">
            <li
              data-target="#multi-item-example"
              data-slide-to="0"
              className="active"
            ></li>
            <li data-target="#multi-item-example" data-slide-to="1"></li>
            <li data-target="#multi-item-example" data-slide-to="2"></li>
          </ol>

          <div className="carousel-inner" role="listbox">
            {activeItems.length > 0 && (
              <div className="carousel-item active">
                <div className="row mb-5">{activeItems}</div>{" "}
              </div>
            )}

            {itemsSecond.length > 0 && (
              <div className="carousel-item row">
                <div className="row">{itemsSecond}</div>
              </div>
            )}

            {itemsThird.length > 0 && (
              <div className="row">
                <div className="carousel-item ">{itemsThird}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default OntopArticle;
