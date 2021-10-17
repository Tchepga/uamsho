import { Component } from "react";

class CurrentDebate extends Component {

  componentDidMount() {

  }
  render() {
    let ordersCard = [];
    for (let i = 0; i < 4; i++) {
      ordersCard.push(
        <div className="card row mb-1">
          <div className="card-body">
            <h5 className="card-title">Mon afrique jeune</h5>
            <p className="card-text">
              <span className="badge badge-secondary"> 10 €</span> <br />
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <a href="#" className="btn btn-primary float-right">Plus <i class="fas fa-plus"></i></a>
            </p>
          </div>
        </div>
      );
    }
    return (
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
    );
  }
}

export default CurrentDebate;
