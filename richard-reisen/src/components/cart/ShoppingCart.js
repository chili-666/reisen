import React from "react"
import {FaBackspace} from "react-icons/fa"
import CartCustomer from"./CartCustomer"
import {setCart, getCart, getToken } from "../utils";
import {Link} from "react-router-dom";
import Strapi from "strapi-sdk-javascript";
import Cookie from "js-cookie";
import {Markdown} from"react-showdown"
import ReactMarkdown from "react-markdown"

const apiUrl= 'https://strapi.luis-backt-und-kocht.de';
//const apiUrl = `${process.env.REACT_APP_BACKEND_URL}`
const strapi = new Strapi(apiUrl)


class ShoppingCart extends React.Component {

  constructor() {
        super();
        this.state = {
            loading:false,
            booking: false,
            persist: false,
            items: [],
            token: ""
        }
        this.handleBooking = this.handleBooking.bind(this)
    }

   async componentWillMount() {
        await this.setState({
            loading:false,
            items: getCart(),
            token: Cookie.get('jwt')
        })
  
    }

   

    handleBooking(event) {
        this.setState({
            booking: true
            
        })
        //console.log("Booking!", this.state.booking)
        document.getElementById("bookingButton").style.display ="none"
        document.getElementById("bookingAblauf").style.display ="block"

    }

    handleService() {
        console.log("Geklickt")
        document.getElementById("services").classList.toggle("is-hidden")
        document.getElementById("serviceButton").classList.toggle("is-hidden")
    }

    handleItinerary(event) {
        console.log("Itinerary", event.target.id)
        console.log("Toggle", document.getElementsByClassName(event.target.id)[0])
        document.getElementsByClassName(event.target.id)[0].classList.toggle("is-hidden")
    }

 

