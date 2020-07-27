import React from "react"
import axios from "axios"
import Cookie from "js-cookie";
import Strapi from "strapi-sdk-javascript/build/main";

const apiUrl= 'https://strapi.luis-backt-und-kocht.de';
//const apiUrl = `${process.env.REACT_APP_BACKEND_URL}`
const strapi = new Strapi(apiUrl);
//console.log("URL", apiUrl)
//console.log("strapi", strapi+'/graphql'




class LastMinute extends React.Component {
            constructor() {
                super()

                this.state = {
                    telefon: 111
                }
                this.handleTest = this.handleTest.bind(this)
            }
    handleTest() {

                    console.log("CLick Update", this.state.plz)
                    let token = Cookie.get('jwt')
                    console.log("CLICKToken", token)
                    const config =  {headers: {
                    Authorization: `Bearer ${token}`
                    }}

                    const user = {
                    "Strasse":"TESTSTRASSE",
                    "telefon": this.state.telefon
                    }
                    //Sign up User
                    axios
                    .put('https://strapi.luis-backt-und-kocht.de/users/32', user, config)
                    .then(response => {
                    // Handle success.
                    console.log('Well done!');
                    console.log('User profile', response);
                    console.log('User token', response.data.jwt);
                    })
                    .catch(error => {
                    // Handle error.
                    console.log('An error occurred:', error);
                    });
}
            render() {
                console.log("State before Click", this.state)
                return (
                    <div className="box">
                        <button className="button is-primary" onClick={this.handleTest}>Testen</button>
                    </div>
                )
            }
}

export default LastMinute