import React, { Component } from "react";
import { Fragment } from "react";

class GenericCard extends Component {


  render() {
    const isHCard = this.props.type === "hcard";
    return (
      <Fragment>
        {!isHCard ? (
          <div className="card" style={{ width: "90%" }}>
            <div className="card-body">
              <span className="card-title"><b>{this.props.title}</b></span>
              <p className="card-text">
                <small className="text-muted">En savoir plus.</small>
              </p>
            </div>
          </div>
        ) : (
          <div className="card mb-3 mx-2 mr-1">
            <div className="card-body">
              <span className="card-title"><b>{this.props.title}</b></span>
              <p className="card-text">
                <small className="text-muted">En savoir plus.</small>
              </p>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

GenericCard.defaultProps = {
  width: "26rem",
};
export default GenericCard;
