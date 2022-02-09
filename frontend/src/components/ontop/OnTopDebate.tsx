import axios from 'axios';
import { Component } from 'react';
import debate  from '../../model/debate';
import Utils from '../../utils/Utils';
import "./OnTopDebate.css"
export interface OntopState {
    debates: Array<debate>
}
class OnTopDebate extends Component<any, OntopState> {

    state = {} as OntopState;

    componentDidMount() {
        axios
            .get(process.env.REACT_APP_API_URL + "/api/debate/ontop")
            .then((response) => {
                this.setState({ debates: response.data as Array<debate> });
            })
            .catch((error) => console.error(error));
    }

    render() {
        let debatesBalises = [];

        if (this.state.debates === undefined) {
            debatesBalises.push(
                <div className="spinner-border text-primary" role="status" key={1}>
                    <span className="visually-hidden">Loading...</span>
                </div>
            );
        } else {
            debatesBalises = this.state.debates.map((debate: debate, index: number) => (
                <div className={"carousel-item" + (index === 0 ? " active" : "")} key={index} >
                    <div className="row">
                        {debate.illustration !== null && <img
                            className="col-3 mr-2"
                            src={Utils.getIllustration(debate.illustration)}
                            alt="not-found-illustration"
                        />}
                        <div className="col-8 mb-5">
                            <h2>
                                <b>{debate.subject}</b>
                            </h2>
                            <h6 className="card-title mt-3">"likesNode"- not implement</h6>
                            <h4>description:</h4>
                            <p>
                                {debate.content}
                            </p>
                            {debate.lien_debate !== null && 
                                (<div>Lien réunion : {debate.lien_debate} De {debate.date_debut_reunion} à {debate.date_fin_reunion} </div>)}
                            <div className="row">
                                <span className="badge bg-primary ml-3 mt-2">date de création : {debate.date_creation}</span>
                            </div>
                            <div className="row mt-3 mb-2">
                                <span className="badge bg-info ml-3">Auteur : {debate.author.first_name} {debate.author.last_name}</span>
                            </div>
                            <button className="btn btn-dark">
                                commenter
                            </button>
                            <button className="btn btn-dark mr-3 ml-3">
                                <i className="fas fa-heart"></i>
                            </button>
                            <button className="btn btn-dark mr-3 ml-3">
                                Donner son avis
                            </button>
                        </div>
                    </div>
                </div>));
        }
        return (
            <div id="ontop-debate" className="p-5">
                <div className="container carousel slide py-4 default-color" data-ride="carousel">
                    <div className="carousel-inner">
                        {debatesBalises}
                    </div>
                </div>
            </div >
        );
    }
}

export default OnTopDebate;