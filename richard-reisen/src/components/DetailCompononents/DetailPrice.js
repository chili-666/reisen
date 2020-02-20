import React from "react"

function DetailPrice(props) {
    console.log(props)
var price = props.adults * props.adultPrice + props.kids * props.reducedPrice 
    return(
    
        <h1 className="is-size-4 has-text-secondary">Preis: {price}€</h1>)

}


export default DetailPrice