import React from "react"
import Register from "./Register.js"
import Login from "./Login.js"

class CartCustomer extends React.Component {
        constructor() {
            super()
            this.state = {
                tab : true
            }
            this.clickHandler = this.clickHandler.bind(this)
        }
        //console.log("Customer", props.show);

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

        render() {
          
        return (
            <div style={{paddingTop:"1em"}}>
                {this.props.show ?
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
              : ""
                }
            </div>

        );
            }
}

export default CartCustomer;