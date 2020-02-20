import React from "react"
import {Markdown} from"react-showdown"

function ItineraryCard(props) {
  
  const descMarkDown = props.description
  
  return (
    <div className="column is-one-fifth">
      <div className="card rounded has-background-white has-text-black">
       <div className="has-ribbon-left">
        <div className="ribbon is-outline is-primary">{props.title}</div>
        </div>
        <div className="card-content">
           <div className="content is-size-7 has-text-left it-list">
           <br /> 
           <Markdown markup={descMarkDown} />
            <br />
            
          </div>
        </div>
        
      </div>
      </div>
    
  );
}

export default ItineraryCard;