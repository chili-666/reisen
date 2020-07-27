import React from "react"

class BookingDetails extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log("BookingDetails", this.props)
        return (
                <div className="container is-size-7" style={{marginTop:"1em"}}>
                    <div className="box has-text-black">
                <div className="is-size-5" style={{marginBottom:"0.5em"}}>Meine Buchung</div>
               
            
                                    <div className="columns">
                                        <div className="column">
                                           <b>Abreise:</b><br />
                                            01.01.2020
                                        </div>
                                        <div className="column">
                                            <b>Abreise:</b><br />
                                            01.02.2020
                                        </div>
                                    </div>
                                    <div className="container">
                                        <div className="box is-shadowless has-background-white">
                                    <table className="table is-striped is-fullwidth is-narrow">
                                            <tbody>
                                            <tr>
                                            <th>Personen</th>
                                            <th>&nbsp;</th>
                                            <th>Einzelpreis</th>
                                            </tr>
                                            <tr>
                                            <td>XX</td>
                                            <td>Erwachsene</td>
                                            <td>XXX €</td>
                                            </tr>
                                            <tr>
                                            <td>XX</td>
                                            <td>Kinder</td>
                                            <td>XXX €</td>
                                            </tr>
                                            <tr>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                            </tr>
                                            <tr className="has-text-weight-bold">
                                            <td>Gesamtpreis</td>
                                            <td>&nbsp;</td>
                                            <td>XXX €</td>
                                            </tr>
                                            <tr>
                                            <td>&nbsp;</td>
                                            <td className="is-size-7">gesetzl. MwSt.</td>
                                            <td>XXX €</td>
                                            </tr>
                                            </tbody>
                                            </table>
                                            </div>
                                        <div className="box is-shadowless">
                                            <div className="has-text-weight-semibold">Enthaltene Leistungen</div>
                                            <ul>
                                                <li>Leistungen</li>
                                            </ul>
                                            </div>
                                    </div>
                                </div>
                                </div>
               
        )
    }
}

export default BookingDetails