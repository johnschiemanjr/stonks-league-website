import React, { Component } from "react";
import WinRateCard from "./win-rate-card.component.js";
import UpperInfoCard from "./upper-info-card.component.js";
import LowerInfoCard from "./lower-info-card.component.js";

export default class PlayoffPerformance extends Component {
    render() {
        const wins = this.props.ownerOverview.playoffWins;
        const losses = this.props.ownerOverview.playoffLosses;
        const ties = this.props.ownerOverview.playoffTies;

        var championships = this.props.seasons
            .filter((season) => {
                return season.playoffsChampionId === this.props.ownerId;
            })
            .map((season) => season.year)
            .join(", ");

        var runnerUps = this.props.seasons
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
                            wins + losses + ties !== 0
                                ? (
                                      Math.round(
                                          (wins / (wins + losses + ties)) *
                                              100 *
                                              100
                                      ) / 100
                                  ).toFixed(2) + "%"
                                : (0).toFixed(2) + "%"
                        }
                    />
                    <UpperInfoCard title="Wins" content={wins} />
                    <UpperInfoCard title="Losses" content={losses} />
                    <UpperInfoCard title="Ties" content={ties} />
                </div>
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
