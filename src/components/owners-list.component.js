import React, { Component } from "react";
import axios from "axios";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "../stylesheets/owners-list.css";

import OverviewPane from "./overview-pane.component";

export default class OwnersList extends Component {
  constructor(props) {
    super(props);

    this.state = { owners: [], dropdownOption: "Owner Overview" };

    this.onSelect = this.onSelect.bind(this);
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

  ownerDropdownList() {
    var teamNames = [];
    for (var i = 0; i < this.state.owners.length; i++) {
      teamNames.push(this.state.owners[i].teamName);
    }
    return teamNames;
  }

  onSelect(selection) {
    const owners = this.state.owners.filter((owner) => {
      return owner.teamName === selection.value;
    });
    this.setState({ dropdownOption: owners[0].teamName });
  }

  render() {
    return (
      <div id="parent-div">
        <div id="ownername-div">
          <h3>{this.state.dropdownOption}</h3>
        </div>
        <div id="dropdown-div">
          <Dropdown
            options={this.ownerDropdownList()}
            placeholder="Select Owner"
            onChange={this.onSelect}
            className="ownerDropdown"
          />
        </div>
        <div id="overview-pane-div">
          <OverviewPane />
        </div>
      </div>
    );
  }
}
