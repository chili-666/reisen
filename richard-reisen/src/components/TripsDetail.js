import React from "react";
import {useParams} from "react-router-dom";
import Strapi from "strapi-sdk-javascript/build/main"
import {withRouter} from "react-router"
import DetailHeroCarousel from "./DetailCompononents/DetailHeroCarousel"
import DetailStoerer from "./DetailCompononents/DetailStoerer"
import DetailServices from "./DetailCompononents/DetailServices"
import ItineraryCard from "./DetailCompononents/ItineraryCard"
import {Markdown} from"react-showdown"
import ReactMarkdown from "react-markdown"

    const apiUrl= 'http://home.luis-backt-und-kocht.de:1337';
    //const apiUrl = `${process.env.REACT_APP_BACKEND_URL}`
    const strapi = new Strapi(apiUrl)
  
class TripsDetail extends React.Component {
        constructor() {
            super()
            this.state= {
            trip:[],
            loading: true
            }
        }
    
       async componentDidMount() {
    try{
        const response = await strapi.request('POST', '/graphql', {
          data: {
            query: `query { trip (id: "${this.props.match.params.tripId}") {
                title
                id
  trip_dates {
    id
    departure
    return
  }
  short_description
  long_description
  pics {
    url
  }
  priceAdult
  priceReduced
  itinerary {
      title
      description
      id
  }
  services {
      serviceName
      id
  }
  LangesTExtfeld
}}`
          }

        });
        //console.log("responseDdtail",response.data.trip.pics[0])
        this.setState({ 
          trip: response.data.trip,
          loading: false})
    } catch(err) {
      console.error(err) };
    }
  
    render() {
        console.log("Bilder für Carousel", this.state.trip.pics)
        var longMarkdown = this.state.trip.long_description;
        this.state.loading ? console.log("DetailState loading") : console.log("DetailState", this.state.trip)

        var itinerary = this.state.loading ? null : this.state.trip.itinerary.map(day => (
            <ItineraryCard key={day.id} title={day.title} description={day.description}/>
        ))
        
        var heroPic = this.state.loading ? null : this.state.trip.pics.map(pic => (
            console.log("TripPic", pic.url ),
            pic.url
            ));
        console.log("HEroPic", heroPic)    
        var heroSlider = this.state.loading ? "Loading" : <DetailHeroCarousel images={heroPic}/>
        return ( 
            <div className="shadow">
        <div className="hero has-background-white is-small "> 
        
        <div className="hero-body">
        {heroSlider}
        </div>
        <div className="container is-fluid has-background-white">
        <div className="bordered rounded needs-margin-bottom">
        <h1 className="

        
                is-size-1 
                has-text-black
               
                has-text-left 
                is-padded-10">
                <strong>{this.state.trip.title}</strong></h1>
           
                
                </div>
        
        

           
        <DetailStoerer />
        <div className="columns">
            <div className="column is-two-thirds has-text-justified">
                <ReactMarkdown source={ longMarkdown } escapeHtml={ false } />
                </div>
            <div className="column is-one-thirds">
                    {this.state.loading ? null : <DetailServices services={this.state.trip.services} priceAdult={this.state.trip.priceAdult} priceRed={this.state.trip.priceReduced} all={this.state.trip}/>}
            </div>
        </div>
        <div  className="section"><h1 className="is-size-3">Ihr Reiseablauf</h1></div>
        <div className="columns is-multiline">
       {itinerary}
         
    
            </div>
            </div>
            </div>
            </div>
            )  
    }
            
}

export default withRouter(TripsDetail)