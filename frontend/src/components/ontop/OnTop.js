import React, { Component } from 'react'
import './OnTop.css'
import '../../scss/custom.css'

export default class OnTop extends Component {
    render() {
        return (
            <div id="ontop" className="container">
                <nav>
                    <ul className="nav nav-tabs mb-3" role="tablist">
                        <li className="nav-item" role="presentation">
                            <a className="nav-link active" id="nav-new-tab" aria-current="page" href="#nav-new" role="tab">A la une</a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a className="nav-link" href="#nav-selection" id="nav-selection-tab" role="tab">La sélection</a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a className="nav-link" id="nav-debat-tab" href="#nav-debat" role="tab">Débâts en cours</a>
                        </li>
                    </ul>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-new" role="tabpanel" aria-labelledby="nav-new-tab"><p>Consequat occaecat ullamco amet non eiusmod nostrud dolore irure incididunt est duis anim sunt officia. Fugiat velit proident aliquip nisi incididunt nostrud exercitation proident est nisi. Irure magna elit commodo anim ex veniam culpa eiusmod id nostrud sit cupidatat in veniam ad. Eiusmod consequat eu adipisicing minim anim aliquip cupidatat culpa excepteur quis. Occaecat sit eu exercitation irure Lorem incididunt nostrud.</p></div>
                    <div className="tab-pane fade" id="nav-selection" role="tabpanel" aria-labelledby="nav-selection-tab"><p>Test2</p></div>
                    <div className="tab-pane fade" id="nav-debat" role="tabpanel" aria-labelledby="nav-debat-tab"><p>Test3</p></div>
                </div>
            </div>
        )
    }
}
