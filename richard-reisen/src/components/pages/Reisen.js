import React from "react"
import Strapi from "strapi-sdk-javascript/build/main"
import FilterTrips from "../FilterTrips";
import TripsDetail from "../TripsDetail"
import TripCard from "../TripCard";
import Cookie from "js-cookie";
import {setCart, getCart, getToken } from "../utils";

const apiUrl= 'https://strapi.luis-backt-und-kocht.de';
//const apiUrl = `${process.env.REACT_APP_BACKEND_URL}`
const strapi = new Strapi(apiUrl);
//console.log("URL", apiUrl)
//console.log("strapi", strapi+'/graphql'

class Reisen extends React.Component {

    constructor(props) {
        super(props)
    
        this.state = {
          trips : [],
          loading: true,
          token: "",
          cart: [],
          filter: 0,
          filteredTrips: [],
          filtered: false
        }
        this.handler = this.handler.bind(this)
      }
    
     
    
      async componentDidMount() {
        try{
            /*const response = await strapi.request('POST', '/graphql', {
              data: {
                query: `query { trips {
                    title
                    id
      trip_dates {
        departure
        return
      }
      short_description
      long_description
      pics {
        name
        url
      }
      priceAdult
      priceReduced
      flags {
          flagName
          id
      }
      length
    }}`
              }
    
            });*/
        var request = new XMLHttpRequest()
        const response = await fetch('https://strapi.luis-backt-und-kocht.de/trips')
         .then ((response) => response.json())
         console.log("response", response)
            this.setState({ 
              trips: response,
              loading: false,
            token: Cookie.get('jwt'),
          cart: getCart('cart')})
        } catch(err) {
          console.error(err) };
    
        }
      
      async handler(val) {
        await this.setState({
          filter: val,
          filtered: true,
          filteredTrips: []
        })
       let filtering
        let filterTrips = []
        if (this.state.loading != true) {
          if (this.state.filter > 0 ) {
          for (let i = 0; i < this.state.trips.length; i++) {
            for (let x = 0; x < this.state.trips[i].flags.length; x++ ) {
              
              if (this.state.trips[i].flags[x].id === this.state.filter) {
               filtering = this.state.trips[i] 
               filterTrips.push(filtering)
              
              }
            }
          
            }
            
            
            
          }
        }
        this.setState({
          filteredTrips: filterTrips})
      }
       
    
    render(){
        const filterTrips = this.state.loading ? "Loading" : <FilterTrips count={this.state.trips.length} handler = {this.handler}/>
        let tripCards
        if (this.state.filter === 0) {
        tripCards = this.state.loading ? "Loading..." : this.state.trips.map(trip => (
          <TripCard 
                key={trip.id}
                title={trip.title} 
                name={trip.tripName}
                hero={`${apiUrl}${trip.pics[0].url}`} 
            //    hero={`https://strapi.luis.backt-und-kocht.de/${trip.pics[0].url}`
                desc={trip.short_description} 
                length={trip.length} 
                departure={trip.trip_dates[0].departure} 
                return={trip.trip_dates[0].return}
                id={trip.id}
                flag={trip.flags}
                seats={trip.seats}/>
        ))
        console.log("OHNE FILTER")
        } else {
          if (this.state.filter != 0) {
            
          tripCards = this.state.loading ? "Loading..." : this.state.filteredTrips.map(trip => (
            <TripCard 
                  key={trip.id}
                  title={trip.title} 
                  name={trip.tripName}
                  hero={`${apiUrl}${trip.pics[0].url}`} 
              //    hero={`https://strapi.luis.backt-und-kocht.de/${trip.pics[0].url}`
                  desc={trip.short_description} 
                  length={trip.length} 
                  departure={trip.trip_dates[0].departure} 
                  return={trip.trip_dates[0].return}
                  id={trip.id}
                  flag={trip.flags}
                  seats={trip.seats}/>
                  
          ))
          }
        } 
    return(  
        <div className="container is-fluid" style={{paddingTop:"2em"}}>
    {filterTrips}
    <div className="box has-background-white">
    
    <div className="columns is-multiline">
    
    {this.state.loading ? "LÄDT": tripCards}
     
       </div>
       </div>
       </div>
       )
      
    }
}

export default Reisen