import React, { Component } from 'react';
import { book } from '../../model/book';
import debate from '../../model/debate';
import { like } from '../../model/like';
import LikeService from '../../service/LikeService';
import Utils from '../../utils/Utils';

export interface CardProps {
    book?: book;
    debate?: debate;
    addClass: string;
}

export interface CardState {
    likes: Array<like> | null;
}

class Card extends Component<CardProps, CardState> {

    state = {
        likes: [] as Array<like>
    }
    static defaultProps: { addClass: string; };

    componentDidMount() {
        let id = 0;
        const { debate, book } = this.props;
        if (debate !== undefined)
            id = debate.id;
        if (book !== undefined)
            id = book.id;

        LikeService.retrieve(id).then(data => this.setState({ likes: data }));
    }

    render() {
        const { book, debate } = this.props;
        let likesNode = [];
        const nbreStars = Math.ceil(this.state.likes.length / 10);

        if (Utils.isNotNullObject(this.state.likes)) {
            for (let j = 0; j < nbreStars; j++) {
                likesNode.push(<i className="fas fa-star mr-1 text-danger" key={j} ></i>);
            }

            for (let j = 0; j < 5-nbreStars ; j++) {
                likesNode.push(<i className="far fa-star mr-1" key={j+5}></i>);
            }
        }

        if (book !== undefined) {
            return (
                <div className={"card mx-2 mb-2" + (this.props.addClass)}
                    style={{ boxShadow: "0px 0px 2px black" , minHeight: "20rem"}} >
                    <img src={Utils.getIllustration(book.illustration)} className="card-img-top" alt="..." style={{ height: "150px", width: "100%" }} />
                    <div className="card-body" >
                        <h6 className="card-title text-center mt-1"><b>{book.title}</b></h6>

                        <div className="row text-center"><span className="col-12">{likesNode}</span></div>
                        <div className="row text-center"><span className="col-12">{book.author}</span></div>
                        <div className="row text-center" style={{ fontSize: "20px" }}><b className="col-12">{book.price} €</b></div>

                    </div>
                </div>
            );
        } else if (debate !== undefined) {
            return (
                <div className={"card mx-2 mb-2" + (this.props.addClass)}
                    style={{ boxShadow: "0px 0px 2px black" }} >
                    <img src={Utils.getIllustration(debate.illustration)} className="card-img-top" alt="..." style={{ height: "150px", width: "100%" }} />
                    <div className="card-body" >
                        <h6 className="card-title text-center mt-1"><b>{debate.subject}</b></h6>

                        <div className="row text-center"><span className="col-12">{likesNode}</span></div>
                        <div className="row text-center"><span className="col-12">{debate.author}</span></div>

                    </div>
                </div>
            );
        } else {
            return (<h3 className="alert-warning">Un problème 'est subvenue lors de l'affichage de ce livre. Veuillez contacter l'administrateur</h3>)
        }
    }
}


Card.defaultProps = {
    addClass: ''
}
export default Card;