import React, { Component, Fragment } from "react";
import GenericCard from "../components/utilities/GenericCard";
import Menu from "../components/menu/Menu";
import Footer from "../components/footer/Footer";

class Article extends Component {
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
  render() {
    const articles = this.state.articles;
    let articlesNode = [];
    let listCategoriesBalises = [];
    const { categories } = this.state;

    for (let i = 0; i < categories.length; i++) {
      listCategoriesBalises.push(
        <li key={i} className="list-group-item">
          {categories[i]}
        </li>
      );
    }

    for (let i = 0; i < articles.length; i++) {
      articlesNode.push(
        <div
          className="col-12 px-0"
          role="presentation"
          key={articles[i].id}
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
                  <span className="p-3"> il y a 100 produits |</span>
                  <select
                    className="form-select "
                    aria-label="Default select example"
                  >
                    <option selected>Par pertinence</option>
                    <option value="1">Par ordre alphabétique</option>
                    <option value="2">Par prix croissant</option>
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
          <Footer />
        </Fragment>
      </div>
    );
  }
}

export default Article;
