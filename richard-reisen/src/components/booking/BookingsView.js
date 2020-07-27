import React from "react"
import Cookie from "js-cookie";
import Strapi from "strapi-sdk-javascript/build/main"
import axios from "axios"



class BookingsView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            token: Cookie.get('jwt'),
            loading: true
        }
    }
    

   async componentWillMount(props) {
        let bookings = []
        let singleBooking
        this.setState({loading: true})
        axios
            .get("https://strapi.luis-backt-und-kocht.de/bookings")
            .then(response => {
                console.log("RESPONSE", response)
                this.setState({ data: response.data})
                this.state.data.forEach((booking) => {
                  console.log("ForEach", booking.user.username)
                      if (booking.user.username === this.props.user) {
                       bookings.push(booking) 
                    })
                    this.setState({userBookings: bookings}),
                this.state.userBookings.map(booking => (
                   console.log("SingleBooking", booking, this.state.loading),
                singleBooking = booking.trip.title
                 ))
                
                 console.log("BOOKINGCODE", singleBooking, this.state.loading)
                 let testVar = singleBooking
                 console.log("TESTVar", testVar)
                 this.setState({loading: false})
            })
            .catch(error => {
                // Handle error.
                console.log('Buchungsfehler occurred:', error);
            });
        }
    }
        
   



    render() {
        let test = this.singleBooking

        {this.state.loading ? console.log("Render lädt") :console.log("REnder", this.state.loading, test)}
        return (
            <div className="container">
                <div className="title">Meine Buchung {this.state.loading ? console.log("BookingView ldt") : console.log("BOOKINGS", this.singleBooking)}</div>
               <div className="box has-background-warning">Zefix {this.singleBooking}{this.props.user}</div>
            </div>

        )
    }
}

export default BookingsView