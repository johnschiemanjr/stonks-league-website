import React, { Component } from "react";
import axios from "axios";
import "../stylesheets/owner-pane.component.css";
import Select from "react-select";

class InfoCard extends Component {
    render() {
        return (
            <div className="text-center card-body owner-pane-card">
                <div>
                    <div>
                        <div className="owner-pane-header">
                            {this.props.title}:
                        </div>
                        <div>{this.props.content}</div>
                        {typeof this.props.info !== "undefined" && (
                            <div className="owner-pane-info">
                                ({this.props.info})
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default class OverviewPane extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ownerOverview: {},
            owners: [],
            isLoading: true,
            ownerId: 1,
        };

        this.handleOwnerChange = this.handleOwnerChange.bind(this);
    }

    async componentDidMount() {
        this.setState({ isLoading: true });
        console.log("Loading");

        // Make first two requests
        const requestString =
            "http://localhost:5000/boxscores/ownerBoxscores/" +
            this.state.ownerId;
        const [ownerOverviewResponse, ownersResponse] = await Promise.all([
            axios.get(requestString),
            axios.get("http://localhost:5000/owners"),
        ]);

        this.setState({
            ownerOverview: ownerOverviewResponse.data,
            owners: ownersResponse.data,
            isLoading: false,
        });
    }

    renderOwnerList() {
        return this.state.owners.map((owner) => ({
            label: owner.teamName,
            value: owner,
        }));
    }

    handleOwnerChange(selectedOption) {
        const requestString =
            "http://localhost:5000/boxscores/ownerBoxscores/" +
            selectedOption.value.ownerId;
        axios
            .get(requestString)
            .then((response) => {
                this.setState({ ownerOverview: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const customStyles = {
            option: (provided, state) => ({
                ...provided,
                color: state.isSelected ? "blue" : "black",
                padding: 20,
            }),
        };

        if (this.state.isLoading) {
            return <p>Loading ...</p>;
        }

        // Ideas:
        // Expected win loss
        return (
            <div className="card text-white bg-dark">
                <Select
                    options={this.renderOwnerList()}
                    onChange={this.handleOwnerChange}
                    styles={customStyles}
                    default="John Snowzeliak"
                />
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-6">
                            <InfoCard
                                title="Seasons"
                                content={this.state.ownerOverview.seasons}
                            />
                            <InfoCard
                                title="Current Streak"
                                content={
                                    this.state.ownerOverview.streak
                                        .currentStatus +
                                    this.state.ownerOverview.streak
                                        .currentStreak
                                }
                            />
                            <InfoCard
                                title="Average Points"
                                content={(
                                    Math.round(
                                        this.state.ownerOverview.averagePoints *
                                            100
                                    ) / 100
                                ).toFixed(2)}
                            />
                            <InfoCard
                                title="Highest Score"
                                content={(
                                    Math.round(
                                        this.state.ownerOverview.highScore
                                            .score * 100
                                    ) / 100
                                ).toFixed(2)}
                                info={
                                    this.state.ownerOverview.highScore.year +
                                    " Week " +
                                    this.state.ownerOverview.highScore.week +
                                    " vs " +
                                    this.state.owners.find(
                                        (x) =>
                                            x.ownerId ===
                                            this.state.ownerOverview.highScore
                                                .opposingTeam
                                    ).teamName
                                }
                            />
                            <InfoCard
                                title="Total Points"
                                content={(
                                    Math.round(
                                        this.state.ownerOverview.totalPoints *
                                            100
                                    ) / 100
                                ).toFixed(2)}
                            />
                            <InfoCard
                                title="Longest Winning Streak"
                                content={
                                    this.state.ownerOverview.streak.longWinning
                                }
                                info={
                                    this.state.ownerOverview.streak
                                        .longWinningYearStart +
                                    " Week " +
                                    this.state.ownerOverview.streak
                                        .longWinningWeekStart +
                                    " - " +
                                    this.state.ownerOverview.streak
                                        .longWinningYearEnd +
                                    " Week " +
                                    this.state.ownerOverview.streak
                                        .longWinningWeekEnd
                                }
                            />
                            <InfoCard
                                title="Best Win"
                                content={(
                                    Math.round(
                                        this.state.ownerOverview.bestWin
                                            .difference * 100
                                    ) / 100
                                ).toFixed(2)}
                                info={
                                    this.state.ownerOverview.bestWin.year +
                                    " Week " +
                                    this.state.ownerOverview.bestWin.week +
                                    " vs " +
                                    this.state.owners.find(
                                        (x) =>
                                            x.ownerId ===
                                            this.state.ownerOverview.bestWin
                                                .opposingTeam
                                    ).teamName
                                }
                            />
                            <InfoCard
                                title="Worst Loss"
                                content={(
                                    Math.round(
                                        this.state.ownerOverview.worstLoss
                                            .difference * 100
                                    ) / 100
                                ).toFixed(2)}
                                info={
                                    this.state.ownerOverview.worstLoss.year +
                                    " Week " +
                                    this.state.ownerOverview.worstLoss.week +
                                    " vs " +
                                    this.state.owners.find(
                                        (x) =>
                                            x.ownerId ===
                                            this.state.ownerOverview.worstLoss
                                                .opposingTeam
                                    ).teamName
                                }
                            />
                        </div>
                        <div className="col-sm-6">
                            <InfoCard
                                title="All Time Record"
                                content={
                                    this.state.ownerOverview.wins +
                                    "-" +
                                    this.state.ownerOverview.losses +
                                    "-" +
                                    this.state.ownerOverview.ties
                                }
                            />
                            <InfoCard
                                title="All Time Win %"
                                content={(
                                    Math.round(
                                        (this.state.ownerOverview.wins /
                                            (this.state.ownerOverview.wins +
                                                this.state.ownerOverview
                                                    .losses +
                                                this.state.ownerOverview
                                                    .ties)) *
                                            100 *
                                            100
                                    ) / 100
                                ).toFixed(2)}
                            />
                            <InfoCard
                                title="Average Points Against"
                                content={(
                                    Math.round(
                                        this.state.ownerOverview
                                            .averagePointsAgainst * 100
                                    ) / 100
                                ).toFixed(2)}
                            />
                            <InfoCard
                                title="Lowest Score"
                                content={(
                                    Math.round(
                                        this.state.ownerOverview.lowScore
                                            .score * 100
                                    ) / 100
                                ).toFixed(2)}
                                info={
                                    this.state.ownerOverview.lowScore.year +
                                    " Week " +
                                    this.state.ownerOverview.lowScore.week +
                                    " vs " +
                                    this.state.owners.find(
                                        (x) =>
                                            x.ownerId ===
                                            this.state.ownerOverview.lowScore
                                                .opposingTeam
                                    ).teamName
                                }
                            />
                            <InfoCard
                                title="Total Points Against"
                                content={(
                                    Math.round(
                                        this.state.ownerOverview
                                            .totalPointsAgainst * 100
                                    ) / 100
                                ).toFixed(2)}
                            />
                            <InfoCard
                                title="Longest Losing Streak"
                                content={
                                    this.state.ownerOverview.streak.longLosing
                                }
                                info={
                                    this.state.ownerOverview.streak
                                        .longLosingYearStart +
                                    " Week " +
                                    this.state.ownerOverview.streak
                                        .longLosingWeekStart +
                                    " - " +
                                    this.state.ownerOverview.streak
                                        .longLosingYearEnd +
                                    " Week " +
                                    this.state.ownerOverview.streak
                                        .longLosingWeekEnd
                                }
                            />
                            <InfoCard
                                title="Closest Win"
                                content={(
                                    Math.round(
                                        this.state.ownerOverview.closestWin
                                            .difference * 100
                                    ) / 100
                                ).toFixed(2)}
                                info={
                                    this.state.ownerOverview.closestWin.year +
                                    " Week " +
                                    this.state.ownerOverview.closestWin.week +
                                    " vs " +
                                    this.state.owners.find(
                                        (x) =>
                                            x.ownerId ===
                                            this.state.ownerOverview.closestWin
                                                .opposingTeam
                                    ).teamName
                                }
                            />
                            <InfoCard
                                title="Closest Loss"
                                content={(
                                    Math.round(
                                        this.state.ownerOverview.closestLoss
                                            .difference * 100
                                    ) / 100
                                ).toFixed(2)}
                                info={
                                    this.state.ownerOverview.closestLoss.year +
                                    " Week " +
                                    this.state.ownerOverview.closestLoss.week +
                                    " vs " +
                                    this.state.owners.find(
                                        (x) =>
                                            x.ownerId ===
                                            this.state.ownerOverview.closestLoss
                                                .opposingTeam
                                    ).teamName
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
