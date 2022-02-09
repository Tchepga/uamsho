import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Menu from '../components/menu/Menu';
import CardPayment from '../components/utilities/CardPayment';
import PaypalPayement from '../components/utilities/PaypalPayement';
import { WithNotification } from '../components/utilities/WithNotification';
import { book } from '../model/book';
import { AuthContext } from '../providers/Provider';
import PaymentService from '../service/PaymentService';
import Utils from '../utils/Utils';

export interface PayementState {
    mode: string;
    message: string | null;
    typeNotif: number;
}
class Payment extends Component<any, PayementState> {

    static contextType = AuthContext;

    state = {
        mode: "card",
        message : null,
        typeNotif : Utils.ERROR_MESSAGE
    }

    runPayment = () => {
        this.setState({typeNotif: Utils.SUCCESS_MESSAGE, message: "Le paiement n'est pas encore effectif pour le moment."});
    }

    simulPayment = () => {
        const data = this.props.location.params;
        const items = data.items as Array<book>;
        let totalTTC = items.reduce((a, b) => a + b.price, 0);
        let tva = totalTTC * 0.55;
        let totalHT = totalTTC - tva;

        PaymentService.simulPayment(this.context.currentUser.email, totalHT, tva, totalTTC)
            .then(resp => {
                if(resp.status === 201){
                    this.setState({message: "Le paiement s'est effectué avec succès!", typeNotif: Utils.SUCCESS_MESSAGE})
                }
            })
            .catch(() =>  this.setState({message: "Une erreur s'est produit lors du paiement!", typeNotif: Utils.ERROR_MESSAGE}))
    }

    componentDidMount(){
        this.setState({typeNotif: Utils.ERROR_MESSAGE, message: null});
    }
    render() {

        const data = this.props.location.params;
        const items = data.items as Array<book>;
        const change = data.change as Array<book>;

        let totalHT = 0;
        let totalTTC = 0;
        let tva = 0;

        totalTTC = items.reduce((a, b) => a + b.price, 0);
        tva = totalTTC * 0.55;
        totalHT = totalTTC - tva;
        const itemsBalises = items.map((book: book) => (
            <li className="list-group-item" key={book.id}>
                <div className="row">
                    <img
                        className="col-2"
                        style={{ maxHeight: "80px" }}
                        src={Utils.getIllustration(book.illustration)}
                        alt="première de couverture"
                    />
                    <div className="offset-4 col-5 text-right">
                        <b>{book.title}</b>
                        <br />
                        <b className="text-danger">
                            {book.price} {change}
                        </b>
                    </div>
                </div>
            </li>
        ));
        return (
            <WithNotification message={this.state.message} type={this.state.typeNotif}>
                <Menu />
                <div className="container">
                    <h3 className="text-center">Paiement</h3>
                    <div className="text-center">
                        <ul>
                            {itemsBalises}
                        </ul>
                    </div>
                    <div className="offset-9 card">
                        <div className="card-body ml-4">
                            <span className="row">Total HT: <b>{totalHT}{change}</b></span>
                            <span className="row">TVA 5,5%: <b>{tva}{change}</b></span>
                            <span className="row">Total TTC : <b>{totalTTC}{change}</b></span>
                        </div>
                    </div>
                    <div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio1"
                                value="card"
                                onClick={() => this.setState({ mode: "card" })} />
                            <label className="form-check-label" htmlFor="inlineRadio1">carte bancaire</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio2"
                                value="paypal"
                                onClick={() => this.setState({ mode: "paypal" })} />
                            <label className="form-check-label" htmlFor="inlineRadio2">Paypal</label>
                        </div>
                    </div>
                    <div className="card mt-3">
                        <div className="card-body">
                            {this.state.mode==="card" ? <CardPayment/> : <PaypalPayement/>}
                        </div>
                    </div>
                    <button className="btn btn-primary mt-2" onClick={this.runPayment}>effectuer le paiement</button>
                    <button className="btn btn-primary mt-2 ml-1" onClick={this.simulPayment}>Simuler un paiement</button>
                </div>
            </WithNotification>
        );
    }
}

export default withRouter(Payment);