import React, { Component } from "react";
import Select from "react-select";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

const SERVER_IP = "192.168.0.13";

const StandingsRow = (props) => (
    <tr>
        <td>{props.rank}</td>
        <td>{props.teamName}</td>
        <td>{props.wins}</td>
        <td>{props.losses}</td>
        <td>{props.ties}</td>
        <td>
            {props.divisionWins}-{props.divisionLosses}-{props.divisionTies}
        </td>
        <td>
            {(props.wins / (props.wins + props.losses + props.ties)).toFixed(3)}
        </td>
        <td>{props.pointsFor.toFixed(2)}</td>
        <td>{props.pointsAgainst.toFixed(2)}</td>
    </tr>
);

export default class Standings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            owners: [],
            seasons: [],
            isLoading: true,
            season: 0,
        };

        this.handleSeasonChange = this.handleSeasonChange.bind(this);
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
        if (this.state.season === 0) {
            //The selection is for All seasons
            return this.state.owners.map((owner) => {
                return (
                    <StandingsRow
                        teamName={owner.teamName}
                        key={owner.ownerId}
                        pointsFor={0}
                        pointsAgainst={0}
                    />
                );
            });
        } else {
            let seasonToDisplay = this.getSeason(this.state.season);
            return seasonToDisplay.owners
                .sort(function (owner1, owner2) {
                    return owner1.seasonRank - owner2.seasonRank;
                })
                .map((owner) => {
                    return (
                        <StandingsRow
                            rank={owner.seasonRank}
                            teamName={this.getOwnerName(owner.ownerId).teamName}
                            wins={owner.wins}
                            losses={owner.losses}
                            ties={owner.ties}
                            divisionWins={owner.divisionWins}
                            divisionLosses={owner.divisionLosses}
                            divisionTies={owner.divisionTies}
                            pointsFor={owner.pointsFor}
                            pointsAgainst={owner.pointsAgainst}
                            key={owner.ownerId}
                        />
                    );
                });
        }
    }

    getSeason(season) {
        return this.state.seasons.find((seasonToFind) => {
            return seasonToFind.year === season;
        });
    }

    getOwnerName(ownerId) {
        return this.state.owners.find((owner) => {
            return owner.ownerId === ownerId;
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

    handleSeasonChange(selectedOption) {
        this.setState({
            season: selectedOption.value,
        });
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
                                        onChange={this.handleSeasonChange}
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
