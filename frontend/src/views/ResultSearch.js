import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import GenericCard from "../components/utilities/GenericCard";
import Menu from "../components/menu/Menu";
import Footer from "../components/footer/Footer";
import axios from "axios";
import { withRouter } from "react-router";

class ResultSearch extends Component {
  state = {
    results: [],
    nbreElement: 0
  };

  componentDidMount() {
    const url = new URL(window.location.href)
    const scope = url.searchParams.get("scope")
    const inputSearch = url.searchParams.get("inputSearch")

    axios
      .get(
        process.env.REACT_APP_API_URL +
        "/api/search?scope=" +
        scope +
        "&inputSearch=" +
        inputSearch
      )
      .then((res) => {
        this.setState({ results: res.data });
      })
      .catch((error) => console.error(error));
  }

  nbreResult(){
    let nbre =0;
    
    const results= this.state.results
    if(results){
      if(results.books){
        nbre += results.books.length
      }

      if(results.articles){
        nbre += results.articles.length
      }
    }
    
    this.setState({nbreElement : nbre})
  }

  render() {

    let results = this.state.results;
    let dataBalises = [];
    const articles = results.articles;

    if (articles)
      articles.forEach((article) => {
        dataBalises.push(
          <Link
            to={{
              pathname: `/article/${articles.id}`,
              params: { id: article.id },
            }}
            className="col-12 px-0"
            key={article.id}
          >
            <GenericCard
              type="hcard"
              id={article.id}
              title={article.title}
              description={article.description}
            />
          </Link>
        );
      });

    const books = results.books;
    if (books)
      books.forEach((book) => {
        dataBalises.push(
          <Link
            to={{
              pathname: `/book/${book.id}`,
              params: { id: book.id },
            }}
            className="col-12 px-0"
            key={book.id}
          >
            <GenericCard
              type="hcard"
              id={book.id}
              title={book.title}
              description={book.description}
            />
          </Link>
        );
      });

    return (
      <div>
        <Fragment>
          <Menu color="gray" />
          <div className="container">
            <div className="row mt-5">
              <div className="col-8 ml-4">
                <span
                  className="d-flex flex-row bg-light text-dark  mb-2"
                  style={{ marginLeft: "-5px" }}
                >
                  <p className="mr-auto px-2 pt-3">Listes disponibles</p>
                  <span className="p-3">
                    {" "}
                    il y a {this.state.nbreElement} élements |{" "}
                  </span>
                  <select
                    className="form-select"
                    aria-label="Type filter"
                    onChange={this.sortByCriteria}
                  >
                    <option defaultValue>Par date d'ajout</option>
                    <option value="LIKE">Par pertinence</option>{" "}
                    {/* TODO à traiter après */}
                    <option value="CHAR">Par ordre alphabétique</option>
                  </select>
                </span>
                <div className="row neutral mb-3">{dataBalises}</div>
              </div>
            </div>
          </div>
          <Footer />
        </Fragment>
      </div>
    );
  }
}

export default withRouter(ResultSearch);
