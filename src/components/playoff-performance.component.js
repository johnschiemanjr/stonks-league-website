import React, { Component } from "react";
import axios from "axios";
import WinRateCard from "./win-rate-card.component.js";
import UpperInfoCard from "./upper-info-card.component.js";
import LowerInfoCard from "./lower-info-card.component.js";

export default class PlayoffPerformance extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ownerOverview: {},
            seasons: [],
            isLoading: true,
        };
    }

    async componentDidMount() {
        this.setState({ isLoading: true });

        // Make first two requests
        const ownerOverviewRequestString =
            "http://localhost:5000/ownerOverview/" + this.props.ownerId;
        const [ownerOverviewResponse, seasonsResponse] = await Promise.all([
            axios.get(ownerOverviewRequestString),
            axios.get("http://localhost:5000/seasons/"),
        ]);

        this.setState({
            ownerOverview: ownerOverviewResponse.data,
            seasons: seasonsResponse.data,
            isLoading: false,
        });
    }

    render() {
        if (this.state.isLoading) {
            return <p>Loading ...</p>;
        }

        const wins = this.state.ownerOverview.playoffWins;
        const losses = this.state.ownerOverview.playoffLosses;
        const ties = this.state.ownerOverview.playoffTies;

        var championships = this.state.seasons
            .filter((season) => {
                return season.playoffsChampionId === this.props.ownerId;
            })
            .map((season) => season.year)
            .join(", ");

        var runnerUps = this.state.seasons
            .filter((season) => {
                return season.runnerUpId === this.props.ownerId;
            })
            .map((season) => season.year)
            .join(", ");

        if (championships === undefined || championships.length === 0) {
            championships = "-";
        }

        if (runnerUps === undefined || runnerUps.length === 0) {
            runnerUps = "-";
        }

        return (
            <div className="card">
                <div className="card-header">Playoff Performance</div>
                <div className="row">
                    <WinRateCard
                        title="Win Rate"
                        winPercentage={
                            (
                                Math.round(
                                    (wins / (wins + losses + ties)) * 100 * 100
                                ) / 100
                            ).toFixed(2) + "%"
                        }
                    />
                    <UpperInfoCard title="Wins" content={wins} />
                    <UpperInfoCard title="Losses" content={losses} />
                    <UpperInfoCard title="Ties" content={ties} />
                </div>
                <br />
                <div className="row">
                    <LowerInfoCard
                        title="Championships"
                        content={championships}
                    />
                    <LowerInfoCard title="Runner Up" content={runnerUps} />
                </div>
            </div>
        );
    }
}
