import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Menu from "../components/menu/Menu";
import CardBook from "../components/utilities/CardBook";
import "./Book.css";
import axios from "axios";
import Utils from "../utils/Utils";
import Pagination, {NBRE_ELEMENT_PAGE} from "../components/utilities/Pagination";

export default class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      books: [],
      currentPage: 1,
      numberPage:1,
      currentCateg: null
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
        this.setState({ books: res.data.books, numberPage : res.data.number_page });
      })
      .catch((error) => console.log(error));
  }

  sortByCategories(event) {
    this.setState({currentCateg  : event.target.innerText})
  }

  currentBook = (currentPage) => {
    this.setState({ currentPage: currentPage });
  };

  render() {
    const { categories, books, currentPage, currentCateg } = this.state;
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

    // balise book
    let currentBooks = books.slice((currentPage-1)*NBRE_ELEMENT_PAGE,  currentPage * NBRE_ELEMENT_PAGE)
    currentBooks = currentCateg === null ? currentBooks : currentBooks.filter((book) => book.category === currentCateg)
    for (let i = 0; i < currentBooks.length; i++) {
      let likes = [];
      for (let j = 0; j < currentBooks[i].likes; j++) {
        likes.push(<i className="fas fa-heart mr-1"></i>);
      }

      listBooksBalises.push(
        <Link
          to={{
            pathname: `/books/${currentBooks[i].id}`,
            params: { id: currentBooks[i].id },
          }}
          className="col-4 px-0 my-2"
          key={i}
        >
          <CardBook addClass={Utils.H_100} book={currentBooks[i]} />
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
                    il y a {currentBooks.length} produits |
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
                <div className="row-cols-12 text-center">
                  <Pagination
                    currentBook={this.currentBook}
                    books={this.state.books}
                    numberPage = {this.state.numberPage}
                  />
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </Fragment>
      </div>
    );
  }
}
