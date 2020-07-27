import React from "react";
import { FaLuggageCart } from "react-icons/fa";
import {Link, withRouter} from "react-router-dom"
import CartIcon from "./cart/CartIcon"
import { getToken, clearToken, getCart, clearCart } from "./utils";
import Cookie from "js-cookie";



/*const NavBar = () => {
return {getToken() !== null ? <AuthNav /> : <UnAuthNav /> 
console.log("NAVBAR UNAUTH")}
}*/


class NavBar extends React.Component {
  handleSignout = () => {
    clearToken();
    clearCart();
    Cookie.remove('jwt')
    this.props.history.push("/");
  };

  render() {
    return getToken() !== null ? (
      <AuthNav handleSignout={this.handleSignout} />
    ) : (
      <UnAuthNav />
    );
  }
}

const AuthNav = ({ handleSignout }) => (

    <nav
      className="navbar is-white is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <img
            src="https://richard.de/wp-content/uploads/2018/06/sprite.png"
            width="75%"
            height="auto"
          />
        </Link>

        <a
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link to="/" className="navbar-item">Home</Link>

          <Link to="/reisen" className="navbar-item">Reisen</Link>
          <Link to="/angebote" className="navbar-item">Angebote</Link>
          <Link to="/last-minute" className="navbar-item">
            <button className="button is-primary">Last-Minute</button>
          </Link>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">Informationen</a>

            <div className="navbar-dropdown">
              <Link to="/informationen/buchung" className="navbar-item">Buchung</Link>
              <a className="navbar-item">Jobs</a>
              <a className="navbar-item">Kontakt</a>
              <hr className="navbar-divider" />
              <a className="navbar-item">Rufen Sie uns an!</a>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
                <CartIcon/>
                <Link to="/mein-konto"
              className="button is-light">Mein Konto
              </Link>
                <Link to="/"
              className="button is-light" onClick={handleSignout}>Log out
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );

  const UnAuthNav = () => (  
    <nav
      className="navbar is-white is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <img
            src="https://richard.de/wp-content/uploads/2018/06/sprite.png"
            width="75%"
            height="auto"
          />
        </Link>

        <a
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link to="/" className="navbar-item">Home</Link>

          <Link to="/reisen" className="navbar-item">Reisen</Link>
          <Link to="/angebote" className="navbar-item">Angebote</Link>
          <Link to="/last-minute" className="navbar-item">
            <button className="button is-primary">Last-Minute</button>
          </Link>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">Informationen</a>

            <div className="navbar-dropdown">
              <Link to="/informationen/buchung" className="navbar-item">Buchung</Link>
              <a className="navbar-item">Jobs</a>
              <a className="navbar-item">Kontakt</a>
              <hr className="navbar-divider" />
              <a className="navbar-item">Rufen Sie uns an!</a>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
                {getCart() !== null ? <CartIcon/ > : ""}
                <Link to="/register"
              className="button is-light">Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  ); 



export default withRouter(NavBar);
