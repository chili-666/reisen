import React from "react"

const PopUp = ({ show, message}) =>
    show && (
<div className="modal">
  
  <div className="modal-content">
      <div className="box  has-background-warning has-text-black is-size-6">
    {message}
    </div>
    </div>
  </div>
  
    )

    export default PopUp