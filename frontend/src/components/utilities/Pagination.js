import React, { Component } from "react";

export const NBRE_ELEMENT_PAGE = 5;

class Pagination extends Component {

  
  switchPage = (event) => {
      this.props.currentBook(parseInt(event.target.innerText));
  };

  render() {
    let numeroPageBalise = [];
    
    for (let i = 1; i <= this.props.numberPage; i++) {
      numeroPageBalise.push(
        <li className="page-item"  key={i}>
          <button className="page-link" onClick={this.switchPage}>
            {i}
          </button>
        </li>
      );
    }
    return (
      <nav aria-label="pagination" style={{display : "inline-block"}}>
        <ul className="pagination">{numeroPageBalise}</ul>
      </nav>
    );
  }
}

export default Pagination;
