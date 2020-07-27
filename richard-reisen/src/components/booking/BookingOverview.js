import React from "react"
import axios from "axios"
import Cookie from "js-cookie"
import AccountAdress from "../account/AccountAdress"
import Companions from "./Companions"
import {setCart, getCart, getToken } from "../utils";
import {Link} from "react-router-dom";
import BookingAddServices from "./BookingAddServices"

class BookingOverview extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
                user: null,
                loading: true,
                countPax: null,
                companions: [],
                addServices: []
        }
        this.handleAddServices = this.handleAddServices.bind(this)
        this.handleCompanions = this.handleCompanions.bind(this)
    }

    async componentWillMount() {
        
        await this.setState({
            token: Cookie.get('jwt'), 
            items: getCart(),
            
        })
        if (this.state.token !== null) {
            // authenticate the token on the server and place set user object
            fetch('https://strapi.luis-backt-und-kocht.de/users/me', {
              headers: {
                Authorization: `Bearer ${this.state.token}`,
              },
            }).then(async (res) => {
                const userData = await res.json()
               // console.log("ANtwor for MEE", userData)
                await this.setState({
                    user: userData,
                    
                })
              //  console.log("USERDATASTATE", this.state)
                let adultsInt = parseInt(this.state.items.adults)
                this.setState({
                    loading:false,
                    countPax: parseInt(this.state.items.adults) + this.state.items.kids
                })
               
    })
    }  
}
    handleAddServices(name, value){
        let addServicesState = {...this.state.addServices}
        addServicesState[name] = value
        this.setState({
            addServices: addServicesState,
        })
     //   console.log("ADDSERTVICES", this.state)

    }

    handleCompanions(id, value) {
        let companionState = {...this.state.companions}
        companionState[id] = value
        this.setState({
            companions: companionState
                        })
        
    }

    render() {
        
    {this.state.loading ?
    console.log("Laden", this.state) : 
   
    
   // let tripId = this.state.trip.id
   // localStorage.setItem("tripId", "test")

  // var { vorname, nachname, Strasse, Hausnummer, plz, ort, telefon, mobil} = this.state.user
  
   console.log("LINK_PROPS", this.state)
   var totalAdult = this.state.items.adults * this.state.items.trip.priceAdult
    const {kids, adults} = this.state.items
    const {priceAdult, priceReduced, title} = this.state.items.trip
    var totalKids = kids * priceReduced
    var grandTotal = totalKids + totalAdult
    const selectedTripDate = this.state.items.tripDate
    const dates = this.state.items.trip.trip_dates
   //console.log("SelectedTripDate", selectedTripDate)
   //console.log("Dates", dates.length)
  //  console.log("Const Dates", dates)
    var bookedDate;
    for ( let i=0; i < dates.length; i++) {
    //    console.log("DATES_FOR", dates[i].id, selectedTripDate)
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
}
    if (this.state.loading) { console.log("lädt Userdaten")} 
    else {
//    console.log("AbreiseJahr", this.state)
        if (
            this.state.user.vorname != null &&
            this.state.user.nachname != null &&
            this.state.user.Strasse != null &&
            this.state.user.Hausnummer != null &&
            this.state.user.plz != null &&
            this.state.user.ort != null &&
            this.state.user.telefon != null

            ) {
            document.getElementById("payment").removeAttribute("disabled")
            document.getElementById("payment").setAttribute("title", "Weiter zur Zahlung")
            document.getElementById("upperWarning").style.display = "none"
        }
    }
  
        return (
            <div className="box" style={{marginTop:"1em"}}>
            <div className="container is-fluid has-text-centered" style={{marginTop:"1em"}}>
                <div className="columns">
                    <div className="column is-one-third"></div>
                    <div className="column is-one-third">
                        50% gebucht
            <progress className="progress is-primary is-small" value="50" max="100">50%</progress>
            </div>
            <div className="column is-one-third"></div>
            </div>
            </div>
        <div className="container is-fluid" style={{marginTop:"3em"}}>
                    <div className="title">Ihre Buchungsübersicht</div>
                    <div className="container">
                        <div className="columns">
                            <div className="column is-two-thirds">
                             <div id="upperWarning" className="is-size-7 has-text-danger has-text-weight-bold">Bitte füllen Sie alle Felder aus!</div>   
                            {this.state.loading ? "" : <AccountAdress data={this.state.user} />}
                            </div>
                            <div className="column">
                                <div className="box is-shadowless has-background-primary">
                                    <div className="box has-background-white">
                                    <p className="has-text-centered has-text-weight-bold">Meine Buchung</p>
                                    <table className="table is-striped is-hoverable is-fullwidth is-narrow">
                                        <tbody>
                                            
                                            <tr>
                                                <th>Abreise</th>
                                                
                                                <th>Rückreise</th>
                                            </tr>
                                            <tr>
                                                <td>{abreiseTag}.{abreiseMonat}.{abreiseJahr}</td>
                                                
                                                <td>{returnTag}.{returnMonat}.{returnJahr}</td>
                                            </tr>
                                            <tr><td></td><td></td></tr>
                                            <tr>
                                                <th>Personen</th>
                                                
                                                <th></th>
                                                </tr>
                                            <tr className="is-size-7">
                                                <td>{this.state.items.adults}</td>
                                                <td>Erwachsense</td>
                                                
                                            </tr>
                                            <tr className="is-size-7">
                                                <td>{this.state.items.kids}</td>
                                                <td>Kinder</td>
                                                
                                            </tr>
                                            <tr className="is-size-7">
                                                <td></td>
                                                <td>

                                                </td>
                                                
                                            </tr>
                                            <tr className="is-size-7 has-text-weight-bold">
                                                <td>Gesamtpreis</td>
                                                <td>
                                                    € {grandTotal}
                                                </td>
                                                
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="box is-shadowless has-background-grey has-text-white is-size-7 has-text-justified">
                                       <b>Ihre Reise:</b><br /><br />
                                        {this.state.items.trip.tripName}<br /><br />
                                        {this.state.items.trip.short_description}
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <div className="box is-shadowless">
                    {this.state.countPax > 1 ? <Companions kids={this.state.items.kids} adults={this.state.items.adults} handleCompanions={this.handleCompanions}/> : ""}
                    <BookingAddServices services={this.state.items.trip.additional_services} handleAddServices={this.handleAddServices}/>
                    </div>
                    <div className="box is-shadowless">
                        <Link to={{ pathname: "/zahlung", state: {booking: this.state}}}>
                        <button className="button is-danger has-text-white is-medium" id="payment" title="Bitte füllen Sie alle Felder der Adressdaten aus!" disabled>Weiter zur Zahlung</button>
                        </Link>
                    </div>
                    </div>
                </div>
             </div>
        )
    }
}

export default BookingOverview