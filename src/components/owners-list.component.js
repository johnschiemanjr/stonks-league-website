import React, { Component } from "react";
import axios from "axios";
import Select from "react-select";

export default class OwnersList extends Component {
  constructor(props) {
    super(props);

    this.state = { owners: [] };

    this.handleOwnerChange = this.handleOwnerChange.bind(this);
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

  renderOwnerList() {
    return this.state.owners.map((owner) => ({
      label: owner.teamName,
      value: owner,
    }));
  }

  handleOwnerChange(selectedOption) {
    console.log(selectedOption);
  }

  render() {
    return (
      <div>
        <Select
          options={this.renderOwnerList()}
          onChange={this.handleOwnerChange}
        />
      </div>
    );
  }
}
