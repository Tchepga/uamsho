import React, { Component } from "react";
import { Fragment } from "react";
import Footer from "../components/footer/Footer";
import Menu from "../components/menu/Menu";
import "./DetailsBook.css";

import axios from "axios";
import { withRouter } from "react-router";

class DetailsArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {},
    };
  }

  componentDidMount() {
    this.getArticle(this.props.match.params.id);
  }

  getArticle(id) {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/article/" + id)
      .then((res) => {
        this.setState({ article: res.data });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const article = this.state.article;
    let likesNode = [];
    let likes = 0;
    if (article.likes === null) likes = article.likes;
    for (let j = 0; j < likes; j++) {
      likesNode.push(<i className="fas fa-heart mr-1" key={j}></i>);
    }
    for (let j = 0; j < 5 - likes; j++) {
      likesNode.push(<i className="far fa-heart mr-1" key={j}></i>);
    }

    return (
      <Fragment>
        <Menu color="gray" />
        <div className="container">
          <div className="row mt-5">
            <div className="col-9 mb-5">
              <h2 className="row" >
                <b className="col-12 text-center" >{article.title}</b>
              </h2>
              <p>{article.description}</p>
            </div>
            <div className="col-3">
              <div className="card pl-1">
              <h6 className="card-title mt-3">{likesNode}</h6>
              <h6>Auteur : <b>{article.author__last_name} {article.author__first_name}</b></h6>
              </div>
            
            </div>
          </div>
            <button className="btn btn-dark ml-1"><i className="fas fa-heart mr-1"></i>Donner son avis</button>
            <button className="btn btn-dark ml-1"><i className="fas fa-comment mr-1"></i>Commenter l'article</button>
          </div>
        <Footer />
      </Fragment>
    );
  }
}

export default withRouter(DetailsArticle);
