import React, { Component } from "react";
import axios from "axios";
import Select from "react-select";
import Spinner from "react-bootstrap/Spinner";

import "../stylesheets/head-to-head-page.css";
import HeadToHeadResults from "../components/head-to-head-results.component.js";
import GameLog from "../components/game-log.component.js";

const SERVER_IP = "192.168.0.13";

export default class HeadToHeadPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            headToHeadResult: {},
            owners: [],
            isLoading: true,
            owner1Id: 0,
            owner2Id: 0,
        };

        this.handleOwner1Change = this.handleOwner1Change.bind(this);
        this.handleOwner2Change = this.handleOwner2Change.bind(this);
        // this.getHeadToHeadResults = this.getHeadToHeadResults.bind(this);
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        const requestString = "http://" + SERVER_IP + ":5000/owners/";
        axios
            .get(requestString)
            .then((response) => {
                this.setState({
                    owners: response.data,
                });
            })
            .catch((error) => {
                console.log(error);
            });

        this.setState({
            isLoading: false,
        });
    }

    handleOwner1Change(selectedOption) {
        this.setState({ owner1Id: selectedOption.value.ownerId }, () => {
            if (this.state.owner2Id !== 0) {
                this.getHeadToHeadResults();
            }
        });
    }

    handleOwner2Change(selectedOption) {
        this.setState({ owner2Id: selectedOption.value.ownerId }, () => {
            if (this.state.owner1Id !== 0) {
                this.getHeadToHeadResults();
            }
        });
    }

    getHeadToHeadResults() {
        const requestString =
            "http://" +
            SERVER_IP +
            ":5000/headToHead/owner1/" +
            this.state.owner1Id +
            "/owner2/" +
            this.state.owner2Id;
        axios
            .get(requestString)
            .then((response) => {
                this.setState({
                    headToHeadResult: response.data,
                });
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
                    <div className="col-sm-7 m-3">
                        <div className="row">
                            <div className="col-6 team-select">
                                <Select
                                    options={this.renderOwnerList()}
                                    onChange={this.handleOwner1Change}
                                    styles={customStyles}
                                    placeholder={"Team 1"}
                                />
                            </div>
                            <div className="col-6 team-select">
                                <Select
                                    options={this.renderOwnerList()}
                                    onChange={this.handleOwner2Change}
                                    styles={customStyles}
                                    placeholder={"Team 2"}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <HeadToHeadResults
                                headToHead={this.state.headToHeadResult}
                            />
                        </div>
                    </div>
                    <div className="col-sm-4 m-3">
                        <GameLog
                            gameLogs={this.state.headToHeadResult.scores}
                            owner1={this.state.owners.find((owner) => {
                                return owner.ownerId === this.state.owner1Id;
                            })}
                            owner2={this.state.owners.find((owner) => {
                                return owner.ownerId === this.state.owner2Id;
                            })}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
