import React from "react"

class Footer extends React.Component{
    constructor() {
        super()

    }

    render() {
        return (
            <div className="footer has-background-primary has-text-white" style={{marginTop:"2em"}}>
                <div className="container">
                <div className="columns">
                    <div className="column">
                        <ul>
                            <li>Kontakt</li>
                            <li>Impressum</li>
                            <li>Datenschutz</li>
                        </ul>
                    </div>
                    <div className="column">
                        <p>Firmenname<br />
                            adresse<br />
                            adresse<br />
                        </p>
                    </div>
                    <div className="column">
                        Telefon: 0815 -47 11<br />
                        Email: bus(at)richard.de
                    </div>
                </div>
                </div>
            </div>
        )
    }

}

export default Footer