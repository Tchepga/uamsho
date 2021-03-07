import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Menu from "../components/menu/Menu";
import "./Book.css";

export default class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        "ANTHROPOLOGIE",
        "ART",
        "DROIT",
        "BIOLOGIE",
        "NATURE",
        "JEUNESSE",
        "ENTREPRISE",
      ],
      books: [
        {
          title: "Mon Afrique à moi",
          author: "Patrick Tchepga",
          likes: 2,
          prix: 50,
          image: "",
        },
        {
          title: "Père et Mère",
          author: "Paul Martin",
          likes: 3,
          prix: 20,
          image: "",
        },
        {
          title: "La vallée perdue",
          author: "Paul Martin",
          likes: 4,
          prix: 52,
          image: "",
        },
        {
          title: "Retour aux source",
          author: "Paul Martin",
          likes: 3,
          prix: 30,
          image: "",
        },
        {
          title: "Mon avenir",
          author: "Ange Mougoue",
          likes: 3,
          prix: 20,
          image: "",
        },
        {
          title: "L'Afrique demain",
          author: "Ruben Njietcheu",
          likes: 3,
          prix: 50,
          image: "",
        },
        {
          title: "Develeppement africain",
          author: "Aime cesar",
          likes: 5,
          prix: 70,
          image: "",
        },
        {
          title: "A la conquête du monde",
          author: "Ahmadou Ahidjo",
          likes: 3,
          prix: 50,
          image: "",
        },
        {
          title: "Je suis fier de toi",
          author: "Paul Biya",
          likes: 3,
          prix: 50,
          image: "",
        },
        {
          title: "Je vais changer le monde",
          author: "Patrick Tchepga",
          likes: 3,
          prix: 10,
          image: "",
        },
        {
          title: "Mes ancètres",
          author: "Nelly Kenne",
          likes: 2,
          prix: 50,
          image: "",
        },
        {
          title: "La vie",
          author: "Pascal Njamo",
          likes: 1,
          prix: 57,
          image: "",
        },
      ],
    };
  }

  render() {
    const { categories, books } = this.state;
    let listCategoriesBalises = [],
      listBooksBalises = [];

    // liste catégories
    for (let i = 0; i < categories.length; i++) {
      listCategoriesBalises.push(
        <li key={i} className="list-group-item">
          {categories[i]}
        </li>
      );
    }

    // liste livres par page (30 par pages)
    for (let i = 0; i < books.length; i++) {
      let likes = [];
      for (let j = 0; j < books[i].likes; j++) {
        likes.push(<i className="fas fa-heart mr-1"></i>);
      }
      listBooksBalises.push(
        <Link to="/books/detai">
          <div
            className="card ml-4 mr-3 mb-3"
            style={{ width: "12rem" }}
            key={i}
          >
            <img
              src="img/open-book-clipart-03.png"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body text-center">{likes}</div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item text-center">{books[i].title}</li>
              <li className="list-group-item text-center">{books[i].author}</li>
              <li className="list-group-item text-center">{books[i].prix}</li>
            </ul>
          </div>
        </Link>
      );
    }

    return (
      <div>
        <Fragment>
          <Menu />
          <div className="container">
            <div className="row mt-5">
              <div className="col-3">
                <div className="card" style={{ width: "18rem" }}>
                  <div className="card-header">Catégories</div>
                  <ul className="list-group list-group-flush">
                    {listCategoriesBalises}
                  </ul>
                </div>
              </div>
              <div className="col-8 ml-5">
                <input
                  className="form-control mb-2"
                  type="text"
                  placeholder="Livres disponibles"
                  aria-label="Disabled input example"
                  disabled
                />
                <div className="row">{listBooksBalises}</div>
                <nav aria-label="...">
                  <ul className="pagination">
                    <li className="page-item disabled">
                      {/* eslint-disable-next-line */}
                      <a
                        className="page-link"
                        href="#"
                        tabindex="-1"
                        aria-disabled="true"
                      >
                        Previous
                      </a>
                    </li>
                    <li className="page-item">
                      {/* eslint-disable-next-line */}
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item active" aria-current="page">
                      {/* eslint-disable-next-line */}
                      <a className="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      {/* eslint-disable-next-line */}
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      {/* eslint-disable-next-line */}
                      <a className="page-link" href="#">
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </Fragment>
      </div>
    );
  }
}
