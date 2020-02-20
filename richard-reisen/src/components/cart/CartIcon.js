import React from "react"
import { FaLuggageCart } from "react-icons/fa";


function CartIcon(props) {
    return (
        <button className="button has-badge-rounded has-badge-danger" data-badge="8"><FaLuggageCart /></button>
    )
}


export default CartIcon