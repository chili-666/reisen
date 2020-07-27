import React from "react"
import {setCart, getCart } from "../utils";
import Cookie from "js-cookie";
import Strapi from "strapi-sdk-javascript/build/main"
import axios from "axios"
import BookingsView from "../booking/BookingsView"
import BookingAddServices from "../booking/BookingAddServices";



const apiUrl= 'https://strapi.luis-backt-und-kocht.de';
//const apiUrl = `${process.env.REACT_APP_BACKEND_URL}`
const strapi = new Strapi(apiUrl);
//console.log("URL", apiUrl)
//console.log("strapi", strapi+'/graphql')

class AccountAdress extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            loading: false,
            token: ""
            
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
 componentDidMount() {
    let currentURL = window.location.pathname
    if (currentURL === "/meine-buchung") {
        document.getElementById("oldBookings").style.display = "none"
        document.getElementById("accountAdress").className ="column is-full"
    }
 }
   async componentWillMount() {
       await this.setState({
            items: getCart(),
            token: Cookie.get('jwt')
            
       }) 
   }  

   handleChange(event) {
    event.persist();
    const {name, value} = event.target
    
    this.setState({
        [name] : value,
            })
    console.log("STATE", this.state )
}

    handleClick() {
      
               //console.log("CLick Update", this.state.token)
        let token = Cookie.get('jwt')
        console.log("CLICKToken", token)
        const config =  {headers: {
            Authorization: `Bearer ${token}`
        }}

        const user = {
            "email": this.state.email,
            "Strasse": this.state.Strasse,
            "Hausnummer": this.state.Hausnummer,
            "plz": this.state.plz,
            "ort": this.state.ort,
            "telefon": this.state.telefon,
            "mobil": this.state.mobil,
            "nachname": this.state.nachname,
            "vorname": this.state.vorname,
            "anrede": this.state.anrede
        }
         //Sign up User
       axios
        .put(`https://strapi.luis-backt-und-kocht.de/users/${this.state.id}`, user, config)
        .then(response => {
            // Handle success.
            console.log('Well done!');
        })
        .catch(error => {
            // Handle error.
            console.log('An error occurred:', error);
        });
    }

   async handleUpdate() {
       this.setState({
           loading: true
       })
       if (this.state.token !== null) {
        // authenticate the token on the server and place set user object
        fetch('https://strapi.luis-backt-und-kocht.de/users/me', {
          headers: {
            Authorization: `Bearer ${this.state.token}`,
          },
        }).then(async (res) => {
            const userData = await res.json()
            console.log("ANtwor for MEE", userData)
            await this.setState({
                user: userData,
                
            })
            console.log("USERDATASTATE", this.state)
            
            this.setState({
                loading:false
            })
           
})}
 }


    

    render() {
        console.log("State Token", this.state.id)
        let keys = this.props.keys
        let data = this.state.data
       // console.log("DATA", this.props)
        if (this.state.data !== "") {
       // console.log("Whats the state", this.state)
        }
        for (const [key, value] of Object.entries(this.props.data)) {
            //console.log(`${key}: ${value}`);
            if (this.state.hasOwnProperty(key)) {
            //    console.log("SChon da")
            }
            else {
            //    console.log("NEUUUUUUU", this.state[key])
           
            this.setState ({
               [key]:value
       })
            }
        }
      
       
        return (
            
            <div className="container">
                <div className="columns">
                    <div className="column is-two-thirds" id="accountAdress">
                                <form>
                                <div className="field">
                                    <label className="label is-small has-text-left">Anrede</label>
                                    <div className="control">
                                     <input className="input is-small is-primary" type="text" placeholder="Anrede" name="Anrede" defaultValue="" value={this.state.anrede}  onChange={this.handleChange} />
                                    </div>
                                </div>
                                <div className="columns">
                                    <div className="column">
                                        <div className="field">
                                            <label className="label is-small has-text-left">Vorname</label>
                                            <div className="control">
                                            <input className="input is-small is-primary" type="text" placeholder="Vorname" name="vorname" defaultValue={this.state.vorname}  onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="field">
                                        <label className="label is-small has-text-left">Nachname</label>
                                        <div className="control">
                                        <input className="input is-small is-primary" type="text" placeholder="Nachname" name="nachname" defaultValue={this.state.nachname}  onChange={this.handleChange}/>
                                    </div>
                                </div>
                                </div>
                                </div>
                                <div className="columns">
                                    <div className="field column is-three-quarters">
                                        <label className="label is-small has-text-left">Strasse</label>
                                        <div className="control">
                                        <input className="input is-small is-primary" type="text" placeholder="Strasse" name="Strasse" defaultValue={this.state.Strasse}  onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                    <div className="field column">
                                        <label className="label is-small has-text-left">Hausnummer</label>
                                        <div className="control">
                                        <input className="input is-small is-primary" type="text" placeholder="Hausnummer" name="Hausnummer" defaultValue={this.state.Hausnummer}  onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="columns">
                                    <div className="field column">
                                        <label className="label is-small has-text-left">Postleitzahl</label>
                                        <div className="control">
                                        <input className="input is-small is-primary" type="text" placeholder="Postleitzahl" name="plz" defaultValue={this.state.plz}  onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                    <div className="field column is-three-quarters">
                                        <label className="label is-small has-text-left">Ort</label>
                                        <div className="control">
                                        <input className="input is-small is-primary" type="text" placeholder="Ort" name="ort" defaultValue={this.state.ort} onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="columns">
                                    <div className="field column">
                                        <label className="label is-small has-text-left">Telefon</label>
                                        <div className="control">
                                        <input className="input is-small is-primary" type="text" placeholder="Telefon" name="telefon" defaultValue={this.state.telefon} onChange={this.handleChange} />
                                        </div>
                                        <label className="label is-small has-text-left">Mobil</label>
                                        <div className="control">
                                        <input className="input is-small is-primary" type="text" placeholder="mobil" name="mobil" defaultValue={this.state.mobil} onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                    <div className="field column">
                                        <label className="label is-small has-text-left">Email</label>
                                        <div className="control">
                                        <input className="input is-small is-primary" type="email" placeholder="Email" name="email" defaultValue={this.state.email} onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="field is-grouped">
                                        <div className="control">
                                        <button className="button is-primary" onClick={this.handleClick}>Ändern</button>
                                        </div>
                                    </div>
                                </form>
                                </div>
                                <div className="column" id="oldBookings">
                                    <div className="box is-shadowless has-background-primary has-text-white">
                                        <BookingsView user={this.state.email}/>
                                        </div></div>
                            </div>

                            </div>
        )
    }
}

export default AccountAdress