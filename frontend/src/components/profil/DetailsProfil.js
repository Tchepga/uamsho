import React from "react";

class DetailsProfil extends React.Component {
  render() {
    return (
      <form>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="email">Email</label>
            <input type="email" className="form-control" value={this.props.user.email||''} id="email" readOnly/>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              value={this.props.user.password||''}
              id="password"
              readOnly
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="adress">Adresse</label>
          <input
            type="text"
            className="form-control"
            id="adress"
            placeholder="1234 Main St"
            readOnly
            value={this.props.user.adress||''}
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputAddress2">complément d'adresse</label>
          <input
            type="text"
            className="form-control"
            id="inputAddress2"
            placeholder="Apartment, studio, or floor"
            value={this.props.user.additionnalInfoAdress||''}
            readOnly
          />
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputCity">City</label>
            <input type="text" className="form-control" id="inputCity" />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="inputState">State</label>
            <select id="inputState" className="form-control" defaultValue="...">
              <option>Choose...</option>
              <option>...</option>
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          modifier
        </button>
      </form>
    );
  }
}

export default DetailsProfil;
