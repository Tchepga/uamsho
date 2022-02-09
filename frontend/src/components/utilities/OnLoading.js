import React from 'react'
import { Spinner } from 'react-bootstrap'

export const OnLoading = () => {
    return (
        <div className="d-flex justify-content-center" style={{width: "100%", height:"100%", paddingTop:"20%"}}>
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="secondary" />
            <Spinner animation="grow" variant="success" />
            <Spinner animation="grow" variant="danger" />
            <Spinner animation="grow" variant="warning" />
            <Spinner animation="grow" variant="info" />
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="dark" />
        </div>
    )
}
