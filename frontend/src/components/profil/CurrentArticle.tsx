import React, { Component, Fragment, MouseEvent } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Link } from "react-router-dom";
import { article } from "../../model/article";
import "./CurrentArticle.css";

export interface CurrentArticleProps extends RouteComponentProps {

  user: any;
  isFavorite: boolean;
  data: Array<article>;
}

class CurrentArticle extends Component<CurrentArticleProps, any> {

  constructor(props: CurrentArticleProps) {
    super(props)
    this.editArticle = this.editArticle.bind(this);
  }

  editArticle(event: MouseEvent<HTMLElement>) {

  }

  openArticle = (id: number) => {

    //@ts-ignore
    this.props.history.push({
      pathname: `/article/${id}`,

      // TODO : typescript pas très d'accord
      params: { "id": id }

    })
  }

  // dom function
  createStars = (nbre_stars: number) => {
    let likesNode = [];

    for (let j = 0; j < nbre_stars; j++) {
      likesNode.push(<i className="fas fa-heart mr-1" key={j}></i>);
    }
    for (let j = 0; j < 5 - nbre_stars; j++) {
      likesNode.push(<i className="far fa-heart mr-1" key={j}></i>);
    }

    return likesNode;
  }

  render() {

    const articles = this.props.data;
    let cardArticles: null | Array<JSX.Element> = [];

    if (articles.length > 0) {
      cardArticles = articles.map((article: article) =>
      (
        <div className="card row mb-1" key={article.id}>
          <div className="card-body">
            <h5 className="card-title">{article.title}</h5>
            <p className="card-text">
              {this.createStars(article.nbre_stars)}
              <button className="btn btn-primary float-right" onClick={() => this.openArticle(article.id)}>Plus <i className="fas fa-plus"></i></button>
            </p>
          </div>
        </div>)
      );
    }

    return (
      <Fragment>
        <div>
          <button
            className="btn btn-primary"
            id="addArticle"
            title="Ajouter un article"
            onClick={() => this.props.history.push("/addArticle")}>
            <i className="fas fa-plus fa-lg " />
          </button>
        </div>
        <div className="ml-1">
          {cardArticles.length === 0 ? <span className="row mb-1 ml-2">Vous n'avez pas encore d'articles. </span> : cardArticles}
          <nav aria-label="Page navigation" className="row float-right">
            <ul className="pagination mt-2">
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">Previous</span>
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                  <span className="sr-only">Next</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </Fragment >
    );
  }
}

export default withRouter(CurrentArticle);
