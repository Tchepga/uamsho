import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import GenericCard from "../components/utilities/GenericCard";
import Menu from "../components/menu/Menu";
import Footer from "../components/footer/Footer";
import axios from 'axios';
import Utils from "../utils/Utils";

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      articles: [],
    };
    
    this.sortByCriteria = this.sortByCriteria.bind(this);
    this.sortByCategories = this.sortByCategories.bind(this);
  }

  componentDidMount(){
    this.getCategories();
    this.getArticles();
  }

  sortByCriteria(event){
    event.preventDefault();
    const sortType = event.target.value;
    
    switch(sortType){
      case "LIKE":
        console.error("Non-implémenté!")
        break;
      case "CHAR":
        this.setState({articles : this.state.articles.sort(Utils.compareEntityByTitle)})
        break;
      default:
        this.getArticles();
    }

  }

  getCategories() {
    axios.get(process.env.REACT_APP_API_URL+ '/api/categories')
      .then(res => {
        this.setState({ categories: res.data });
      })
      .catch(error => console.log(error))
  }

  getArticles() {
    axios.get(process.env.REACT_APP_API_URL+ '/api/article  ')
      .then(res => {
        this.setState({ articles: res.data });
      })
      .catch(error => console.log(error))
  }

  sortByCategories(event){

    axios.get(process.env.REACT_APP_API_URL+ '/api/articles?categorie=' + event.target.innerText)
    .then(res => {
      this.setState({ articles: res.data });
    })
    .catch(error => console.log(error))
  }

  render() {
    const articles = this.state.articles;
    let articlesNode = [];
    let listCategoriesBalises = [];
    const { categories } = this.state;

    if(categories.length > 0 )
      for (let i = 0; i < categories.length; i++) {
        listCategoriesBalises.push(
          <li key={i} className="list-group-item cursor-pointer" onClick={this.sortByCategories}>
            {categories[i].type_category}
          </li>
        );
      }
    else
      listCategoriesBalises.push("Un problème est subvenue à " + (new Date()) + " Contactez votre administrateur.");

    for (let i = 0; i < articles.length; i++) {
      articlesNode.push(
          <Link to={{
            pathname: `/article/${articles[i].id}`,
            params:{ "id": articles[i].id }
          }}
           className="col-12 px-0" key={i}>
            <GenericCard
              type="hcard"
              id={articles[i].id}
              title={articles[i].title}
              description={articles[i].description}
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
                <span
                  className="d-flex flex-row bg-light text-dark  mb-2"
                  style={{ marginLeft: "-5px" }}
                >
                  <p className="mr-auto px-2 pt-3">Listes disponibles</p>
                  <span className="p-3"> il y a {this.state.articles.length} produits | </span>
                  <select
                    className="form-select"
                    aria-label="Type filter"
                    onChange={this.sortByCriteria}
                  >
                    <option defaultValue>Par date d'ajout</option>
                    <option value="LIKE">Par pertinence</option> {/* TODO à traiter après */}
                    <option value="CHAR">Par ordre alphabétique</option>
                  </select>
                </span>
                <div className="row neutral mb-3">{articlesNode}</div>
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

export default Article;
