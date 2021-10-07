import React, { Component } from "react";
import { Fragment } from "react";
import Utils from "../../utils/Utils";

class GenericCard extends Component {


  render() {
    const isHCard = this.props.type === "hcard";
    return (
      <Fragment>
        {!isHCard ? (
          <div className="card" style={{ width: "90%" }}>
            <img src="img/image2.jpg" className="card-img-top" alt="image2" />
            <div className="card-body">
              <h5 className="card-title">{this.props.title}</h5>
              <p className="card-text" dangerouslySetInnerHTML={{ __html: Utils.truncate(this.props.description) }}></p>
              <p className="card-text">
                <small className="text-muted">En savoir plus.</small>
              </p>
            </div>
          </div>
        ) : (
          <div className="card mb-3 mx-2 mr-1">
            <div className="row g-0">
              <div className="col-md-4">
                <img src="img/image2.jpg" alt="..." className="card-img" />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h4 className="card-title">{this.props.title}</h4>
                  <p className="card-text" dangerouslySetInnerHTML={{ __html: Utils.truncate(this.props.description) }}></p>
                  <p className="card-text">
                    <small className="text-muted">En savoir plus.</small>
                  </p>
                </div>
              </div>
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
