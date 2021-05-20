import React, { Component } from "react";

class HeadToHeadRow extends Component {
    render() {
        var team1Info;
        var team2Info;
        if (
            this.props.team1Info != null &&
            this.props.team1Info.trim() !== ""
        ) {
            team1Info = "(" + this.props.team1Info + ")";
        }
        if (
            this.props.team2Info != null &&
            this.props.team2Info.trim() !== ""
        ) {
            team2Info = "(" + this.props.team2Info + ")";
        }
        return (
            <div className="text-center">
                <div>
                    <div>
                        <div className="header m-4">{this.props.title}</div>
                        <div className="container">
                            <div className="row">
                                <div className="card text-white bg-dark col-6 head-to-head-result ">
                                    {this.props.team1Result}
                                    {typeof this.props.team1Info !==
                                        "undefined" && (
                                        <div className="info">{team1Info}</div>
                                    )}
                                </div>
                                <div className="card text-white bg-dark col-6 head-to-head-result ">
                                    {this.props.team2Result}
                                    {typeof this.props.team2Info !==
                                        "undefined" && (
                                        <div className="info">{team2Info}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default class HeadToHeadResults extends Component {
    render() {
        if (!this.props.headToHead.owner1 || !this.props.headToHead.owner2) {
            return (
                <div className="col-sm-12">
                    <div className="card bg-dark placeholder"></div>
                </div>
            );
        }
        const owner1 = this.props.headToHead.owner1;
        const owner2 = this.props.headToHead.owner2;

        const owner1CurrentStreak =
            owner1.currentStreak > 0
                ? "W" + owner1.currentStreak
                : "L" + owner2.currentStreak;
        const owner2CurrentStreak =
            owner2.currentStreak > 0
                ? "W" + owner2.currentStreak
                : "L" + owner1.currentStreak;

        const owner1BestWinInfo = owner1.bestWin.week
            ? owner1.bestWin.year + " Week " + owner1.bestWin.week
            : "";
        const owner2BestWinInfo = owner2.bestWin.week
            ? owner2.bestWin.year + " Week " + owner2.bestWin.week
            : "";
        const owner1ClosestWinInfo = owner1.closestWin.week
            ? owner1.closestWin.year + " Week " + owner1.closestWin.week
            : "";
        const owner2ClosestWinInfo = owner2.closestWin.week
            ? owner2.closestWin.year + " Week " + owner2.closestWin.week
            : "";

        return (
            <div className="col-sm-12">
                <div className="card text-white bg-dark">
                    <div className="card-body">
                        <HeadToHeadRow
                            title="Overall Record"
                            team1Result={
                                owner1.wins +
                                "-" +
                                owner1.losses +
                                "-" +
                                owner1.ties
                            }
                            team2Result={
                                owner2.wins +
                                "-" +
                                owner2.losses +
                                "-" +
                                owner2.ties
                            }
                        />
                        <HeadToHeadRow
                            title="Current Streak"
                            team1Result={owner1CurrentStreak}
                            team2Result={owner2CurrentStreak}
                        />
                        <HeadToHeadRow
                            title="Highest Win Streak"
                            team1Result={"W" + owner1.bestStreak}
                            team2Result={"W" + owner2.bestStreak}
                        />
                        <HeadToHeadRow
                            title="Total Points"
                            team1Result={(
                                Math.round(owner1.totalPoints * 100) / 100
                            ).toFixed(2)}
                            team2Result={(
                                Math.round(owner2.totalPoints * 100) / 100
                            ).toFixed(2)}
                        />
                        <HeadToHeadRow
                            title="Average Points"
                            team1Result={(
                                Math.round(owner1.averagePoints * 100) / 100
                            ).toFixed(2)}
                            team2Result={(
                                Math.round(owner2.averagePoints * 100) / 100
                            ).toFixed(2)}
                        />
                        <HeadToHeadRow
                            title="Highest Score"
                            team1Result={(
                                Math.round(owner1.highScore.score * 100) / 100
                            ).toFixed(2)}
                            team2Result={(
                                Math.round(owner2.highScore.score * 100) / 100
                            ).toFixed(2)}
                            team1Info={
                                owner1.highScore.year +
                                " Week " +
                                owner1.highScore.week
                            }
                            team2Info={
                                owner2.highScore.year +
                                " Week " +
                                owner2.highScore.week
                            }
                        />
                        <HeadToHeadRow
                            title="Lowest Score"
                            team1Result={(
                                Math.round(owner1.lowScore.score * 100) / 100
                            ).toFixed(2)}
                            team2Result={(
                                Math.round(owner2.lowScore.score * 100) / 100
                            ).toFixed(2)}
                            team1Info={
                                owner1.lowScore.year +
                                " Week " +
                                owner1.lowScore.week
                            }
                            team2Info={
                                owner2.lowScore.year +
                                " Week " +
                                owner2.lowScore.week
                            }
                        />
                        <HeadToHeadRow
                            title="Best Win"
                            team1Result={
                                (
                                    Math.round(
                                        owner1.bestWin.winningScore * 100
                                    ) / 100
                                ).toFixed(2) +
                                "-" +
                                (
                                    Math.round(
                                        owner1.bestWin.losingScore * 100
                                    ) / 100
                                ).toFixed(2)
                            }
                            team2Result={
                                (
                                    Math.round(
                                        owner2.bestWin.winningScore * 100
                                    ) / 100
                                ).toFixed(2) +
                                "-" +
                                (
                                    Math.round(
                                        owner2.bestWin.losingScore * 100
                                    ) / 100
                                ).toFixed(2)
                            }
                            team1Info={owner1BestWinInfo}
                            team2Info={owner2BestWinInfo}
                        />
                        <HeadToHeadRow
                            title="Closest Win"
                            team1Result={
                                (
                                    Math.round(
                                        owner1.closestWin.winningScore * 100
                                    ) / 100
                                ).toFixed(2) +
                                "-" +
                                (
                                    Math.round(
                                        owner1.closestWin.losingScore * 100
                                    ) / 100
                                ).toFixed(2)
                            }
                            team2Result={
                                (
                                    Math.round(
                                        owner2.closestWin.winningScore * 100
                                    ) / 100
                                ).toFixed(2) +
                                "-" +
                                (
                                    Math.round(
                                        owner2.closestWin.losingScore * 100
                                    ) / 100
                                ).toFixed(2)
                            }
                            team1Info={owner1ClosestWinInfo}
                            team2Info={owner2ClosestWinInfo}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
