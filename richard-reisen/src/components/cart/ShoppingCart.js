import React from "react"
import {FaBackspace} from "react-icons/fa"

class ShoppingCart extends React.Component {

    render(){
        console.log("LINK_PROPS", this.props.location.state)
        var totalAdult = this.props.location.state.adults * this.props.location.state.trip.priceAdult
        const {kids, adults} = this.props.location.state
        const {priceAdult, priceReduced} = this.props.location.state.trip
        var totalKids = kids * priceReduced
        var grandTotal = totalKids + totalAdult
        return (
            <div className="container is-fluid">
                
                <div className="box">
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
                        <td>Reise</td>
                        <td>Abreise</td>
                        <td>Rückreise</td>
                        </tr>
                        </tbody>
                        </table>
                        <div className="box"> REISEBESCHREIBUNG </div>
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
                        <td>{this.props.location.state.adults} Erwachsene(r)</td>
                        <td>{this.props.location.state.trip.priceAdult} €</td>
                        <td>{totalAdult} €</td>
                        <td><FaBackspace /></td>
                        </tr>
                        <tr>    
                        <td>{kids} Kinder</td>
                        <td>{priceReduced} €</td>
                        <td>{totalKids} €</td>
                        <td><FaBackspace /></td>
                        </tr>
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
                                </tbody>
                            </table>
                            </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }

}

export default ShoppingCart