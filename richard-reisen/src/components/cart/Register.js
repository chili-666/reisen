import React from"react";
import Strapi from "strapi-sdk-javascript/build/main";
import { setToken } from "../utils"
import PopUp from "../utils/PopUp"
import {Link} from "react-router-dom";
import Cookie from "js-cookie";


const apiUrl= 'https://strapi.luis-backt-und-kocht.de';
//const apiUrl = `${process.env.REACT_APP_BACKEND_URL}`
const strapi = new Strapi(apiUrl);
//console.log("URL", apiUrl)
//console.log("strapi", strapi+'/graphql')

class Register extends React.Component {
    constructor() {
        super()

        this.state = {
           email: "",
           username:"",
           vorname: "",
           nachname:"",
           password:"",
           loading: false,
           popup: false,
           popupMessage:"sdfsdfs"
        }
       
        this.handleChange = this.handleChange.bind(this)
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
        const {username, email, password} = this.state;
        console.log("SUBMIT", email, password)
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
            console.log("SIGN UP!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
          this.setState({ loading: true,
            username: this.state.email });
          const register = await strapi.register(username, email, password);
         // this.setState({ loading: false });
          console.log("REgister", register)
          //setToken(register.jwt);
          Cookie.set("jwt",register.jwt);
         this.redirectUser("/mein-konto")
          } catch (err) {
          this.setState({ loading: false });
          this.showPopUp("Username:", this.state.username);
        }
      };
    
    redirectUser = path => this.props.history.push(path);

    isFormEmpty = ({ username, email, password }) => {
        return !username || !email || !password;
      };
    
      showPopUp = popupMessage => {
        this.setState({ popup: true, popupMessage });
        setTimeout(() => this.setState({ popup: false, popupMessage: "" }), 5000);
      };

    render() {
        const { popupMessage, popup, loading } = this.state;
    return(
        <div>
            <div className="box">
            <PopUp show={popup} message={popupMessage} />
            {loading ? <PopUp show={popup} message="Loading!" /> : ""}
            <p>
            <b>Sie haben noch kein Kundenkonto?</b>
            </p>
            <p className="is-size-7">Dann eröffnen Sie einfach eines. Füllen Sie dazu bitte das folgende Formular aus.</p>
            <form className="has-text-left">
                    <div className="field">
                    <label className="label is-small has-text-left">Ihr Vorname</label>
                              <div className="control">
                                    <input 
                                        className="input is-primary is-small"
                                        type="vorname" 
                                        name="username" 
                                        id="vorname"
                                        placeholder="Vorname" 
                                        
                                        onChange={this.handleChange}
                                    />
                                </div>
                                </div>

                    <div className="field">
                    <label className="label is-small has-text-left">Ihr Nachname</label>
                                <div className="control">
                                    <input 
                                        className="input is-primary is-small"
                                        type="nachname" 
                                        name="nachname" 
                                        id="nachname"
                                        placeholder="Nachname" 
                                        onChange={this.handleChange}
                                    />
                                </div>
                                </div>
                    <div className="field">
                    <label className="label is-small has-text-left">Ihre EMail-Adresse</label>
                    
                                <div className="control">
                                    <input 
                                        className="input is-primary is-small"
                                        type="email" 
                                        name="email" 
                                        id="email"
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
                
                    <button className="button is-primary" onClick={this.handleSubmit} date={this.state}>Konto anlegen</button>
                    
                    </div>
                
                
            </form>
            </div>
                <br/>
               
        </div>
    )
}
}

export default Register