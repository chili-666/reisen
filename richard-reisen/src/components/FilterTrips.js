import React from "react";
import { FiGrid } from "react-icons/fi";
import { FaAngleDown } from "react-icons/fa";

class FilterTrips extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
  console.log("FilterProps", this.props)
  return (
    <nav className="level">
      <div className="level-left">
        <div className="level-item">
          <p className="subtitle is-5">
            <strong>{this.props.count}</strong> Reisen
          </p>
        </div>
        <div className="level-item">
          <div className="field has-addons">
            <p className="control">
              <input
                className="input"
                type="text"
                placeholder="Reise finden..."
              />
            </p>
            <p className="control">
              <button className="button">Suchen</button>
            </p>
          </div>
        </div>
        <div className="level-item">
          <div className="dropdown is-hoverable">
            <div className="dropdown-trigger">
              <button
                className="button"
                aria-haspopup="true"
                aria-controls="dropdown-menu4"
              >
                <span>Filter</span>
                <span className="icon is-small">
                  <FaAngleDown />
                </span>
              </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu4" role="menu">
              <div className="dropdown-content">
                <div className="dropdown-item">
                  <p>
                    Hier kommen <strong>Filter</strong> hin, wie z.B. nach
                    Reiseland, Region etc.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="level-right has-text-primary">
        <button className="level-item button is-active" onClick = {() => this.props.handler(0)}>Alle</button>
        <button className="level-item button is-primary" onClick = {() => this.props.handler(2)}>Tagesreisen</button>
        <button className="level-item button is-primary" onClick = {() => this.props.handler(3)}>
          Wochenendausflüge
        </button>
        <button className="level-item button is-primary" onClick = {() => this.props.handler(4)}>
          Mehrtagesreisen
        </button>
      </div>
    </nav>
  );
}
}

export default FilterTrips;
