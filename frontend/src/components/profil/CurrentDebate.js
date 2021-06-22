import React, { Component } from "react";

class CurrentDebate extends Component {
  render() {
    let ordersCard = [];
    for (let i = 0; i < 4; i++) {
      ordersCard.push(
        <div class="card row mb-1">
          <div class="card-body">
            <h5 class="card-title">Mon afrique jeune</h5>
            <p class="card-text">
              <span class="badge badge-secondary"> 10 €</span> <br/>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <a href="#" class="btn btn-primary float-right">Plus <i class="fas fa-plus"></i></a>
            </p>
          </div>
        </div>
      );
    }
    return (
      <div className="ml-1">
        {ordersCard}
        <nav aria-label="Page navigation" className="row float-right">
          <ul class="pagination mt-2">
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                1
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                2
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                3
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default CurrentDebate;
