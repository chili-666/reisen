import React from "react";
import { FaSuitcase } from "react-icons/fa";
import {Link} from "react-router-dom";

function TripCard(props) {
  //console.log("CardProps", props)
   var abfahrtDatum = new Date(props.departure)
  var abfahrtJahr = abfahrtDatum.getFullYear()
  var abfahrtMonat = abfahrtDatum.getMonth()
  var abfahrtTag = abfahrtDatum.getDate()

  var returnDatum = new Date(props.return)
  var returnJahr = returnDatum.getFullYear()
  var returnMonat = returnDatum.getMonth()+1
  var returnTag = returnDatum.getDate()
   
  return (
    <div className="column is-one-quarter">
      <div className="card trip">
      <Link to={`/reisen/${props.id}`}>
        <div className="card-image has-ribbon">
        {props.seats < 10 ? <div className="ribbon is-small is-danger">Nur noch wenige Plätze</div> : null}
        <div className="ribbon is-small is-left is-bottom is-primary">{props.name}</div>
          <figure className="image">
            <img
              src={props.hero}
              alt="Placeholder image"
            />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-left">
             
            </div>
            <div className="media-content">
              <p className="title is-4 has-text-centered">{props.title}</p>
              <p className="subtitle is-6"></p>
            </div>
          </div>

          <div className="content">
            {props.desc}
            <br />
            <div className="is-size-7 has-text-grey">Nächster Reisetermin:</div>
            <time dateTime="01.01.2016" className="is-size-7 has-text-grey">{abfahrtTag}.{abfahrtMonat}.{abfahrtJahr} - {returnTag}.{returnMonat}.{returnJahr}</time>
          </div>
          
        </div>
        </Link>
      </div>
    </div>
  );
}

export default TripCard;
