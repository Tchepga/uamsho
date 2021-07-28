import React, { Component, Fragment } from "react";
import GenericCard from "../components/utilities/GenericCard";
import Menu from "../components/menu/Menu";
import Footer from "../components/footer/Footer";
import axios from 'axios';
import Utils from "../utils/Utils";

class Article extends Component {
  constructor(props) {
    super(props);
    this.sortByCriteria = this.sortByCriteria.bind(this);
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
      articles: [
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

  componentDidMount(){
    this.getCategories();
    this.getArticles();
  }

  sortByCriteria(event){
    event.preventDefault();
    console.log(event)
    const sortType = event.target.element;
    console.log(sortType);
    
    if(sortType==="PRICE"){
        this.setState({articles : this.state.articles.sort(Utils.compareArticlesByPrice)})
    }
    if(sortType === "CHAR"){
        this.setState({articles : this.state.articles.sort()})
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
    axios.get(process.env.REACT_APP_API_URL+ '/api/articles')
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
          <li key={i} className="list-group-item">
            {categories[i].type_category}
          </li>
        );
      }
    else
      listCategoriesBalises.push("Un problème est subvenue à " + (new Date()) + " Contactez votre administrateur.");

    for (let i = 0; i < articles.length; i++) {
      articlesNode.push(
        <div
          className="col-12 px-0"
          role="presentation"
          key={i}
        >
          <GenericCard
            type="hcard"
            id={articles[i].id}
            title={articles[i].titre}
            description={articles[i].description}
          />
        </div>
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
                  <span className="p-3"> il y a {this.state.articles.length} produits |</span>
                  <select
                    className="form-select "
                    aria-label="Default select example"
                    onChange={this.sortByCriteria}
                  >
                    <option defaultValue>Par date d'ajout</option>
                    <option value="CHAR">Par ordre alphabétique</option>
                    <option value="PRICE">Par prix croissant</option>
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
