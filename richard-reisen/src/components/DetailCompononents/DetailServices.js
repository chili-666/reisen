import React from "react"
import { FaBusAlt, FaBed, FaStar, FaAppleAlt, FaWineBottle, FaBus, FaTicketAlt, FaSkiing } from "react-icons/fa";
//import { checkServerIdentity } from "tls";
import {GiBus, GiPayMoney, GiKnifeFork, GiConsoleController} from "react-icons/gi"
import { FaAngleDown, FaLuggageCart } from "react-icons/fa";
import DetailPrice from "./DetailPrice";
import {Link} from "react-router-dom";
import {setCart, getCart } from "../utils";

class DetailServices extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            services: [], 
            adults:0,
            kids: 0, 
            tripPrice: 0, 
            tripDate:0,
            trip: [],
            showPrice: false,
            tripId: 0
        }
        this.handleChange = this.handleChange.bind(this)
       this.componentWillMount = this.componentWillMount.bind(this);
        //this.showPrice = this.showPrice.bind(this)
    }

    async componentWillMount(props) {
        let tripId = this.props.tripId
        console.log("DetailServices Mounted", this.props.priceRed, tripId)
       await this.setState({
            loading:false,
            services: this.props.services,
            trip: this.props.all,
            tripId: this.props.tripId
        })
       
   
    }


      handleChange(event) {
        const {name, value} = event.target
        this.setState({ 
            [name]: value,
           showPrice: true
         })
        
      }

      checkSetCart() {
          const passengers = this.state.adults + this.state.kids
          if (passengers > 0) {
            setCart(this.state)
          }
      }

     

   render() {
       console.log("ServicesProps", this.state.services)
      
         //Services und Icons erstellen
         var serviceICON = this.state.services.map(service => {
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
            return <tr key={service.id}><td>{icon}</td><td>{service.serviceName}</td></tr>  
        });
        


    //Preis berechnen und ggf. Bestellbutton freigeben}    
    this.state.showPrice ? console.log("Formular", this.state.tripPrice) : console.log("Nix zu sehen")

    var disabled;
    if (this.state.adults > 0 ) {
       disabled= ""
    } else {
        disabled="disabled"
    };
    
    //Reisedaten in Selectbox mappen
    var abfahrtDatum
    var abfahrtJahr
    var abfahrtMonat
    var abfahrtTag
    var returnDatum
    var returnJahr
    var returnMonat
    var returnTag
    var dateKey
    var departureOption = this.props.all.trip_dates.map((date) => (
        console.log("TRIP_ID", date.id),
        dateKey= date.id,
             abfahrtDatum = new Date(date.departure),
  abfahrtJahr = abfahrtDatum.getFullYear(),
  abfahrtMonat = abfahrtDatum.getMonth()+1,
  abfahrtTag = abfahrtDatum.getDate(),
  returnDatum = new Date(date.return),
  returnJahr = returnDatum.getFullYear(),
  returnMonat = returnDatum.getMonth()+1,
  returnTag = returnDatum.getDate(),
           <option value={dateKey}>{abfahrtTag}.{abfahrtMonat}.{abfahrtJahr} - {returnTag}.{returnMonat}.{returnJahr}</option>
    ))
    console.log("TripDetail", this.state)      
    return (
        
        <div>
        <div className="box">
        <div>Diese Reise buchen</div>
        <div className="field">
            
                <div className="control is-expanded">
                 <div className="select is-primary is-fullwidth">
                     <select
                            name="tripDate"
                            value={this.state.tripDate}
                            onChange={this.handleChange}>
                     <option>Bitte wählen Sie Ihr Reisedatum</option>
                     {departureOption}
                     </select>
                  </div>
                 </div>
            </div>
        
        
      
        <div className="columns">
        <div className="column is-half-width">
            <div className="field">
             
                <div className="control is-expanded">
                 <div className="select is-small is-primary is-fullwidth">
                     <select 
                            name="adults"
                            value={this.state.adults}
                            onChange={this.handleChange}
                            >
                     <option>Erwachsene</option>
                     <option value="1">1</option>
                     <option value="2">2</option>
                     <option value="3">3</option>
                     <option value="4">4</option>
                     <option value="5">5</option>

                     </select>
                  </div>
                 </div>
            </div>
        </div>
        <div className="column is-half-width">
            <div className="field">
             
                <div className="control is-expanded">
                 <div className="select is-small is-primary is-fullwidth">
                     <select name="kids"
                            value={this.state.kids}
                            onChange={this.handleChange}>
                     <option>Kinder</option>
                     <option value="1">1</option>
                     <option value="2">2</option>
                     <option value="3">3</option>
                     <option value="4">4</option>
                     <option value="5">5</option>
                     </select>
                  </div>
                 </div>
        </div>
         </div>
         </div>
        <DetailPrice 
                adults={this.state.adults} 
                adultPrice={this.props.priceAdult} 
                kids={this.state.kids} 
                reducedPrice={this.props.priceRed} />
        <div>
        <Link 
            to={{
            pathname:"/shopping-cart",
            state: {
            tripDate: this.state.tripDate,
            adults: this.state.adults,
            kids: this.state.kids,
            trip: this.state.trip}
            }}
            className="button is-primary is-outlined is-small is-rounded has-text-black" 
            id="incart" 
            disabled={disabled}>
       
        <span onClick={this.checkSetCart()}>in den Einkaufswagen</span>
        </Link>
          </div>
          </div>
        <div className="box">
            Ihre Inklusivleistungen
            <table className="table is-striped is-size-7 is-fullwidth">
            <tbody>
            {serviceICON}
            </tbody>
            </table>
            </div>
      
        
       </div>
        
    )         
   }
}


export default DetailServices