import React from"react";
import Strapi from "strapi-sdk-javascript/build/main";
import { setToken } from "../utils"
import PopUp from "../utils/PopUp"
import {Link} from "react-router-dom";


const apiUrl= 'https://strapi.luis-backt-und-kocht.de';
//const apiUrl = `${process.env.REACT_APP_BACKEND_URL}`
const strapi = new Strapi(apiUrl);
//console.log("URL", apiUrl)
//console.log("strapi", strapi+'/graphql')

class Register extends React.Component {
    constructor() {
        super()

        this.state = {
           tab: true,
           username:"",
           password:"",
           loading: false,
           popup: false,
           popupMessage:"sdfsdfs"
        }
       
        this.handleChange = this.handleChange.bind(this)
    }
   
    clickHandler() {
        //console.log("Tab-Klick!");
        //            console.log("Tab-Event");
                    this.setState(state => ({
                        tab: !state.tab
                    }))
                   /* this.setState ({
                       tab : "register"
                   })*/
                    
                    //loginbox.innerHTML = <Login />
                    console.log("ChangesStateTabs", this.state.tab)
                    document.getElementById("login").classList.toggle("is-active")
                    document.getElementById("register").classList.toggle("is-active")
                }    
                      
    handleChange(event) {
        event.persist();
        const {name, value} = event.target
       
        this.setState({
            [name] : value,
                })
         console.log("ChangeState", name, value)
    }

    handleSubmit = async event => { 
       // await this.setState({username: this.state.email})
        event.preventDefault()
        const {username, password} = this.state;
        
        if (this.isFormEmpty(this.state)) {
            this.showPopUp("Bitte alle Felder ausfüllen!")
            return;
        }

        //Sign up User
   /*     axios
        .post('http://strapi.luis-backt-und-kocht.de/auth/local/register', {
            username: this.state.email,
            email: this.state.email,
            password: this.state.password
        })
        .then(response => {
            // Handle success.
            console.log('Well done!');
            console.log('User profile', response.data.user);
            console.log('User token', response.data.jwt);
        })
        .catch(error => {
            // Handle error.
            console.log('An error occurred:', error.response);
        });
    }*/

 
        // Sign up user
        try {
            
          this.setState({ loading: true });
          const response = await strapi.login(username, password);
         // this.setState({ loading: false });
          console.log("Login", response)
          setToken(response.jwt);
        // this.redirectUser("/mein-konto")
        let regex = /register/i
        if (regex.test(window.location.href)) {
        document.location.href= "mein-konto"} else {
            document.location.href ="meine-buchung"
        }
          } catch (err) {
          this.setState({ loading: false });
          this.showPopUp("Benutzername oder Passwort falsch");
        }
      };
    
    

    isFormEmpty = ({ username, password }) => {
        return !username ||  !password;
      };
    
      showPopUp = popupMessage => {
        this.setState({ popup: true, popupMessage });
        setTimeout(() => this.setState({ popup: false, popupMessage: "" }), 5000);
      };

    render() {
        console.log("WIndowLocation", window.location.href)
        const { popupMessage, popup, loading } = this.state;
    return(
        
            <div className="box">
            <PopUp show={popup} message={popupMessage} />
            <p>
            <b>Bitte melden Sie sich an</b>
            </p>
            <form>
            <div className="field">
             <label className="label is-small has-text-left">Login</label>
                    
                                <div className="control">
                                    <input 
                                        className="input is-primary is-small"
                                        type="email" 
                                        name="username" 
                                        id="username"
                                        placeholder="Ihre Email" 
                                        
                                        onChange={this.handleChange}
                                    />
                                </div>
                                </div>

                    <div className="field">
                    <label className="label is-small has-text-left">Ihr Passwort</label>
                    
                                <div className="control">
                                    <input 
                                        className="input is-primary is-small"
                                        type="password" 
                                        name="password" 
                                        id="password"
                                        placeholder="password" 
                                        
                                        onChange={this.handleChange}
                                    />
                                </div>
                                </div>
                    
                    <br />
                    <div className="has-text-centered">
                    <Link to="/mein-konto">
                    <button className="button is-primary" onClick={this.handleSubmit} date={this.state}>Anmelden</button>
                    </Link>
                    </div>
                
                
            </form>
            </div>
                
    )
}
}

export default Register