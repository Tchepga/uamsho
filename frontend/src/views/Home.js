import React, { Component, Fragment } from 'react'
import Menu from '../components/menu/Menu'
import Carousel from '../components/carousel/Carousel'
import './Home.css'
import OnTop from '../components/ontop/OnTop'

export default class Home extends Component {
    render() {
        return (
            <div id="home">
                <Menu />
                <Carousel />
                <OnTop />
                <div id="services" className="row" >
                    <div className="col-3 text-center">
                        <div className="mt-5">
                            <i className="fas fa-truck fa-2x mt-4"></i>
                        </div>
                    </div>
                    <i className="col-3 fas fa-exchange-alt fa-2x text-center mt-5"></i>

                </div>
            </div>
        )
    }
}
