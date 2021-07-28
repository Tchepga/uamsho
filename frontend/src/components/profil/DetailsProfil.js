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
            <label htmlFor="password">Pseudo</label>
            <input
              type="text"
              className="form-control"
              value={this.props.user.username||''}
              id="username"
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
            value={this.props.user.address ||''}
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputAddress2">complément d'adresse</label>
          <input
            type="text"
            className="form-control"
            id="inputAddress2"
            placeholder="Apartment, studio, or floor"
            value={this.props.user.complement_address||''}
            readOnly
          />
        </div>
        
        <button type="submit" className="btn btn-primary">
          modifier
        </button>
      </form>
    );
  }
}

export default DetailsProfil;
