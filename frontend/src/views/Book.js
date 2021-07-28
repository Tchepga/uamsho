import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Menu from "../components/menu/Menu";
import CardBook from "../components/utilities/CardBook";
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
          id: 1,
          title: "Mon Afrique à moi",
          author: "Patrick Tchepga",
          likes: 2,
          prix: 50,
          image: "",
        },
        {
          id: 1,
          title: "Père et Mère",
          author: "Paul Martin",
          likes: 3,
          prix: 20,
          image: "",
        },
        {
          id: 1,
          title: "La vallée perdue",
          author: "Paul Martin",
          likes: 4,
          prix: 52,
          image: "",
        },
        {
          id: 1,
          title: "Retour aux source",
          author: "Paul Martin",
          likes: 3,
          prix: 30,
          image: "",
        },
        {
          id: 1,
          title: "Mon avenir",
          author: "Ange Mougoue",
          likes: 3,
          prix: 20,
          image: "",
        },
        {
          id: 1,
          title: "L'Afrique demain",
          author: "Ruben Njietcheu",
          likes: 3,
          prix: 50,
          image: "",
        },
        {
          id: 1,
          title: "Develeppement africain",
          author: "Aime cesar",
          likes: 5,
          prix: 70,
          image: "",
        },
        {
          id: 1,
          title: "A la conquête du monde",
          author: "Ahmadou Ahidjo",
          likes: 3,
          prix: 50,
          image: "",
        },
        {
          id: 1,
          title: "Je suis fier de toi",
          author: "Paul Biya",
          likes: 3,
          prix: 50,
          image: "",
        },
        {
          id: 1,
          title: "Je vais changer le monde",
          author: "Patrick Tchepga",
          likes: 3,
          prix: 10,
          image: "",
        },
        {
          id: 1,
          title: "Mes ancètres",
          author: "Nelly Kenne",
          likes: 2,
          prix: 50,
          image: "",
        },
        {
          id: 1,
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
    let listCategoriesBalises = [];
    let listBooksBalises = [];

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
        <Link to="/books/details" className="col-4 px-0" key={i}>
          <CardBook
            title={books[i].title}
            likes={books[i].likes}
            author={books[i].author}
            price={books[i].prix}
            category={books[i].category}
            image={books[i].image}
          />
        </Link>
      );
    }

    return (
      <div>
        <Fragment>
          <Menu color="gray" />
          <div className="container">
            <div className="row mt-5">
              <div className="col-3">
                <div className="card" style={{ width: "18rem" }}>
                  <div className="card-header">
                    <i className="far fa-list-alt"></i>
                    <b className="ml-2">Catégories</b>
                  </div>
                  <ul className="list-group list-group-flush">
                    {listCategoriesBalises}
                  </ul>
                </div>
              </div>
              <div className="col-8 ml-4">
                <span className="d-flex flex-row bg-light text-dark  mb-2" style={{marginLeft: "-5px"}}>
                  <p className="mr-auto px-2 pt-3">Listes disponibles</p>
                  <span className="p-3"> il y a 100 produits |</span>
                  <select
                    className="form-select "
                    aria-label="Default select example"
                  >
                    <option defaultValue>Par pertinence</option>
                    <option value="1">Par ordre alphabétique</option>
                    <option value="2">Par prix croissant</option>
                  </select>
                </span>
                <div className="row neutral">{listBooksBalises}</div>
                <nav aria-label="...">
                  <ul className="pagination">
                    <li className="page-item disabled">
                      {/* eslint-disable-next-line */}
                      <a
                        className="page-link"
                        href="#"
                        tabIndex="-1"
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
          <Footer />
        </Fragment>
      </div>
    );
  }
}
