import React, { Component } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

const RankingRow = (props) => (
    <tr>
        <td>{props.rank}</td>
        <td>{props.team}</td>
        <td style={{ textAlign: "center" }}>{props.powerRating}</td>
        <td style={{ textAlign: "center" }}>{props.championships}</td>
        <td style={{ textAlign: "center" }}>{props.regWinPct}</td>
        <td style={{ textAlign: "center" }}>{props.playoffGames}</td>
        <td style={{ textAlign: "center" }}>{props.playoffWins}</td>
        <td style={{ textAlign: "center" }}>{props.avgPts.toFixed(2)}</td>
    </tr>
);

export default class HistoricalPowerRankings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            owners: {},
            ownerOverview: {},
            isLoading: true,
            playoffPerformance: {},
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        const requestString = "http://192.168.0.13:5000/ownerOverview/";
        const playoffPerformanceRequest =
            "http://192.168.0.13:5000/playoffPerformance/";
        const ownersRequest = "http://192.168.0.13:5000/owners/";
        let urls = [requestString, playoffPerformanceRequest, ownersRequest];

        let requests = urls.map((url) => {
            return axios.get(url);
        });

        Promise.all(requests)
            .then((responses) => {
                //console.log(this.state);
                this.getPowerRankings(
                    responses[0].data,
                    responses[1].data,
                    responses[2].data
                );
                this.setState({
                    ownerOverview: responses[0].data,
                    playoffPerformance: responses[1].data,
                    owners: responses[2].data,
                    isLoading: false,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getPowerRankings(ownerOverviews, playoffPerformances, owners) {
        const lgAvgPtsPerWeek = this.getAvgPtsPerWeek(ownerOverviews);
        owners.forEach((owner) => {
            let playoffPerformance = playoffPerformances.find(
                (playoffPerformance) => {
                    return playoffPerformance.ownerId === owner.ownerId;
                }
            );
            let ownerOverview = ownerOverviews.find((ownerOverview) => {
                return ownerOverview.ownerId === owner.ownerId;
            });

            const pwrRnkScore = this.getPwrRnkScore(
                playoffPerformance,
                ownerOverview,
                lgAvgPtsPerWeek
            );

            owner.powerRating = pwrRnkScore;
        });
    }

    getAvgPtsPerWeek(ownerOverviews) {
        let sum = 0;
        ownerOverviews.forEach((ownerOverview) => {
            sum += ownerOverview.averagePoints;
        });
        return sum / ownerOverviews.length;
    }

    getPwrRnkScore(playoffPerformance, ownerOverview, lgAvgPts) {
        const AVG_WIN_PCT = 0.5;
        const champWeight = 1 + playoffPerformance.championships.length * 0.2;

        const regWins = ownerOverview.regWins;
        const regLosses = ownerOverview.regLosses;
        const regTies = ownerOverview.regTies;
        const regWinPct =
            regWins + regLosses + regTies !== 0
                ? ((regWins / (regWins + regLosses + regTies)) * 100) / 100
                : 0;

        const regWinPctWeight =
            (((regWins + regLosses + regTies) * regWinPct) / AVG_WIN_PCT) * 0.1;

        const playoffWins = playoffPerformance.wins;
        const playoffLosses = playoffPerformance.losses;
        const playoffTies = playoffPerformance.ties;
        const playoffWinPct =
            playoffWins + playoffLosses + playoffTies !== 0
                ? ((playoffWins / (playoffWins + playoffLosses + playoffTies)) *
                      100) /
                  100
                : 0;

        const playoffWinPctWeight =
            (((playoffWins + playoffLosses + playoffTies) * playoffWinPct) /
                AVG_WIN_PCT) *
            0.1;

        const avgPtsWeight = ownerOverview.averagePoints / lgAvgPts;

        return (
            (champWeight *
                (avgPtsWeight + playoffWinPctWeight + regWinPctWeight)) /
            ownerOverview.seasons
        );
    }

    getRankings() {
        const lgAvgPtsPerWeek = this.getAvgPtsPerWeek(this.state.ownerOverview);

        let sortedOwners = this.state.owners.sort((owner1, owner2) => {
            if (owner1.powerRating < owner2.powerRating) {
                return 1;
            } else if (owner1.powerRating > owner2.powerRating) {
                return -1;
            } else {
                return 0;
            }
        });

        return sortedOwners.map((owner, rank) => {
            let playoffPerformance = this.state.playoffPerformance.find(
                (playoffPerformance) => {
                    return playoffPerformance.ownerId === owner.ownerId;
                }
            );
            let ownerOverview = this.state.ownerOverview.find(
                (ownerOverview) => {
                    return ownerOverview.ownerId === owner.ownerId;
                }
            );

            return (
                <RankingRow
                    key={owner.ownerId}
                    team={owner.teamName}
                    powerRating={owner.powerRating.toFixed(4)}
                    rank={rank + 1}
                    championships={playoffPerformance.championships.length}
                    avgPts={ownerOverview.averagePoints}
                    playoffGames={
                        playoffPerformance.wins +
                        playoffPerformance.losses +
                        playoffPerformance.ties
                    }
                    playoffWins={playoffPerformance.wins}
                    regWinPct={
                        ownerOverview.regWins +
                            ownerOverview.regLosses +
                            ownerOverview.regTies !==
                        0
                            ? (
                                  ((ownerOverview.regWins /
                                      (ownerOverview.regWins +
                                          ownerOverview.regLosses +
                                          ownerOverview.regTies)) *
                                      100) /
                                  100
                              ).toFixed(4)
                            : 0
                    }
                />
            );
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
                <h4 className="col-sm-11 m-2">Historical Power Rankings</h4>
                <div className="row">
                    <div className="col-sm-11">
                        <div className="card">
                            <div className="card text-white bg-dark">
                                <div className="table-responsive">
                                    <table className="table table-dark table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">Rank</th>
                                                <th scope="col">Team</th>
                                                <th scope="col">
                                                    Power Rating
                                                </th>
                                                <th scope="col">Gunninys</th>
                                                <th scope="col">
                                                    Reg Season Win %
                                                </th>
                                                <th scope="col">
                                                    Playoff Games
                                                </th>
                                                <th scope="col">
                                                    Playoff Wins
                                                </th>
                                                <th scope="col">
                                                    Points per Week
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>{this.getRankings()}</tbody>
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
