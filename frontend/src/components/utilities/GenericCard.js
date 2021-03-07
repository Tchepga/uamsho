import React, { Component } from "react";

class GenericCard extends Component {
  render() {
    return (
      <div className="card" style={{ width: "26rem" }}>
        <img src="img/image2.jpg" className="card-img-top" alt="image2" />
        <div className="card-body">
          <h5 className="card-title">{this.props.title}</h5>
          <p className="card-text">{this.props.description}</p>
          {/* eslint-disable-next-line */}
          <a href="#" className="btn btn-primary">
            En savoir plus
          </a>
        </div>
      </div>
    );
  }
}

GenericCard.defaultProps = {};
export default GenericCard;
