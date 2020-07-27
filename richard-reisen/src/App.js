import React from "react";
import "./App.sass";
import "./styles.css";
import Strapi from "strapi-sdk-javascript/build/main"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Cookie from "js-cookie";




import {setCart, getCart, getToken } from "./components/utils";
import {AuthNav, UnAuthNav} from "./components/NavBar";
import NavBar from "./components/NavBar_OLD";
import TripCard from "./components/TripCard";
import Hero from "./components/Hero";
import Pagination from "./components/Pagination";
import FilterTrips from "./components/FilterTrips";
import { FaTrophy } from "react-icons/fa";
import TripsDetail from "./components/TripsDetail"
import Reisen from "./components/pages/Reisen"
import Offers from "./components/pages/Offers"
import Buchung from "./components/pages/Buchung"
import Kontakt from "./components/pages/Kontakt"
import LastMinute from "./components/pages/LastMinute";
import ShoppingCart from "./components/cart/ShoppingCart"
import AuthPage from './components/containers/AuthPage';
import ConnectPage from './components/containers/ConnectPage';
import HomePage from './components/containers/HomePage';
import NotFoundPage from './components/containers/NotFoundPage';
import PrivateRoute from './components/containers/PrivateRoute';
import MeinKonto from './components/MeinKonto';
import Register from './components/cart/Register'
import SignUpIn from './components/cart/SignUpIN'
import AccountAdress from "./components/account/AccountAdress"
import BookingOverview from "./components/booking/BookingOverview"
import BookingsView from "./components/booking/BookingsView";
import Payment from "./components/booking/Payment"
import Footer from "./components/Footer"
import BookingComplete from "./components/booking/BookingComplete"
//import MeinKonto from "./components/MeinKonto"


const apiUrl= 'https://strapi.luis-backt-und-kocht.de';
//const apiUrl = `${process.env.REACT_APP_BACKEND_URL}`
const strapi = new Strapi(apiUrl);
//console.log("URL", apiUrl)
//console.log("strapi", strapi+'/graphql')


class App extends React.Component{
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
    //  console.log("response", response)
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
   
  

  render() {

    let heroPics = []
    let tripCards
    if (this.state.filter === 0) {
    tripCards = this.state.loading ? "Loading..." : this.state.trips.map(trip => (
      heroPics.push(trip.pics[0]),
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
        heroPics.push(trip.pics[0]),
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
    console.log("HEROPICS", heroPics)
    const filterTrips = this.state.loading ? "Loading" : <FilterTrips count={this.state.trips.length} handler = {this.handler}/>
          return (
            
            <Router>  
            
            <div className="App">
             
            <NavBar />
            
            <Switch>
            
                <Route path="/reisen/:tripId" >
                <div className="container has-background-danger">
                    <TripsDetail />
                </div>    
                </Route>
                <Route path="/buchung-erstellt" component={ BookingComplete } />
                <Route path="/zahlung" component={ Payment } />
                <Route path="/shopping-cart" component={ ShoppingCart } />
                <Route path="/mein-konto" component={MeinKonto} />  
                <Route path="/register" component={ SignUpIn } />
                 <Route exact path="/reisen" >
                <div className="container is-fluid">
                    <Reisen />
                </div>    
                </Route>
                   <Route exact path="/angebote" >
                <div className="container is-fluid">
                    <Offers />
                </div>    
                </Route>
               <Route path="/last-minute" >
                <div className="container is-fluid">
                    <LastMinute />
                </div>    
                </Route>
                   <Route exact path="/informationen/buchung" >
                <div className="container is-fluid">
                    <Buchung />
                </div>    
                </Route>
                <Route exact path="/meine-buchung" >
                <div className="container is-fluid">
                    <BookingOverview />
                </div>   
                </Route>
               <Route exact path="/" > 
               {this.state.loading ? null : <Hero pics={heroPics}/>}
              <br />
              <div className="container is-fluid" style={{paddingBottom:"2em"}}>
                {filterTrips}
                <div className="columns is-multiline">
                {this.state.loading ? "LÄDT": tripCards}
                 
                   </div>
               
                </div>
                
                
                </Route>
                
               </Switch>
               
            </div>
            <Footer />
            </Router>
          );
  }
}

export default App