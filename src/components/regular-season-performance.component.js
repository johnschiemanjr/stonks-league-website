import React, { Component } from "react";
import WinRateCard from "./win-rate-card.component.js";
import UpperInfoCard from "./upper-info-card.component.js";
import LowerInfoCard from "./lower-info-card.component.js";

export default class RegularSeasonPerformance extends Component {
    render() {
        const wins = this.props.ownerOverview.regWins;
        const losses = this.props.ownerOverview.regLosses;
        const ties = this.props.ownerOverview.regTies;

        var championships = this.props.seasons
            .filter((season) => {
                return season.regularSeasonChampionId === this.props.ownerId;
            })
            .map((season) => season.year)
            .join(", ");

        var lastPlaces = this.props.seasons
            .filter((season) => {
                return season.lastPlaceId === this.props.ownerId;
            })
            .map((season) => season.year)
            .join(", ");

        if (championships === undefined || championships.length === 0) {
            championships = "-";
        }

        if (lastPlaces === undefined || lastPlaces.length === 0) {
            lastPlaces = "-";
        }

        return (
            <div className="card">
                <div className="card-header">Regular Season Performance</div>
                <div className="row">
                    <WinRateCard
                        title="Win Rate"
                        winPercentage={
                            wins + losses + ties != 0
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
                        title="Regular Season Championships"
                        content={championships}
                    />
                    <LowerInfoCard
                        title="Last Place Finishes"
                        content={lastPlaces}
                    />
                </div>
            </div>
        );
    }
}
