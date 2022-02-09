import React, { Component } from "react";

class Connexion extends Component {
  render() {
    return (
      <form className="form-signin text-center col-4 offset-4" style={{marginTop: '160px'}}>
        <a href="/">
          <img
            className="mb-4"
            src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"
            alt=""
            width="72"
            height="72"
          />
        </a>
        <h1 className="h3 mb-3 font-weight-normal">Identifiez-vous</h1>
        <label htmlFor="inputEmail" className="sr-only">
          Email
        </label>
        <input
          type="email"
          id="inputEmail"
          className="form-control mb-2"
          placeholder="Email addresse"
          required
          autoFocus
        />
        <label htmlFor="inputPassword" className="sr-only">
          Password
        </label>
        <input
          type="password"
          id="inputPassword"
          className="form-control mb-2"
          placeholder="Password"
          required
        />
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Connexion
        </button>
        <p className="mt-5 mb-3 text-muted">&copy; 2010-2021</p>
      </form>
    );
  }
}

export default Connexion;
