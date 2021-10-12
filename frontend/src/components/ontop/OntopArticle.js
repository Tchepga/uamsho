import axios from "axios";
import { Component } from "react";
import GenericCard from "../utilities/GenericCard";
import "./OntopArticle.css";
import Utils from "./../../utils/Utils";

class OntopArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
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
          <div key={i} className="col-4px-5 mt-5">
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
        <h3 style={{ textAlign: "center" }} className="mt-5"> Actualités </h3>
        <div
          id="multi-item-example"
          className="carousel slide carousel-multi-item "
          data-ride="carousel"
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
          <ol className="carousel-indicators bg-white">
            <li
              data-target="#multi-item-example"
              data-slide-to="0"
              className="active"
            ></li>
            <li data-target="#multi-item-example" data-slide-to="1"></li>
            <li data-target="#multi-item-example" data-slide-to="2"></li>
          </ol>

          <div className="carousel-inner bg-white" role="listbox">
            {activeItems.length > 0 && (
              <div className="carousel-item active bg-white">
                <div className="row mb-5 bg-white">{activeItems}</div>{" "}
              </div>
            )}

            {itemsSecond.length > 0 && (
              <div className="carousel-item row"  >
                <div className="row bg-white">{itemsSecond}</div>
              </div>
            )}

            {itemsThird.length > 0 && (
              <div className="row bg-white">
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
