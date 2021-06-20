import React, { Component } from 'react'

import axios from 'axios';

export default class Carousel extends Component {

    state = {
        images: []
      }
      transformArrayToMap(array) {
        let map = [];
        for(let i=0; i<array.length; i++){
            map.push({i : array[i]})
        }
        return map;
    }

      activeCarousel(index) {
          if(index === 0)
            return 'carousel-item active';
          else
             return 'carousel-item';
      }
        

      getImageCarousel() {
        axios.get(process.env.REACT_APP_API_URL+ '/api/utils/images/carousel')
          .then(res => { 
            this.setState({ images: res.data });
          })
          .catch(error => console.log(error))
      }
      async componentDidMount() {
         this.getImageCarousel();
      }

    render() {
        const carouselHeader = {
            marginTop : '-200px', 
            zIndex : '-10'
          }
        return (
            <div id="carouselControls" className="carousel slide" data-ride="carousel" style={carouselHeader}>
                <div className="carousel-inner">
                  {
                    this.state.images.length > 0 ? (
                      this.state.images.map((image, index) =>(
                        <div key={index} className={this.activeCarousel(index)}>
                          <img 
                              src={process.env.REACT_APP_API_URL + image} 
                              className="d-block w-100" alt="no-found" 
                              style={{maxHeight: "800px", width: "auto", objectFit : "contain"}}/>
                        </div>
                      ))
                    ) : (
                      <div className="carousel-item active">
                        <img 
                            src="image-not-found-scaled.png" 
                            className="d-block w-100" alt="no-found" 
                            style={{maxHeight: "800px", width: "auto", objectFit : "contain"}}/>
                      </div>
                    )
                  }
                </div>
                <a className="carousel-control-prev" href="#carouselControls" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselControls" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        )
    }
}
