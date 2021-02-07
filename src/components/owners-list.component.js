import React, { Component } from "react";
import axios from "axios";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "../stylesheets/owners-list.css";

const Owner = (props) => (
  <tr>
    <td>{props.owner.ownerId}</td>
    <td>{props.owner.teamName}</td>
    <td>{props.owner.espnId}</td>
    <td>{props.owner.ownerName}</td>
  </tr>
);

export default class OwnersList extends Component {
  constructor(props) {
    super(props);

    this.state = { owners: [], dropdownOption: "Select Owner" };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/owners/")
      .then((response) => {
        this.setState({ owners: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  ownerList() {
    return this.state.owners.map((currentOwner) => {
      return <Owner owner={currentOwner} key={currentOwner._id} />;
    });
  }

  ownerDropdownList() {
    var teamNames = [];
    for (var i = 0; i < this.state.owners.length; i++) {
      teamNames.push(this.state.owners[i].teamName);
    }
    return teamNames;
  }

  onSelect(selection) {
    console.log("hello");
    console.log(selection);
  }

  render() {
    return (
      <div>
        <h3>John Snowzeliak (PLACEHOLDER)</h3>
        <Dropdown
          options={this.ownerDropdownList()}
          value={this.state.dropdownOption}
          onChange={this._onSelect}
          className="ownerDropdown"
        />
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Team ID</th>
              <th>Team Name</th>
              <th>ESPN ID</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>{this.ownerList()}</tbody>
        </table>
      </div>
    );
  }
}
