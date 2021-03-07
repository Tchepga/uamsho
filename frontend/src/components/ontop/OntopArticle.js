import React, { Component } from "react";
import GenericCard from "../utilities/GenericCard";
import "./OntopArticle.css";

class OntopArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [
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
    const bookData = this.state.books;
    let booksNodes = [];
    for (let i = 0; i < bookData.length; i++) {
      booksNodes.push(
        <li>
          <div key={i} className="px-5 mt-5">
            <GenericCard
              id={bookData[i].id}
              title={bookData[i].titre}
              description={bookData[i].description}
            />
          </div>
        </li>
      );
    }
    return (
      <div id="ontoparticle" className="container">
        <h3 style={{ textAlign: "center" }}> Actualités </h3>
        <div className="horizontal-scroll">
          <ul> {booksNodes} </ul>
        </div>
      </div>
    );
  }
}

export default OntopArticle;
