import React from "react"


class Companion extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            kids: 0,
            adults: 0
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.setState({
            kids: this.props.kids,
            adults: this.props.adults
        })
    }

    handleChange(event) {
        
        event.persist();
        const {name, value} = event.target
        
        this.setState({
            [name] : value,
                })
       console.log(name, value)
        this.props.handleCompanions(name, value)
    }

    render() {
        
        let travellers = []
        for (let i = 1; i < this.state.adults; i++) {
            travellers.push(i)
        }
        const repeater = () => {
            return (
             <div>
                {travellers.map(i => {
                  return (
                    <form key={i}>
                    <div className="columns">
                        <div className="column is-two-thirds">
                            <label className="label is-small has-text-left">Name</label>
                            <div className="control">
                            <input className="input is-small is-primary" name={`adult${i}`} type="text" placeholder="Name" onChange={this.handleChange} onBlur={this.handleChange} />
                            </div>
                        </div>
                        <div className="column">
                        
                        </div>
                    </div>
                </form>

                  )
                })}
              </div>
            );
          };

        let travelKids = []
        for (let i = 1; i <= this.state.kids; i++) {
            travelKids.push(i)
        }

        const repeatKids = () => {
            return (
             <div>
                {travelKids.map(i => {
                  return (
                    <form>
                                       <div className="columns">
                                            <div className="column is-two-thirds">
                                                <label className="label is-small has-text-left">Name des Kindes</label>
                                                <div className="control">
                                                <input className="input is-small is-primary" name={`kid${i}`} type="text" placeholder="Name des Kindes" onChange={this.handleChange} onBlur={this.handleChange}/>
                                                </div>
                                            </div>
                                                                                   </div>
                                    </form>

                  )
                })}
              </div>
            );
          };
        return (
            <div className="container" style={{marginTop:"1em"}}>
                                <div className="box has-background-grey-lighter is-shadowless">
                                    <div className="is-size-5 has-text-black">Mitreisende Personen </div>
                                    {this.state.kids > 0 ? 
                                    <div className="container">
                                        <div className="box is-shadowless">
                                            <div className="has-text-weight-semibold has-text-left has-text-black">
                                            Kinder:
                                            </div>
                                    {repeatKids()}
                                    </div>
                                    </div>
                                    : ""}
                                    {this.state.adults > 1 ?
                                     <div className="container" style={{marginTop:"1em"}}>
                                     <div className="box is-shadowless">
                                         <div className="has-text-weight-semibold has-text-left has-text-black">
                                         Erwachsene:
                                         </div>
                                         {repeater()}
                                
                                
                                 </div>
                                 </div>
                                 : ""}
                                </div>
                                
            </div>
           
        )
    }
}

export default Companion