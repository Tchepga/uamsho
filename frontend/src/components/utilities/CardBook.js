import React, { Component } from 'react';

class cardBook extends Component {
   
    render() {

        let likesNode = []
        for (let j = 0; j < this.props.likes; j++) {
            likesNode.push(<i className="fas fa-heart mr-1" key={j}></i>)
        }
        return (
            <div className="card mx-2 mb-3" style={{"width": "90%"}} >
                <img src="img/open-book-clipart-03.png" className="card-img-top" alt="..." />
                <div className="card-body">
                    <h6 className="card-title">{likesNode}</h6>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item text-center">{this.props.title}</li>
                        <li className="list-group-item text-center">{this.props.author}</li>
                        <li className="list-group-item text-center">{this.props.price}</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default cardBook;