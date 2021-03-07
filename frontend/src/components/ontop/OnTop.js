import React, { Component } from "react";
import "./OnTop.css";
import "../../scss/custom.css";
import OnTopDetails from "./OnTopDetails";

export default class OnTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choice: "Nouveautés",
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
    };

    this.onTopDetailsChoice = this.onTopDetailsChoice.bind(this);
  }

  onTopDetailsChoice = (event) => {
    event.preventDefault();
    console.log(event.target);
    // // const { choice } = event.target.elements
    this.setState((state) => ({ choice: event.target.textContent }));
  };
  render() {
    const { choice, links } = this.state;
    let items = [];
    for (let i = 0; i < links.length; i++) {
      items.push(
        <li className="nav-item col-3" role="presentation" key={links[i].id}>
          {/* eslint-disable-next-line */}
          <a
            className={
              links[i].name === choice ? "nav-link active" : "nav-link"
            }
            href="#"
            aria-current="page"
            onClick={this.onTopDetailsChoice}
          >
            {links[i].name}
          </a>
        </li>
      );
    }
    return (
      <div id="ontop" className="container">
        <ul className="nav nav-tabs" id="menuTop" role="tablist">
          {items}
        </ul>
        <OnTopDetails choice={this.state.choice} />
      </div>
    );
  }
}
