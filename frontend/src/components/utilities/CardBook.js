import React, { Component } from 'react';
import Utils from '../../utils/Utils';
class CardBook extends Component {

    render() {
        const book = this.props.book;
        if (book != null) {
            let likesNode = [];

            if (Utils.isNotNullObject(book.likes)) {
                for (let j = 0; j < book.likes.length; j++) {
                    likesNode.push(<i className="fas fa-heart mr-1" key={j}></i>);
                }
            } else {
                for (let j = 0; j < 5; j++) {
                    likesNode.push(<i className="far fa-heart mr-1" key={j}></i>);
                }
            }
            return (
                <div className={"card mx-2 mb-2" + (this.props.addClass)}
                    style={{ boxShadow: "0px 0px 2px black" }} >
                    <img src={Utils.getIllustration(book.illustration)} className="card-img-top" alt="..." style={{ height: "150px", width: "100%" }} />
                    <div className="card-body" >
                        <h6 className="card-title text-center mt-1"><b>{book.title}</b></h6>

                        <div className="row text-center"><span className="col-12">{likesNode}</span></div>
                        <div className="row text-center"><span className="col-12">{book.author}</span></div>
                        <div className="row text-center" style={{ fontSize: "20px" }}><b className="col-12">{book.price} €</b></div>

                    </div>
                </div>
            );
        } else {
            return (<h3 className="alert-warning">Un problème 'est subvenue lors de l'affichage de ce livre. Veuillez contacter l'administrateur</h3>)
        }
    }
}


CardBook.defaultProps = {
    addClass: ''
}
export default CardBook;