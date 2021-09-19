import React, { Component , MouseEvent} from "react";
import { Fragment } from "react";
import Footer from "../components/footer/Footer";
import Menu from "../components/menu/Menu";
import "./DetailsBook.css";

import axios from "axios";
import { withRouter } from "react-router";
import { article } from "../model/article";
import { componentState } from "../model/componentState";
import CustomLogging from "../service/CustomLogging";

export interface DetailsArticleState extends componentState {
  article: article
}

class DetailsArticle extends Component<any, DetailsArticleState> {

  state: DetailsArticleState = {
    article: {} as article,
    loading: false
  };

  componentDidMount() {
    this.getArticle(this.props.match.params.id);
  }
  
  addComment( event : MouseEvent<HTMLElement>){
    console.log("ajout commentaire")
  }

  getArticle(id: number) {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/article/" + id)
      .then((res) => {
        this.setState({ article: res.data as article, loading: true });
      })
      .catch((error) => {
        console.error(error)
      });
  }

  render() {
    const article = this.state.article;
    const author = article.author;


    let success = new CustomLogging("Debug");
    success.setBodyStyle("white", null, "#4caf50");
    console.log(author)

    let likesNode = [];
    let authorBalise = [];
    let likes = 0;

    if (article.nbre_stars === null) likes = article.nbre_stars;

    for (let j = 0; j < likes; j++) {
      likesNode.push(<i className="fas fa-heart mr-1" key={j}></i>);
    }
    
    for (let j = 0; j < 5 - likes; j++) {
      likesNode.push(<i className="far fa-heart mr-1" key={j}></i>);
    }

    //let authorBalise = (<h6 key={author.id}>Auteur : <b>{author.first_name} {author.last_name}</b></h6>);
    if (author !== null && author !== undefined)
      authorBalise.push(<h6 key={author.id}>Auteur : <b>{author.first_name} {author.last_name}</b></h6>);

    return (
      <Fragment>
        <Menu color="gray" />
        <div className="container">
          <div className="row mt-5">
            <div className="col-9 mb-5">
              <h2 className="row" >
                <b className="col-12 text-center" >{article.title}</b>
              </h2>
              <p dangerouslySetInnerHTML={{__html: article.description}}/>
            </div>
            <div className="col-3">
              <div className="card pl-1">
                <h6 className="card-title mt-3">{likesNode}</h6>
                {authorBalise}
              </div>

            </div>
          </div>
          <div></div>
          <button className="btn btn-dark ml-1"><i className="fas fa-heart mr-1"></i>Donner son avis</button>
          <button className="btn btn-dark ml-1" onClick={this.addComment}><i className="fas fa-comment mr-1"></i>Commenter l'article</button>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

export default withRouter(DetailsArticle);
