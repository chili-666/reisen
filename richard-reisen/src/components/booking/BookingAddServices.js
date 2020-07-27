import React from "react"

class BookingAddServices extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            loading:true
        }
        this.handleChange = this.handleChange.bind(this) 
    }

componentDidMount(props) {
    this.setState({
        parentData: this.props.handleAddServices,
        
        loading:false})
        
}

handleChange(event) {
    event.persist();
    const {name, value} = event.target
    
    this.setState({
        [name] : value,
            })
    console.log("STATE", this.state )
    this.props.handleAddServices(name, value)
}

render() {
       //Additional Services
       let addServices
       addServices = this.props.services.map(addService => {
         //  console.log("AddService", addService.nameService, addService.type)
          return <div className="field" key={addService.nameService}>
          <label className="label is-small">{addService.beschreibung}</label>
          <div className="control">
          <input className={addService.type} type={addService.type} name={addService.TextBuchung} onChange={this.handleChange}/>
          </div>
          </div>    
       });
    
       console.log("This.State", this.state)
    return ( 
    <div className="container is-fluid" style={{marginTop:"2em"}}>
    <div className="box">
    <h1 className="is-size-4">Weitere Dienstleistungen:</h1>
    <div className="container is-fluid is-size-7 has-text-left">
        <form>
           
        <div className="columns">
            <div className="column">
            {this.state.loading ? "" : addServices}
            </div>
            <div className="column">
            <div className="field">
                    <label className="label is-small">Ihre Nachricht an uns:</label>
                    <div className="control">
                    <textarea className="textarea is-small is-primary" placeholder="Max. 10 Zeilen" rows="10"></textarea>
                    </div>
            </div>
            </div>
       </div>
       </form>
    </div>
    </div>
    </div>
    )
}

}

export default BookingAddServices