import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
const apiUrl= 'https://strapi.luis-backt-und-kocht.de';

class DetailHeroCarousel extends React.Component{
    state = {
        loading:true
    }
  

    componentDidMount(){
         this.setState({
             loading:false
         })
  
    }

    render() {
         var carouselItem = this.props.images.map(image =>(
        <div>
                    <img src={`${apiUrl}${image}`} />
                </div>
          ));
        return (

             <div className="carouselContainer">
            <Carousel className="carouselHeight" useKeyboardArrows autoPlay infiniteLoop showThumbs={false}>
                {carouselItem}
            </Carousel>
             </div>
        );
        }
}
 
export default DetailHeroCarousel
 