import React from "react"
import Strapi from "strapi-sdk-javascript/build/main"
import axios from "axios"
import {Link} from "react-router-dom";

const apiUrl= 'https://strapi.luis-backt-und-kocht.de';
//const apiUrl = `${process.env.REACT_APP_BACKEND_URL}`
const strapi = new Strapi(apiUrl);
console.log("UR_LoginButton", apiUrl)
console.log("strapi_LoginButton", strapi+'/graphql')


class LoginButton extends React.Component {
  async getData() {
    console.log("LoginButton_PROPS", this.props)
   const { data } = await axios.post('https://strapi.luis-backt-und-kocht.de/auth/local', {
      identifier: this.props.identifier,
      password: this.props.password,
      })
  
return await data};

    constructor() {
        super()
       
  //      this.loginClick = this.loginClick.bind(this)
        this.allStorage = this.allStorage.bind(this)
    }
    state = {
      profile:[],
      token: "",
      loading: true
    }
    allStorage() {

      var values = [],
          keys = Object.keys(localStorage),
          i = keys.length;
  
      while ( i-- ) {
          values.push( localStorage.getItem(keys[i]) );
          console.log("AllStorageKEYS", keys[i])
      }
      
      return values;
      
  }


/*
loginClick() {
this.getData()
.then(data => this.setState({
  token: data,
  loading: false
})
)

.catch(err => console.log("Da läuft was falsch", err))  
//console.log("Profile, JWT",this.state.token )
}
*/



  

 /*     axios
    .post("https://strapi.luis-backt-und-kocht.de", {
          identifier: this.props.identifier,
          password: this.props.password,
        })
        .then(response => {
          // Handle success.
         console.log('Well done!');
         console.log('User profile', response.data.user);
         console.log('User token', response.data.jwt);
          let profile = response.data.user
          //console.log("PROFILE", profile)
          //localStorage.setItem('pageData', profile )
          //console.log("Response_keys: ", Object.keys(profile))
         
         let keys = []
          keys.push(Object.keys(profile))
          localStorage.setItem("keys", keys[0])
      //    console.log("Keys_Array", keys[0])
          for (const [key, value] of Object.entries(profile)) {

            localStorage.setItem(key, value);
          }
     //     console.log("Button_Storage", this.allStorage())  
         
      // window.open("/mein-Konto", "_self")
          
      })
    
    */
    render() {
     
        
        console.log("Loading...", this.state.loading)

        {this.state.loading ? console.log("LoginButtonTOKEN", this.state.token) : console.log("Lädt")}
        return (
          <div>
          <Link to={{pathname:"/mein-konto"}}>
          <button className="button is-danger" onClick={this.loginClick} profile={this.state.profile} token={this.state.token}>Login</button>
          </Link>
          </div>
    )
    }
}

export default LoginButton

