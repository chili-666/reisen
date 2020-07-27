import React from "react"
import Strapi from "strapi-sdk-javascript/build/main"
import axios from "axios"

class BookingButton extends React.Component  {
    constructor(props) {
        super(props)
    }
clickHandler(props) {
console.log("Passed Token", this.props)
    //    const { data } = await axios.get('http://localhost:1337/bookings', {
//  headers: {
//    Authorization:
//      'Bearer ',
//  },
//});
}

//console.log(data);

   /* GraphQL not Working!
    clickHandler(props) {
        const apiUrl= 'https://strapi.luis-backt-und-kocht.de';
        //const apiUrl = `${process.env.REACT_APP_BACKEND_URL}`
        const strapi = new Strapi(apiUrl);
        //console.log("URL", apiUrl)
        //console.log("strapi", strapi+'/graphql')
                try{
                const response = strapi.request('POST', '/graphql', {
                  mutation: {
                    createBooking:` (input: {data: {booking_id:14, user:3, trip:3, travellers:{traveller_Name:"sepp", traveller_Age:"42"}}}) {
                          booking {
                            booking_id
                            user {id
                            username}
                            trip {id}
                            travellers{traveller_Name}
                          }}
                        }`
                  }
        
                });
               console.log("response",response.data)
              //  this.setState({ 
              //    trips: response.data.trips,
              //    loading: false})
            } catch(err) {
              console.error(err) };
            }
            */




    
    render() {
        console.log("BookingButton", this.props)
        return (
            <div className="column">
            <div className="box is-shadowless has-background-primary">
                <button className="button is-danger has-text-white" onClick={this.clickHandler}>Jetzt buchen!</button>
                
            </div>
            
        </div>
        )
    }
}

export default BookingButton