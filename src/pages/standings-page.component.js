import React, { Component } from "react";
import Select from "react-select";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

const SERVER_IP = "192.168.0.13";

const StandingsRow = (props) => (
    <tr>
        <td>1</td>
        <td>{props.teamName}</td>
        <td>103</td>
        <td>16</td>
        <td>2</td>
        <td>3-3</td>
        <td>.571</td>
        <td>12652.65</td>
        <td>12846.12</td>
    </tr>
);

export default class Standings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            owners: [],
            seasons: [],
            isLoading: true,
        };
    }

    async componentDidMount() {
        this.setState({ isLoading: true });

        const [ownersResponse, seasonsResponse] = await Promise.all([
            axios.get("http://" + SERVER_IP + ":5000/owners"),
            axios.get("http://" + SERVER_IP + ":5000/seasons/"),
        ]);

        this.setState({
            owners: ownersResponse.data,
            isLoading: false,
            seasons: seasonsResponse.data,
        });
    }

    getRows() {
        return this.state.owners.map((owner) => {
            return (
                <StandingsRow teamName={owner.teamName} key={owner.ownerId} />
            );
        });
    }

    renderSeasonsList() {
        let seasonsArray = [];
        seasonsArray.push({
            label: "All",
            value: 0,
        });
        return seasonsArray.concat(
            this.state.seasons.map((season) => ({
                label: season.year,
                value: season.year,
            }))
        );
    }

    render() {
        if (this.state.isLoading) {
            return (
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            );
        }

        const customStyles = {
            option: (provided, state) => ({
                ...provided,
                color: state.isSelected ? "blue" : "black",
                padding: 20,
            }),
        };

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-11 mt-3">
                        <div className="card">
                            <div className="card-header">
                                <div>
                                    <Select
                                        options={this.renderSeasonsList()}
                                        styles={customStyles}
                                        defaultValue={{
                                            label: "All",
                                            value: 0,
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="card text-white bg-dark">
                                <div className="table-responsive">
                                    <table className="table table-dark table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">Rank</th>
                                                <th scope="col">Team</th>
                                                <th scope="col">W</th>
                                                <th scope="col">L</th>
                                                <th scope="col">T</th>
                                                <th scope="col">Division</th>
                                                <th scope="col">PCT</th>
                                                <th scope="col">PF</th>
                                                <th scope="col">PA</th>
                                            </tr>
                                        </thead>
                                        <tbody>{this.getRows()}</tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
