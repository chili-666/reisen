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

    const apiUrl= 'https://strapi.luis-backt-und-kocht.de';
    //const apiUrl = `${process.env.REACT_APP_BACKEND_URL}`
    const strapi = new Strapi(apiUrl)
  
class TripsDetail extends React.Component {
        constructor(props) {
            super(props)
            this.state= {
            trip:[],
            loading: true,
            trip_id: ""
            }
        }
    
       async componentDidMount(props) {
    try{
        /*const response = await strapi.request('POST', '/graphql', {
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

        });*/
        //console.log("responseDdtail",response.data.trip.pics[0])
        const response = await fetch(`https://strapi.luis-backt-und-kocht.de/trips/${this.props.match.params.tripId}`)
       .then ((response) => response.json())
        console.log("TripDEtail", response)
        this.setState({ 
          trip: response,
          loading: false,
        trip_id: this.props.match.params.tripId})
    } catch(err) {
      console.error(err) };
    }
  
    handleClose(event) {
    
      document.getElementById(event.target.id).classList.toggle("is-active")
    }

    render() {
        
        var longMarkdown = this.state.trip.long_description;
       // this.state.loading ? console.log("DetailState loading") : console.log("DetailState", this.state.trip)

        var itinerary = this.state.loading ? null : this.state.trip.itinerary.map(day => (
            <ItineraryCard key={day.id} title={day.title} description={day.description} pics={day.itineraryPics}/>
        ))
        
        var heroPic = this.state.loading ? null : this.state.trip.pics.map(pic => (
        //    console.log("TripPic", pic.url, ),
            pic.url
            ));
        var tripPic = this.state.loading ? null : this.state.trip.pics.map(pic => (
        //  console.log("TripPic", pic.url ),
          <li>
            <div class="modal is-clipped" id={pic.id}>
                      <div class="modal-background"></div>
                      <div class="modal-content">
                      <img src={`${apiUrl}${pic.url}`} />
                      </div>
                      <button class="modal-close is-large" aria-label="close" onClick={this.handleClose} id={pic.id}></button>
                   </div>
                   <a href="#"><img className="" src={`${apiUrl}${pic.url}`} onClick={this.handleClose} id={pic.id} /></a> 
            </li>
           ));
      //  console.log("HEroPic", heroPic)    
        var heroSlider = this.state.loading ? "Loading" : <DetailHeroCarousel images={heroPic}/>
        return ( 
            <div className="shadow">
        <div className="hero has-background-white is-small "> 
        
        <div className="hero-body">
        {heroSlider}
        </div>
        <div className="container is-fluid" style={{paddingBottom:"2em"}}>
        <div className="rounded needs-margin-bottom">
        <h1 className="

                has-text-centered 
                is-size-1 
                has-text-black
               
                has-text-left 
                is-padded-10">
                <strong>{this.state.trip.title}</strong></h1>
           
                
                </div>
        
        

           
        <DetailStoerer />
        <div className="columns">
            <div className="column is-two-thirds has-text-justified">
              <div className="columns">
                <div className="column is-three-quarters">
                <ReactMarkdown source={ longMarkdown } escapeHtml={ false } />
                </div>
                <div className="column">
                  <ul>
                    {tripPic}
                  </ul>
                </div>
                </div>

                </div>
            <div className="column is-one-thirds">
                    {this.state.loading ? null : <DetailServices services={this.state.trip.services} priceAdult={this.state.trip.priceAdult} priceRed={this.state.trip.priceReduced} all={this.state.trip} tripId={this.state.trip_id}/>}
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