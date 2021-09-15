import React, { Component, Fragment, MouseEvent } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import "./CurrentArticle.css";

export interface CurrentArticleProps extends RouteComponentProps {

  user: any;
  isFavorite: boolean;
}

class CurrentArticle extends Component<CurrentArticleProps, any> {

  constructor(props : CurrentArticleProps){
    super(props)
    this.editArticle= this.editArticle.bind(this);
  }

  editArticle(event : MouseEvent<HTMLElement>){
    
  }

  render() {

    let ordersCard = [];
    for (let i = 0; i < 4; i++) {
      ordersCard.push(
        <div className="card row mb-1" key={i}>
          <div className="card-body">
            <h5 className="card-title">Mon afrique jeune</h5>
            <p className="card-text">
              <span className="badge badge-secondary"> 10 €</span>
              <button className="btn btn-primary float-right">Plus <i className="fas fa-plus"></i></button>
            </p>
          </div>
        </div>
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
          {ordersCard}
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
      </Fragment>
    );
  }
}

export default withRouter(CurrentArticle);
