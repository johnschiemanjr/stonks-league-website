import React, { Component } from "react";
import WinRateCard from "./win-rate-card.component.js";
import UpperInfoCard from "./upper-info-card.component.js";
import LowerInfoCard from "./lower-info-card.component.js";

export default class PlayoffPerformance extends Component {
    render() {
        console.log(this.props);
        console.log(this.props.playoffPerformance.championships.join(", "));
        const wins = this.props.playoffPerformance.wins;
        const losses = this.props.playoffPerformance.losses;
        const ties = this.props.playoffPerformance.ties;
        const championships =
            this.props.playoffPerformance.championships.length !== 0
                ? this.props.playoffPerformance.championships.join(", ")
                : "-";
        const runnerUps =
            this.props.playoffPerformance.runnerups.length !== 0
                ? this.props.playoffPerformance.runnerups.join(", ")
                : "-";
        const appearances = this.props.playoffPerformance.appearances;

        return (
            <div className="card">
                <div className="card-header">Playoff Performance</div>
                <div className="row">
                    <WinRateCard
                        title="Win Rate"
                        winPercentage={
                            wins + losses + ties !== 0
                                ? Math.round(
                                      (wins / (wins + losses + ties)) *
                                          100 *
                                          100
                                  ) / 100
                                : 0
                        }
                    />
                    <UpperInfoCard title="Wins" content={wins} />
                    <UpperInfoCard title="Losses" content={losses} />
                    <UpperInfoCard title="Ties" content={ties} />
                </div>
                <div className="row">
                    <LowerInfoCard title="Appearances" content={appearances} />
                    <LowerInfoCard title="Gunninys" content={championships} />
                    <LowerInfoCard title="Runner Up" content={runnerUps} />
                </div>
            </div>
        );
    }
}
