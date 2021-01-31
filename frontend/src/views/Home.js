import React, { Component, Fragment } from 'react'
import Menu from '../components/menu/Menu'
import Carousel from '../components/carousel/Carousel'
import './Home.css'
import OnTop from '../components/ontop/OnTop'

export default class Home extends Component {
    render() {
        return (
            <Fragment>
                <Menu />
                <Carousel />
                <OnTop />
            </Fragment>
        )
    }
}
