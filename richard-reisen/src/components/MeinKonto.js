import React from "react"
import BookingDetails from "./booking/BookingDetails"
import AccountAdress from "./account/AccountAdress"
import Companion from "./booking/Companions"
import BookingAddServices from "./booking/BookingAddServices"
import BookingButton from "./booking/BookingButton"
import {getToken} from "./utils"
import Cookie from "js-cookie";
import Strapi from "strapi-sdk-javascript/build/main"



const apiUrl= 'https://strapi.luis-backt-und-kocht.de';
//const apiUrl = `${process.env.REACT_APP_BACKEND_URL}`
const strapi = new Strapi(apiUrl);
//console.log("URL", apiUrl)
//console.log("strapi", strapi+'/graphql'

class MeinKonto extends React.Component {
   constructor() {
        super()
    }
    state = {
        loading:true,
        companions: false,
        accountKeys: [],
        token: null,
        user: null
    }
  
   async componentDidMount() {
        await this.setState({
            token: Cookie.get('jwt') 
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
    let formular
    const userData = this.state.loading ? console.log("TEST lädt") : Object.keys(this.state.user)
    console.log("USERDATA", userData)
   // if (this.state.loading != true) {
    //  for (let i = 0; i < userData.length; i++) {
    //      console.log("Neuer Versuch", this.state.user[userData[i]] )
    //      formular = this.state.user[userData[i]]
   
    //  }
     // }

    //const formular = this.state.loading ? "LÄDT NOCH" : Object.entries(this.state.user).map((entry, i) => (
    //    console.log("ENTRY", entry[i], entry[i+1])
        //<div className="has-background-danger" key={i}> key: {entry[i]} Name {entry[i+1]}</div>
    //))
    
 /*   for (const [key, value] of Object.entries(this.state.user)) {
        console.log(`${key}: ${value}`);
        formular = <div className="has-background-grey-darker">{key}</div>
        console.log("FORM", formular)
    }
}*/
     return (
     <div className="container" style={{marginTop:"1em"}}>
         <div className="box">
     <h1 className="title has-text-weight-semibold">
         Willkommen zurück, {this.state.loading ? "" : this.state.user.vorname}!
     </h1>
     {this.state.loading ? "" : <AccountAdress data={this.state.user} />}
     </div>
     </div>
     )
  }
}

export default MeinKonto