    render(){
        
        console.log("ShoppingCART", this.state)
        {this.state.loading ?
        console.log("Laden") : 
       // let tripId = this.state.trip.id
       // localStorage.setItem("tripId", "test")
       console.log("LINK_PROPS", this.state)
        var totalAdult = Math.round((this.state.items.adults * this.state.items.trip.priceAdult*100)/100)
        const {kids, adults} = this.state.items
        const {priceAdult, priceReduced, title} = this.state.items.trip
        var totalKids = kids * this.state.items.trip.priceReduced
        var grandTotal = totalKids + totalAdult
        const selectedTripDate = this.state.items.tripDate
        const dates = this.state.items.trip.trip_dates
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
        var tax = grandTotal/100*16

        var tripPics = this.state.items.trip.pics.map(pic => (
            <div>
            <img src={`${apiUrl}${pic.url}`} />
            </div>
        ))
    }
        let descMarkDown
        const accordionItinerary = this.state.items.trip.itinerary.map(day => (
            console.log("ItitneraryTAG", day),
            descMarkDown = day.description,
            
            <article className="container is-size-7">
                        <button className="has-background-white-ter has-text-black is-small is-fullwidth" style={{border:"none", width:"100%"}} id={day.id} onClick={this.handleItinerary}>
                        <p value={day.id} id={day.id}>{day.title}</p>
                        </button>
                        <div className={`container has-background-white is-hidden ${day.id}`} style={{border:"1px solid hsl(0,0%,96%)", marginBottom:"3px"}} id={day.id}>
                        <div className="content">
                            <Markdown markup={descMarkDown} />
                        </div>
                        </div>
            </article>
        ))

     //   console.log("Finden", dates.find(element => element.id === selectedTripDate))
        return (
           
            <div className="container is-fluid">
               
                <div className="box" style={{marginTop:"1em"}}>
                    <div className="container is-fluid has-text-centered" style={{marginTop:"1em"}}>
                        <div className="columns">
                            <div className="column is-one-third"></div>
                            <div className="column is-one-third">
                                25% gebucht
                    <progress className="progress is-primary is-small" value="25" max="100">25%</progress>
                    </div>
                    <div className="column is-one-third"></div>
                    </div>
                    </div>
                <div className="container is-fluid" style={{marginTop:"3em"}}>
                <div className="title">
                Ihre Reisebuchung
                </div>
                  <div className="columns">
                    <div className="column is-halfwidth">
                        <table className="table is-fullwidth is-striped">
                        <thead>
                        <tr>
                        <th>Reise</th>
                        <th>Abreise</th>
                        <th>Rückreise</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                        <td>{this.state.items.trip.tripName}</td>
                        <td>{abreiseTag}.{abreiseMonat}.{abreiseJahr}</td>
                        <td>{returnTag}.{returnMonat}.{returnJahr}</td>
                        </tr>
                        </tbody>
                        </table>
                        <div className="box">
                        <div className="columns">
                            <div className="column is-two-thirds">
                            <b>Ihre Reise:</b><br />
                                {this.state.items.trip.short_description}
                                <br />
                                <button className="button is-fullwidth is-white-ter is-small is-outlined is-rounded" id="serviceButton" onClick={this.handleService}>Inklusivleistungen</button>
                                <div className="box is-hidden" id="services" onClick={this.handleService}>
                                    <span className="is-size-7 has-text-grey" style={{marginBottom:"2em"}}>
                                        <button className="button is-white-ter is-rounded is-small ">x</button></span><br/><br/>
                                    <ul className="is-size-7 has-text-grey">
                                        <li>Leistung 1</li>
                                        <li>Leistung 1</li>
                                        <li>Leistung 1</li>
                                    </ul>
                                </div>
                                <br />
                                Reiseablauf:
                                <br />
                                <section className="accordions">
                                  {accordionItinerary}
                                </section>
                            </div>
                            <div className="column">
                                {tripPics}
                            </div>
                        </div>
                        </div>
                        <div style={{paddingTop:"1em"}}>
                            <div className="box is-hidden-mobile" id="bookingAblauf" style={{display:"none"}}>
                               <h3 className="has-text-weight-semibold is-family-secondary">Buchungsablauf</h3>
                               <ul className="is-size-7">
                                   <li>Melden Sie sich an oder legen Sie ein neues Kundenkonto an.</li>
                                    <li>Geben Sie die Daten Ihrer Mitreisenden an und prüfen Sie Ihre eigenen Daten</li>
                                    <li>Wählen Sie Ihre gewünschte Zahlungsart</li>
                                    <li>Im Anschluss an die Bestellung erhalten Sie eine Bestellbestätigung per Email</li>
                                    <li>Etwas später erhalten Sie Ihre Reiseunterlagen ebenfalls per Email</li> 
                                </ul>
                            </div>
                        </div>
                </div>
                <div className="column is-halfwidth">
                <table className="table is-fullwidth is-striped">
                    <thead>
                    <tr>
                    <th>Reisende</th>
                    <th>Preis pro Person</th>
                    <th>Gesamt</th>
                    <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>    
                        <td>{this.state.items.adults} Erwachsene(r)</td>
                        <td>{this.state.items.trip.priceAdult} €</td>
                        <td>{totalAdult} €</td>
                        <td><FaBackspace /></td>
                        </tr>
                        {this.state.items.kids > 0 && <tr >    
        <td>{this.state.items.kids} Kinder </td>
                        <td>{this.state.items.trip.priceReduced} €</td>
                        <td>{totalKids} €</td>
                        <td><FaBackspace /></td>
                        </tr>
    }
                    </tbody>
                </table>
              
                  
                            <div style={{display:"flex", justifyContent:"flex-end"}}>
                            <table className="table is-striped is-narrow">
                            <thead>
                            <tr>
                            <th></th>
                            <th>Ihr Reisepreis</th>
                            </tr>
                            </thead>
                                <tbody>
                                <tr>
                                <td></td>
                                <td>{grandTotal} €</td>
                                </tr>
                                <tr className="is-size-7">
                                    <td>inkl. der gesetzl. MwSt.</td>
                                    <td>{tax.toFixed(2)} €</td>
                                </tr>
                                </tbody>
                            </table>
                        
                            
                          </div>
                          <br />
                          {this.state.token ?
                          <Link to={{ pathname: "/meine-buchung", state: {booking: this.state}}}><button className="button is-primary mb-4">Buchen</button></Link>
                          :
                          <div>
                          <button onClick={this.handleBooking} className="button is-primary mb-4" id="bookingButton">Jetzt buchen</button>
                          <CartCustomer className="has-background-black" show={this.state.booking}/>
                          </div>
                            }       
                          </div>
                          </div>
                          
                          
                          
                          
                       </div>
                       </div>  
            </div>
        )
    }

}

export default ShoppingCart