import { Component } from "react";
import { book } from "../../model/book";
import { facture } from "../../model/facture";
import LikeService from "../../service/LikeService";
import PaymentService from "../../service/PaymentService";
import Utils from "../../utils/Utils";

export interface PropsPassOrder {
  user: any;
}

export interface PassOrderState {
  factures: Array<facture>;
}
class PassOrder extends Component<PropsPassOrder, any> {

  state= {
    factures:[] as Array<facture>
  }
  componentDidMount() {
    PaymentService.retrieveFacture(this.props.user.email)
      .then(resp => this.setState({ factures: resp.data }))
      .catch(error => console.log(`error`, error))
  }
  render() {
    const ordersCard = this.state.factures.map( facture => 
      (<div className="card" key={facture.identifiant}>
          <div className="card-body">
            <h5 className="card-title">Commande du {Utils.dateFromString(facture.date_creation)} - N°{Utils.formatNumber(facture.identifiant)}</h5>
            {facture.list_articles.map(book => 
              (<h6 className="card-subtitle mb-2 text-muted">{book.title }</h6>)
              )}
            <h6 className="card-subtitle mb-2 text-muted">Le {Utils.dateFromString(facture.date_creation)}</h6>
            <div className="row">
            <h6 className="card-text col -2 text-danger" style={{fontSize : "20px"}}>{facture.totalTTC} €</h6>
            <button className="btn btn-info offset-6 col-3">Générer une facture</button>
            </div>
          </div>
        </div>
      ));
    
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

export default PassOrder;
