import React from"react";
import Strapi from "strapi-sdk-javascript/build/main";
import { setToken } from "../utils"
import PopUp from "../utils/PopUp"
import {Link} from "react-router-dom";
import Login from "./Login"
import Register from "./Register"


const apiUrl= 'https://strapi.luis-backt-und-kocht.de';
//const apiUrl = `${process.env.REACT_APP_BACKEND_URL}`
const strapi = new Strapi(apiUrl);
//console.log("URL", apiUrl)
//console.log("strapi", strapi+'/graphql')

class SignUpIn extends React.Component {
    constructor() {
        super()

        this.state = {
           tab: true
                  }
       this.clickHandler = this.clickHandler.bind(this)
      
    }
   
    clickHandler() {
        //console.log("Tab-Klick!", this.state);
        //            console.log("Tab-Event");
                    this.setState(prevstate => ({
                        tab: !prevstate.tab
                    }))
                 //   console.log("ChangesStateTabs", this.state)
                    document.getElementById("login").classList.toggle("is-active")
                    document.getElementById("register").classList.toggle("is-active")
                }    



    render() {
       
    return(
        <div style={{paddingTop:"1em"}}>
          <div className="container">
              <div className="is-shadowless box">
                <div>
                <div className="tabs is-toggle is-fullwidth">
                <ul>
                  <li id="login" className="is-active">
                    <a value="login"  onClick={this.clickHandler} >
                      <span>Login</span>
                    </a>
                    
                  </li>
                  
                  <li id="register" className="">
                    <a  onClick={this.clickHandler}>
                     <span>Registrieren</span>
                    </a>
                 </li>
                 
                </ul>
                
              </div>
              <div className="loginbox" id="loginbox">
                  {this.state.tab ? <Login /> : <Register />}
              
              </div>
              </div>
              </div>
              </div>
            </div>

            
    )
}
}

export default SignUpIn