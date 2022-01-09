import React, { Component } from "react";
import axios from "axios";
import OverviewPane from "../components/overview-pane.component.js";
import RegularSeasonPerformance from "../components/regular-season-performance.component.js";
import PlayoffPerformance from "../components/playoff-performance.component.js";
import Spinner from "react-bootstrap/Spinner";

const SERVER_IP = "192.168.0.13";

export default class OwnerPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ownerOverview: {},
            owners: [],
            isLoading: true,
            ownerId: "718800178789810176",
            seasons: [],
            playoffPerformance: {},
        };

        this.handleOwnerChange = this.handleOwnerChange.bind(this);
    }

    async componentDidMount() {
        this.setState({ isLoading: true });

        // Make first two requests
        const requestString =
            "http://" + SERVER_IP + ":5000/ownerOverview/" + this.state.ownerId;
        const playoffPerformanceRequest =
            "http://" +
            SERVER_IP +
            ":5000/playoffPerformance/" +
            this.state.ownerId;
        const [
            ownerOverviewResponse,
            playoffPerformanceResponse,
            ownersResponse,
            seasonsResponse,
        ] = await Promise.all([
            axios.get(requestString),
            axios.get(playoffPerformanceRequest),
            axios.get("http://" + SERVER_IP + ":5000/owners"),
            axios.get("http://" + SERVER_IP + ":5000/seasons/"),
        ]);

        this.setState({
            ownerOverview: ownerOverviewResponse.data,
            owners: ownersResponse.data,
            isLoading: false,
            seasons: seasonsResponse.data,
            playoffPerformance: playoffPerformanceResponse.data,
        });
    }

    handleOwnerChange(selectedOption) {
        const requestString =
            "http://" +
            SERVER_IP +
            ":5000/ownerOverview/" +
            selectedOption.value.ownerId;
        const playoffPerformanceRequest =
            "http://" +
            SERVER_IP +
            ":5000/playoffPerformance/" +
            selectedOption.value.ownerId;
        let urls = [requestString, playoffPerformanceRequest];

        let requests = urls.map((url) => {
            return axios.get(url);
        });

        Promise.all(requests)
            .then((responses) => {
                this.setState({
                    ownerOverview: responses[0].data,
                    ownerId: selectedOption.value.ownerId,
                    playoffPerformance: responses[1].data,
                });
            })
            .catch((err) => {
                console.log(err);
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

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-4 m-3">
                        <OverviewPane
                            ownerId={this.state.ownerId}
                            ownerOverview={this.state.ownerOverview}
                            owners={this.state.owners}
                            handleOwnerChange={this.handleOwnerChange}
                        />
                    </div>
                    <div className="col-sm-7 mt-3">
                        <div className="container">
                            <div className="mb-3">
                                <RegularSeasonPerformance
                                    ownerId={this.state.ownerId}
                                    ownerOverview={this.state.ownerOverview}
                                    seasons={this.state.seasons}
                                />
                            </div>
                            <div className="mb-3">
                                <PlayoffPerformance
                                    playoffPerformance={
                                        this.state.playoffPerformance
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
