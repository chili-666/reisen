import React from "react";
import "./App.sass";
import "./styles.css";
import Strapi from "strapi-sdk-javascript/build/main"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"





import NavBar from "./components/NavBar";
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
import LastMinute from "./components/pages/LastMinute"
import ShoppingCart from "./components/cart/ShoppingCart"
import AuthPage from './components/containers/AuthPage';
import ConnectPage from './components/containers/ConnectPage';
import HomePage from './components/containers/HomePage';
import NotFoundPage from './components/containers/NotFoundPage';
import PrivateRoute from './components/containers/PrivateRoute';

const apiUrl= 'https://strapi.luis-backt-und-kocht.de';
//const apiUrl = `${process.env.REACT_APP_BACKEND_URL}`
const strapi = new Strapi(apiUrl);
console.log("URL", apiUrl)
console.log("strapi", strapi+'/graphql')


class App extends React.Component{
  state = {
    trips : [],
    loading: true
  }

  async componentDidMount() {
    try{
        const response = await strapi.request('POST', '/graphql', {
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

        });
        console.log("response",response.data)
        this.setState({ 
          trips: response.data.trips,
          loading: false})
    } catch(err) {
      console.error(err) };
    }
  

  render() {
    console.log("State", this.state.trips)
    //const firstTrip = this.state.loading ? "Loading..." : this.state.trips[0].title;
    //const firstPic = this.state.loading ? "Loading..." : this.state.trips[0].short_description;
    //console.log("Short", firstPic)
    const tripCards = this.stateloading ? "Loading..." : this.state.trips.map(trip => (
      <TripCard 
            key={trip.id}
            title={trip.title} 
            hero={`${apiUrl}${trip.pics[0].url}`} 
            desc={trip.short_description} 
            length={trip.length} 
            departure={trip.trip_dates} 
            return={trip.trip_dates[0].return}
            id={trip.id}
            flag={trip.flags}/>
    ))

    const filterTrips = this.stateloading ? "Loading" : <FilterTrips count={this.state.trips.length}/>
          return (
            <Router>  
            <div className="App">
              <NavBar />
            
            <Switch>
            <PrivateRoute path="/user" component={HomePage} exact />
            <Route path="/auth/:authType/:id?" component={AuthPage} />
            <Route exact path="/connect/:provider" component={ConnectPage} />
            
                <Route path="/reisen/:tripId" >
                <div className="container is-fluid">
                    <TripsDetail />
                </div>    
                </Route>
                 <Route path="/shopping-cart" component={ ShoppingCart } />
              
            
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
               <Route exact path="/" > 
               <Hero />
              <br />
              <div className="container is-fluid">
                {filterTrips}
                <div className="columns is-multiline">
                 
                  {tripCards}
                   </div>
               
                </div>
                <Pagination />
                </Route>
               </Switch>
               
            </div>
            </Router>
          );
  }
}

export default App