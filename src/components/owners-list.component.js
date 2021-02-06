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

    this.state = { owners: [], defaultOption: "one" };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/owners/")
      .then((response) => {
        console.log(response);
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
    return ["one", "two", "three"];
  }

  render() {
    return (
      <div>
        <h3>John Snowzeliak (PLACEHOLDER)</h3>
        <Dropdown
          options={this.ownerDropdownList()}
          value={this.state.defaultOption}
          placeholder="Select an option"
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
