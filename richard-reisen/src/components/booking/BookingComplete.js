import React from"react"
import {Link} from "react-router-dom";
import Paypal from"../utils/Paypal";
import { FaBusAlt, FaBed, FaStar, FaAppleAlt, FaWineBottle, FaBus, FaTicketAlt, FaSkiing } from "react-icons/fa";
import {GiBus, GiPayMoney, GiKnifeFork, GiConsoleController} from "react-icons/gi"
import axios from "axios"

const apiUrl= 'https://strapi.luis-backt-und-kocht.de';

class BookingComplete extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
                   }
        this.handleCheckboxes = this.handleCheckboxes.bind(this)
    }

   async componentDidMount(props) {
        let countPax
        if (this.props.location.state != null) {
            this.setState({
                loading:false
            })
        }
        
        let bookingNumber
        axios
            .get("https://strapi.luis-backt-und-kocht.de/bookings")
            .then(response => {
                bookingNumber = response.data[response.data.length -1].id + 1
                 })
            
            .catch(error => {
                // Handle error.
                console.log('Buchungsfehler occurred:', error);
            });
        
    }

    handleCheckboxes(event) {
        event.persist();
        const {name, value, checked} = event.target
        
        this.setState({
            [name] : checked
                })
       console.log(name, checked)
        
    }

    render() {
            console.log("COMPLETE", this.props)
/*        const {booking} = this.props.location.state
            //Services und Icons erstellen
    var serviceICON = this.props.location.state.booking.items.trip.services.map(service => {
        let icon
        switch (service.Icon) {
            case "FaBed":
                icon = <FaBed />
                break;
            case "FaWineBottle":
                icon = <FaWineBottle />
                break;
            case "FaWineBottle":
                icon = <FaWineBottle />
                break;
            case "FaBus":
                icon = <FaBus />
                break;
                case "FaTicketAlt":
                    icon = <FaTicketAlt />
                break;
                case "FaSkiing":
                    icon = <FaSkiing />
                break;
                case "FaAppleAlt":
                    icon = <FaAppleAlt />
                break;
                case "GiKnifeFork":
                    icon = <GiKnifeFork />
                break;
        }
        return <li key={service.id}>{icon} {service.serviceName}</li>  
    });

   // var addServices = booking.addServices.map(service => {
    let additional =[]
    let add 
     for ( var [key, value] of Object.entries(booking.addServices)) {
        
        additional.push(<tr key={key} style={{border:"none"}}><td style={{border:"none"}}>{key}</td><td style={{border:"none"}}>{value}</td></tr> )}
        
        
        add = additional.map(addSer => {
         
            return addSer
        })
    
    let adults
    let mitreisendeName = []
    let travName
    let kids
    var regex = /adult/i
    for ( var [key, value] of Object.entries(booking.companions)) {
       if (key.match(regex)) {
           adults = value 
       } else {
           kids= value
       }}
    /*travName = mitreisendeName.map(name => {
        console.log("NAME", name)
        return name
    })
       
        {this.state.loading ?
            console.log("Laden", this.props) : 
        
        console.log("LINK_PROPS", this.props)
        var tripPic = this.props.location.state.booking.items.trip.pics.map(pic => (
            
            <div>
            <div className="modal is-clipped" id={pic.id}>
            <div className="modal-background"></div>
            <div className="modal-content">
            <img src={`${apiUrl}${pic.url}`} />
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={this.handleClose} id={pic.id}></button>
         </div>
            <img src={`${apiUrl}${pic.url}`} onClick={this.handleClose} id={pic.id}/>
            </div>
             ));
        var totalAdult = this.props.location.state.booking.items.adults * this.props.location.state.booking.items.trip.priceAdult
         const {kids, adults} = this.props.location.state.booking.items
         const {priceAdult, priceReduced, title} = this.props.location.state.booking.items.trip
         var totalKids = kids * priceReduced
         var grandTotal = totalKids + totalAdult
         const selectedTripDate = this.props.location.state.booking.items.tripDate
         const dates = this.props.location.state.booking.items.trip.trip_dates
        console.log("SelectedTripDate", selectedTripDate)
        console.log("Dates", dates.length)
       //  console.log("Const Dates", dates)
         var bookedDate;
         for ( let i=0; i < dates.length; i++) {
             console.log("DATES_FOR", dates[i].id, selectedTripDate)
             //bookedDate =  dates.find(element => element.id === selectedTripDate)
             if (dates[i].id != selectedTripDate){
                 
             } else {
                 bookedDate = dates[i]
             }
             
         }
         var abreise = new Date(bookedDate.departure)
         var abreiseJahr = abreise.getFullYear()
         var abreiseMonat = abreise.getMonth()+1
         var abreiseTag = abreise.getDate()
         var    returnDatum = new Date(bookedDate.return)
         var    returnJahr = returnDatum.getFullYear()
         var    returnMonat = returnDatum.getMonth()+1
         var    returnTag = returnDatum.getDate() 
     
               
        console.log("PAYMENT", booking)
        }*/
        return (
                <div className="box">COMPLETE</div>

            /*
            <div className="container">
            <div className="box" style={{marginTop:"1em"}}>
            <div className="container is-fluid has-text-centered" style={{marginTop:"1em"}}>
                <div className="columns">
                    <div className="column is-one-third"></div>
                    <div className="column is-one-third">
                        75% gebucht
            <progress className="progress is-primary is-small" value="75" max="100">75%</progress>
            </div>
            <div className="column is-one-third"></div>
            </div>
            </div>
        <div className="container is-fluid" style={{marginTop:"3em"}}>
                <div className="box">
                    <div className="title">Ihre Buchungsübersicht</div>
                    <div className="container">Ihre Daten
                        <div className="columns">
                            <div className="column has-text-left">
                                <div className="box is-shadowless">
                                
                               <span className="has-text-weight-bold">Rechnungsanschrift</span><br/><br/>
                               <span className="is-size-6">
                                   
                               {this.state.loading ? "LÄDT":  
                                 <p>
                                 {this.props.location.state.booking.user.vorname} {this.props.location.state.booking.user.nachname}<br/>
                                 {this.props.location.state.booking.user.Strasse} {this.props.location.state.booking.user.Hausnummer}<br/>
                                 {this.props.location.state.booking.user.plz} {this.props.location.state.booking.user.ort} 
                                 <br/><br/>
                                  </p>
                                } 
                                {this.state.loading ? "LÄDT": 
                                <p className="is-size-7">
                                    <b>Kontaktdaten</b><br />
                                    Telefon: {this.props.location.state.booking.user.telefon}<br/>
                                    Mobil: {this.props.location.state.booking.user.mobil}<br/>
                                    Email: {this.props.location.state.booking.user.email}</p> 
                                 
                            }
                                 </span> 
                                 </div>
                            </div>
                             <div className="column">
                                <div className="container">
                                                              
                                </div>
                             </div>
                            
                        </div>
                    </div>
                    <div className="box has-background-primary has-text-white">
                        Ihre Buchung
                        <div className="columns">
                            <div className="column has-text-left is-size-7">
                                <span className="has-text-weight-bold is-size-6">Reisedaten:</span> <br />
                                <b>Reisezeitraum:</b> {abreiseTag}.{abreiseMonat}.{abreiseJahr} bis {returnTag}.{returnMonat}.{returnJahr}<br />
                                <b>Anzahl Personen:</b> {this.props.location.state.booking.countPax} {this.kids > 0 ? "({kids} Kinder)" : ""}<br />
                                <b>Gebuchte Reise:</b> {this.props.location.state.booking.items.trip.tripName}<br /><br />
                                <b>Ihre Inklusivleistungen:</b><br />
                                <ul>
                                   {serviceICON}
                                </ul>
                                <br />
                                <b>Weitere gebuchte Services:</b>
                                <table className="table has-background-primary has-text-white is-narrow" >
                                    <tbody>
                                       {add}
                                    </tbody>
                                </table>
                            </div>
                            
                            {this.props.location.state.booking.countPax > 1 ?
                            <div className="column has-text-left is-size-7">
                            <span className="has-text-weight-bold is-size-6">Mitreisende</span><br/>
                                {adults}<br />
                                {kids}{kids != null ? " (Kind)": null}
                            </div>
                            : 
                            null}
                                                      
                        </div>
                    </div>
                    <div className="box">Zahlung<br />
                    <div className="container" style={{marginTop:"1em"}}>
                    <div className="columns">
                        <div className="column">
                            <form className="is-size-7 has-text-left">
                                    <label className="checkbox">
                                    <input type="checkbox" name="agb" checked={this.state.agb} onChange={this.handleCheckboxes}/>
                                    Ich habe die AGB gelesen und verstanden und möchte kostenpflichtig bestellen
                                    </label>
                                    <label className="checkbox">
                                    <input type="checkbox" name="werbung" checked={this.state.werbung} onChange={this.handleCheckboxes}/>
                                    Ich möchte Angebot und News der Dr. Richard GmbH per Email erhalten. Ich kann diese Einwilligung jederzeit widerufen.
                                    </label>
                          </form>
                        </div>
                        <div className="column">
                           
                        </div>
                    </div>
                    </div>
                    </div>
                </div>
            </div>
            </div>
            </div>
        */)
    }
}

export default BookingComplete