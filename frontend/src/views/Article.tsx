import React, { ChangeEvent, Component, Fragment , MouseEvent} from "react";
import { Link } from "react-router-dom";
import GenericCard from "../components/utilities/GenericCard";
import Menu from "../components/menu/Menu";
import Footer from "../components/footer/Footer";
import axios from 'axios';
import Utils from "../utils/Utils";
import Pagination, {NBRE_ELEMENT_PAGE} from "../components/utilities/Pagination";
import { category } from "../model/category";
import { article } from "../model/article";

export interface ArticleState{
      categories: Array<category>,
      articles: Array<article>,
      currentPage: number,
      numberPage:number,
      currentCateg: string | null
}
class Article extends Component<any, ArticleState> {
  
   state : ArticleState = {
      categories: [],
      articles: [],
      currentPage: 1,
      numberPage:1,
      currentCateg: null
   }

  componentDidMount(){
    this.getCategories();
    this.getArticles();
  }

  sortByCriteria = (event: ChangeEvent<HTMLSelectElement>) =>{
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

  getAll = (event: MouseEvent<HTMLElement>) => {
    this.setState({ currentCateg: null })
  }

  getCategories = () => {
    axios.get(process.env.REACT_APP_API_URL+ '/api/categories')
      .then(res => {
        this.setState({ categories: res.data });
      })
      .catch(error => console.error(error))
  }

  getArticles = () => {
    axios.get(process.env.REACT_APP_API_URL+ '/api/article')
      .then(res => {
        this.setState({ articles: res.data.articles, numberPage: res.data.numberPage });
      })
      .catch(error => console.error(error))
  }

  sortByCategories = (event:  MouseEvent<HTMLElement>) => {
    this.setState({currentCateg  : event.currentTarget.innerText})
  }

  currentArticle = (currentPage: number) => {
    this.setState({ currentPage: currentPage });
  };

  render() {
    const {articles, currentCateg, currentPage, categories} = this.state;
    let articlesNode = [];
    let listCategoriesBalises = [];
    const listClass = "list-group-item cursor-pointer";

    if(categories.length > 0 )
      for (let i = 0; i < categories.length; i++) {
        listCategoriesBalises.push(
          <li 
            key={i} 
            className={this.state.currentCateg === categories[i].type_category ? listClass + " active" : listClass}
            onClick={this.sortByCategories}>
            {categories[i].type_category}
          </li>
        );
      }
    else
      listCategoriesBalises.push("Un problème est subvenue à " + (new Date()) + " Contactez votre administrateur.");

    // process balise of article
    let currentArticles = articles.slice((currentPage-1)*NBRE_ELEMENT_PAGE,  currentPage * NBRE_ELEMENT_PAGE)
    currentArticles = currentCateg === null ? currentArticles : currentArticles.filter((art) => art.category === currentCateg)
    console.log(currentArticles)
    for (let i = 0; i < currentArticles.length; i++) {
      articlesNode.push(
          <Link to={{
            pathname: `/article/${currentArticles[i].id}`,
            //@ts-ignore
            params:{ "id": currentArticles[i].id }
          }}
           className="col-12 px-0" key={i}>
            <GenericCard
              type="hcard"
              id={currentArticles[i].id}
              title={currentArticles[i].title}
              description={currentArticles[i].description}
            />
          </Link>
      );
    }

    return (
      <div className="default-color">
        <Fragment>
          <Menu />
          <div className="container">
            <div className="row mt-5">
              <div className="col-3">
                <div className="card" style={{ width: "18rem", backgroundColor: "#C38D9E" }}>
                  <div className="card-header cursor-pointer" onClick={this.getAll}>
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
                    <option defaultValue="true">Par date d'ajout</option>
                    <option value="LIKE">Par pertinence</option> {/* TODO à traiter après */}
                    <option value="CHAR">Par ordre alphabétique</option>
                  </select>
                </span>
                <div className="row neutral mb-3">{articlesNode}</div>
                <div className="row-cols-12 text-center">
                  <Pagination
                    currentBook={this.currentArticle}
                    books={this.state.articles}
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

export default Article;
