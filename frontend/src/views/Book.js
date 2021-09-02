import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Menu from "../components/menu/Menu";
import CardBook from "../components/utilities/CardBook";
import "./Book.css";
import axios from "axios";
import Utils from "../utils/Utils";

export default class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      books: [],
    };
    this.sortByCriteria = this.sortByCriteria.bind(this);
    this.sortByCategories = this.sortByCategories.bind(this);
  }

  componentDidMount() {
    this.getCategories();
    this.getBooks();
  }

  sortByCriteria(event) {
    event.preventDefault();
    const sortType = event.target.value;
    switch (sortType) {
      case "PRICE":
        this.setState({
          books: this.state.books.sort(Utils.compareBookByPrice).reverse(),
        });
        break;
      case "CHAR":
        this.setState({
          books: this.state.books.sort(Utils.compareEntityByTitle),
        });
        break;
      default:
        this.getBooks();
    }
  }

  getCategories() {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/categories")
      .then((res) => {
        this.setState({ categories: res.data });
      })
      .catch((error) => console.log(error));
  }

  getBooks() {
    console.log(this.props);
    axios
      .get(process.env.REACT_APP_API_URL + "/api/book")
      .then((res) => {
        this.setState({ books: res.data });
      })
      .catch((error) => console.log(error));
  }

  sortByCategories(event) {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          "/api/book?categorie=" +
          event.target.innerText
      )
      .then((res) => {
        this.setState({ books: res.data });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { categories, books } = this.state;
    let listCategoriesBalises = [];
    let listBooksBalises = [];

    // liste catégories
    for (let i = 0; i < categories.length; i++) {
      listCategoriesBalises.push(
        <li
          key={i}
          className="list-group-item cursor-pointer"
          onClick={this.sortByCategories}
        >
          {categories[i].type_category}
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
        
        <Link
          to={{
            pathname: `/books/${books[i].id}`,
            params:{ "id": books[i].id }
          }}
          className="col-4 px-0 my-2"
          key={i}
        >
          <CardBook addClass={Utils.H_100} book={books[i]} />
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
                <span
                  className="d-flex flex-row bg-light text-dark  mb-2"
                  style={{ marginLeft: "-5px" }}
                >
                  <p className="mr-auto px-2 pt-3">Listes disponibles</p>
                  <span className="p-3">
                    {" "}
                    il y a {this.state.books.length} produits |
                  </span>
                  <select
                    className="form-select "
                    aria-label="Type filter"
                    onChange={this.sortByCriteria}
                  >
                    <option defaultValue>Par pertinence</option>
                    <option value="CHAR">Par ordre alphabétique</option>
                    <option value="PRICE">Par prix décroissant</option>
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
