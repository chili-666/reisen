import React from "react"
import { FaLuggageCart } from "react-icons/fa";
import { Link} from "react-router-dom"
import {setCart, getCart, getToken } from "../utils";

function CartIcon(props) {
    const cart = getCart()
    
    return (
        <div>
        {cart.adults > 0 ? 
        <Link to="/shopping-cart"><button className="button has-badge-rounded has-badge-danger" data-badge={cart.adults} style={{marginRight:"5px"}}><FaLuggageCart /></button></Link> :
        "" }
        </div>
    )
}


export default CartIcon