import React from "react"
import {Markdown} from"react-showdown"
import { GiConsoleController } from "react-icons/gi";
const apiUrl= 'https://strapi.luis-backt-und-kocht.de';

class ItineraryCard extends React.Component {
    constructor(props) {
      super(props)
    }
  


    handleClose(event) {
      console.log("Close-Event", event.target.id)
      document.getElementById(event.target.id).classList.toggle("is-active")
    } 


  render() {
    const descMarkDown = this.props.description
    console.log("ItineraryCardProps", this.props)
    var dayPic = this.props.pics.map(pic => (
     // console.log("ItineraryPic", pic.url, ),
     <div>
     <div class="modal is-clipped" id={pic.id}>
     <div class="modal-background"></div>
     <div class="modal-content">
     <img src={`${apiUrl}${pic.url}`} />
     </div>
     <button class="modal-close is-large" aria-label="close" onClick={this.handleClose} id={pic.id}></button>
  </div>
     <img src={`${apiUrl}${pic.url}`} onClick={this.handleClose} id={pic.id}/>
     </div>
      ));
  
  return (
    <div className="column is-one-quarter">
      <div className="card rounded has-background-white has-text-black">
       <div className="has-ribbon-left">
        <div className="ribbon is-outline is-primary">{this.props.title}</div>
        </div>
        <div className="card-content">
           <div className="content is-size-7 has-text-left it-list">
           <br /> 
           <Markdown markup={descMarkDown} />
            <br />
            {dayPic}
          </div>
        </div>
        
      </div>
      </div>
    
  );
}
}

export default ItineraryCard;