import React, { Component } from "react";
import "../stylesheets/owner-pane.component.css";
import Select from "react-select";

class InfoCard extends Component {
    render() {
        return (
            <div className="text-center card-body owner-pane-card">
                <div>
                    <div>
                        <div className="header">{this.props.title}:</div>
                        <div>{this.props.content}</div>
                        {typeof this.props.info !== "undefined" && (
                            <div className="info">({this.props.info})</div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default class OverviewPane extends Component {
    renderOwnerList() {
        return this.props.owners.map((owner) => ({
            label: owner.teamName,
            value: owner,
        }));
    }

    render() {
        const customStyles = {
            option: (provided, state) => ({
                ...provided,
                color: state.isSelected ? "blue" : "black",
                padding: 20,
            }),
        };

        const wins =
            this.props.ownerOverview.regWins +
            this.props.ownerOverview.playoffWins;
        const losses =
            this.props.ownerOverview.regLosses +
            this.props.ownerOverview.playoffLosses;
        const ties =
            this.props.ownerOverview.regTies +
            this.props.ownerOverview.playoffTies;

        // Ideas:
        // Expected win loss
        // A new panel to display gamelogs by season, maybe a seson summary
        // Playoff appearances
        return (
            <div className="card text-white bg-dark">
                <Select
                    options={this.renderOwnerList()}
                    onChange={this.props.handleOwnerChange}
                    styles={customStyles}
                    defaultValue={{ label: "John Snowzeliak", value: 0 }}
                />
                <div className="card-body">
                    <div className="row">
                        <div className="col-6">
                            <InfoCard
                                title="Seasons"
                                content={this.props.ownerOverview.seasons}
                            />
                            <InfoCard
                                title="Current Streak"
                                content={
                                    this.props.ownerOverview.streak
                                        .currentStatus +
                                    this.props.ownerOverview.streak
                                        .currentStreak
                                }
                            />
                            <InfoCard
                                title="Average Points"
                                content={(
                                    Math.round(
                                        this.props.ownerOverview.averagePoints *
                                            100
                                    ) / 100
                                ).toFixed(2)}
                            />
                            <InfoCard
                                title="Highest Score"
                                content={(
                                    Math.round(
                                        this.props.ownerOverview.highScore
                                            .score * 100
                                    ) / 100
                                ).toFixed(2)}
                                info={
                                    this.props.ownerOverview.highScore.year +
                                    " Week " +
                                    this.props.ownerOverview.highScore.week +
                                    " vs " +
                                    this.props.owners.find(
                                        (x) =>
                                            x.ownerId ===
                                            this.props.ownerOverview.highScore
                                                .opposingTeam
                                    ).teamName
                                }
                            />
                            <InfoCard
                                title="Total Points"
                                content={(
                                    Math.round(
                                        this.props.ownerOverview.totalPoints *
                                            100
                                    ) / 100
                                ).toFixed(2)}
                            />
                            <InfoCard
                                title="Longest Winning Streak"
                                content={
                                    this.props.ownerOverview.streak.longWinning
                                }
                                info={
                                    this.props.ownerOverview.streak
                                        .longWinningYearStart +
                                    " Week " +
                                    this.props.ownerOverview.streak
                                        .longWinningWeekStart +
                                    " - " +
                                    this.props.ownerOverview.streak
                                        .longWinningYearEnd +
                                    " Week " +
                                    this.props.ownerOverview.streak
                                        .longWinningWeekEnd
                                }
                            />
                            <InfoCard
                                title="Best Win"
                                content={(
                                    Math.round(
                                        this.props.ownerOverview.bestWin
                                            .difference * 100
                                    ) / 100
                                ).toFixed(2)}
                                info={
                                    this.props.ownerOverview.bestWin.year +
                                    " Week " +
                                    this.props.ownerOverview.bestWin.week +
                                    " vs " +
                                    this.props.owners.find(
                                        (x) =>
                                            x.ownerId ===
                                            this.props.ownerOverview.bestWin
                                                .opposingTeam
                                    ).teamName
                                }
                            />
                            <InfoCard
                                title="Worst Loss"
                                content={(
                                    Math.round(
                                        this.props.ownerOverview.worstLoss
                                            .difference * 100
                                    ) / 100
                                ).toFixed(2)}
                                info={
                                    this.props.ownerOverview.worstLoss.year +
                                    " Week " +
                                    this.props.ownerOverview.worstLoss.week +
                                    " vs " +
                                    this.props.owners.find(
                                        (x) =>
                                            x.ownerId ===
                                            this.props.ownerOverview.worstLoss
                                                .opposingTeam
                                    ).teamName
                                }
                            />
                        </div>
                        <div className="col-6">
                            <InfoCard
                                title="All Time Record"
                                content={wins + "-" + losses + "-" + ties}
                            />
                            <InfoCard
                                title="All Time Win %"
                                content={(
                                    Math.round(
                                        (wins / (wins + losses + ties)) *
                                            100 *
                                            100
                                    ) / 100
                                ).toFixed(2)}
                            />
                            <InfoCard
                                title="Average Points Against"
                                content={(
                                    Math.round(
                                        this.props.ownerOverview
                                            .averagePointsAgainst * 100
                                    ) / 100
                                ).toFixed(2)}
                            />
                            <InfoCard
                                title="Lowest Score"
                                content={(
                                    Math.round(
                                        this.props.ownerOverview.lowScore
                                            .score * 100
                                    ) / 100
                                ).toFixed(2)}
                                info={
                                    this.props.ownerOverview.lowScore.year +
                                    " Week " +
                                    this.props.ownerOverview.lowScore.week +
                                    " vs " +
                                    this.props.owners.find(
                                        (x) =>
                                            x.ownerId ===
                                            this.props.ownerOverview.lowScore
                                                .opposingTeam
                                    ).teamName
                                }
                            />
                            <InfoCard
                                title="Total Points Against"
                                content={(
                                    Math.round(
                                        this.props.ownerOverview
                                            .totalPointsAgainst * 100
                                    ) / 100
                                ).toFixed(2)}
                            />
                            <InfoCard
                                title="Longest Losing Streak"
                                content={
                                    this.props.ownerOverview.streak.longLosing
                                }
                                info={
                                    this.props.ownerOverview.streak
                                        .longLosingYearStart +
                                    " Week " +
                                    this.props.ownerOverview.streak
                                        .longLosingWeekStart +
                                    " - " +
                                    this.props.ownerOverview.streak
                                        .longLosingYearEnd +
                                    " Week " +
                                    this.props.ownerOverview.streak
                                        .longLosingWeekEnd
                                }
                            />
                            <InfoCard
                                title="Closest Win"
                                content={(
                                    Math.round(
                                        this.props.ownerOverview.closestWin
                                            .difference * 100
                                    ) / 100
                                ).toFixed(2)}
                                info={
                                    this.props.ownerOverview.closestWin.year +
                                    " Week " +
                                    this.props.ownerOverview.closestWin.week +
                                    " vs " +
                                    this.props.owners.find(
                                        (x) =>
                                            x.ownerId ===
                                            this.props.ownerOverview.closestWin
                                                .opposingTeam
                                    ).teamName
                                }
                            />
                            <InfoCard
                                title="Closest Loss"
                                content={(
                                    Math.round(
                                        this.props.ownerOverview.closestLoss
                                            .difference * 100
                                    ) / 100
                                ).toFixed(2)}
                                info={
                                    this.props.ownerOverview.closestLoss.year +
                                    " Week " +
                                    this.props.ownerOverview.closestLoss.week +
                                    " vs " +
                                    this.props.owners.find(
                                        (x) =>
                                            x.ownerId ===
                                            this.props.ownerOverview.closestLoss
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
