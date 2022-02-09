import React, { Component, Fragment } from 'react';
import Footer from '../components/footer/Footer';
import Menu from '../components/menu/Menu';
import Card from '../components/utilities/Card';
import SidebarComments from '../components/utilities/SidebarComments';
import debate from '../model/debate';
import DebateService from '../service/DebateService';
import Utils from '../utils/Utils';

export interface DetailsDebateState {
    debate: debate;
    similarDebates: debate[];
    showComment: boolean;
}
class DetailsDebate extends Component<any, DetailsDebateState> {

    state = {
        debate: {} as debate,
        similarDebates: [] as debate[],
        showComment: false
    }

    addComment = (content: string): void => {

        const context = this.context

        if (Utils.isNotNullObject(context.currentUser)) {
            DebateService.addComment(content, context.currentUser.email, this.state.debate.id)
        } else {
            alert("Vous devez êtes connecté pour ajouter un commentaire");
        }
    }


    showComment = () => {
        this.setState({ showComment: !this.state.showComment })
    }


    async componentDidMount() {
        DebateService.getDebate(this.props.match.params.id).then(data => this.setState({ debate: data }));

        let debates: debate[] = [];
        DebateService.getSimilardebate(this.props.match.params.id).then(data => {

            this.setState({ similarDebates: debates });
        });
    }

    render() {
        let similarDebateBalises: {} | null | undefined = [];
        //similar books
        const similarDebates = this.state.similarDebates;
        if (similarDebates !== undefined && similarDebates.length !== 0) {
            console.log('similarDebates :>> ', similarDebates);
            similarDebateBalises = similarDebates.map((debate: debate) => (
                <a
                    href={`/debates/${debate.id}`}
                    className="col-3 px-0 my-2"
                    key={debate.id}
                >
                    <Card debate={debate} />
                </a>
            ))
        }
        return (
            <Fragment>
                <Menu />
                <div className="container">
                    <div className="row mb-2 cursor-pointer" >
                        {(this.state.debate.illustration !== undefined) && (
                            <img
                                src={Utils.getIllustration(this.state.debate.illustration)}
                                className="card-img-top"
                                alt="no-found"
                                style={{ maxHeight: "400px" }} />)
                        }
                        <div className="card-body">
                            <h2 className="card-title row-cols-12 text-center"><b>{this.state.debate.subject}</b></h2>
                            <p> {this.state.debate.content} </p>
                            {this.state.debate.lien_debate !== undefined &&
                                (<span> Lien de réunion : <a href={this.state.debate.lien_debate}> cliquez ici </a>
                                    De {this.state.debate.date_debut_reunion} à {this.state.debate.date_fin_reunion}</span>)}
                        </div>

                    </div>
                    <button
                        className="btn btn-dark mr-3 ml-3 mb-2"
                        onClick={() => this.setState({ showComment: !this.state.showComment })}>
                        Commentaires
                    </button>
                    <div className="row">
                        {similarDebateBalises}
                    </div>
                </div>
                <SidebarComments
                    debate={this.state.debate}
                    visible={this.state.showComment}
                    show={this.showComment}
                    add={this.addComment}
                    delete={DebateService.deleteComment} />
                <Footer />
            </Fragment >
        );
    }
}

export default DetailsDebate;