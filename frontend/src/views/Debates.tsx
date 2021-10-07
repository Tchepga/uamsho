import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import Menu from '../components/menu/Menu';
import debate from '../model/debate';
import DebateService from '../service/DebateService';
import Utils from '../utils/Utils';

export interface DebatesState {
    debates: Array<debate>;
    number_page: number;
}

class Debates extends Component<any, DebatesState> {

    state = {
        debates: [] as Array<debate>,
        number_page: 0
    }

    async componentDidMount() {
        this.getAllDebates();
    }

    getAllDebates() {
        DebateService.getAllDebates().then(resp => {
            this.setState({ debates: resp.debates, number_page: resp.number_page });
        })
    }

    render() {

        let debatesBalises: {} | null | undefined = [];
        if (this.state.debates.length > 0) {
            debatesBalises = this.state.debates.map(debate =>
                <div 
                    className="row card mb-2 cursor-pointer" 
                    key={debate.id}
                    onClick={() => this.props.history.push("/debates/" + debate.id)}>
                    {(debate.illustration !== undefined) && (
                        <img 
                            src={Utils.getIllustration(debate.illustration)} 
                            className="card-img-top" 
                            alt="no-found"
                            style={{height: "300px"}} />)
                    }
                    <div className="card-body">
                        <h2 className="card-title row-cols-12 text-center"><b>{debate.subject}</b></h2>
                        <p className="card-text">
                            <small className="text-muted">En savoir plus.</small>
                        </p>
                    </div>
                </div>
            )
        } else {

            debatesBalises = <span>Aucun debât présent pour le moment</span>
        }

        return (
            <Fragment>
                <Menu />
                <div className="container">
                <span
                  className="d-flex flex-row bg-light text-dark  mb-2"
                  style={{ marginLeft: "-5px" }}
                >
                  <p className="mr-auto px-2 pt-3">Débats</p>
                  <span className="p-3">
                    {" "}
                    il y a {this.state.debates.length} débats ouverts |
                  </span>
                  <select
                    className="form-select "
                    aria-label="Type filter"
                    onChange={() => console.log("onChange")}
                  >
                    <option defaultValue="true">Par pertinence</option>
                    <option value="CHAR">Par ordre alphabétique</option>
                    <option value="PRICE">Par prix décroissant</option>
                  </select>
                </span>
                    {debatesBalises}
                </div>
            </Fragment>
        );
    }
}

export default withRouter(Debates);