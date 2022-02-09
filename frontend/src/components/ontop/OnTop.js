import React, { Component } from "react";
import "./OnTop.css";
import "../../scss/custom.css";
import OnTopDetails from "./OnTopDetails";
import Utils from "../../utils/Utils";

import axios from "axios";
export default class OnTop extends Component {
  state = {
    onTopBooks: [],
    choice: [],
    links: [
      {
        id: 1,
        name: "Nouveautés",
      },
      {
        id: 2,
        name: "Best seller",
      },
      {
        id: 3,
        name: "Entreprenariat",
      },
      {
        id: 4,
        name: "Jeunesse",
      },
    ],

    hoverMenu: "rgba(157, 148, 141, 0.5)"
  };

  getOnTopBook() {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/book/ontop")
      .then((res) => {
        this.setState({ onTopBooks: res.data });

        let firstChoice = [];
        if (res.data.length > 4) {
          firstChoice.push(res.data[0]);
          firstChoice.push(res.data[1]);
          firstChoice.push(res.data[2]);
          firstChoice.push(res.data[4]);
        } else {
          firstChoice = res.data;
        }

        this.setState({ choice: firstChoice });
      })
      .catch((error) => console.error(error));
  }

  componentDidMount() {
    this.getOnTopBook();
  }

  onTopDetailsChoice = (event) => {
    event.preventDefault();
    let { onTopBooks } = this.state;
    if (event.target.textContent.includes("Nouveautés")) {
      let newBook = [];
      if (onTopBooks.length > 4) {
        newBook.push(this.state.onTopBooks[0]);
        newBook.push(this.state.onTopBooks[1]);
        newBook.push(this.state.onTopBooks[2]);
        newBook.push(this.state.onTopBooks[4]);
      }
      this.setState((state) => ({ choice: newBook }));
    } else {
      const choiceValue = this.state.links.find((item) =>
        item.name.includes(
          Utils.capitalizeFirstLetter(event.target.textContent)
        )
      );
      const choiceArrayValue = this.state.onTopBooks.filter(
        (item) => item.id === choiceValue.id
      );
      this.setState((state) => ({ choice: choiceArrayValue }));
    }
  }

  render() {
    const { links } = this.state;
    let items = [];
    for (let i = 0; i < links.length; i++) {
      items.push(
        <button
          type="button"
          className="btn btn-secondary"
          style={{ width: "280px", height: "60px" }}
          onClick={this.onTopDetailsChoice}
          key={links[i].id}
        >
          {links[i].name}
        </button>
      );
    }

    return (
      <div id="ontop" className="container mb-4">
        <div className="btn-group" role="group" aria-label="first group" id="menuTop" >
          {items}
        </div>
        <OnTopDetails choice={this.state.choice} />
      </div>
    );
  }
}
