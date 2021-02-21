import React, { Component, Fragment } from 'react'
import Menu from '../components/menu/Menu'

export default class DetailsBook extends Component {
    render() {
        return (
            <div>
                <Fragment>
                    <Menu/>
                    <div className="container">
                        <div className="row">
                        <img src="img/open-book-clipart-03.png" className="col-3" alt="..." />
                        <div>
                            <h1> Titre du livre</h1>
                        </div>
                        </div>

                    </div>
                </Fragment>
            </div>
        )
    }
}
