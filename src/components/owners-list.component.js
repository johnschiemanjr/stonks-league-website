import React, { Component } from "react";
import axios from "axios";

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

        this.state = { owners: [] };
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

    render() {
        return (
            <div>
                <h3>Owners</h3>
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
