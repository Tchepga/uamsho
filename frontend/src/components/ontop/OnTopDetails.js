import React, { Component } from "react";
import CardBook from "../utilities/CardBook";

class OnTopDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let booksNodes = [];
    const { choice } = this.props;
    for (let i = 0; i < choice.length; i++) {
      booksNodes.push(
        <div className="col-4" key={i}>
          <CardBook book={choice[i]} />
        </div>
      );
    }

    if (choice.length === 0)
      booksNodes.push(
        <span style={{ minHeight: "100px", fontSize: "2rem" }}>
          Aucun livre présent dans cette catégorie.
        </span>
      );

    return <div className="row mt-3 ml-3">{booksNodes}</div>;
  }
}

export default OnTopDetails;
