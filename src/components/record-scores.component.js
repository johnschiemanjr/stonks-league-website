import React, { Component } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

const RankingRow = (props) => (
    <tr>
        <td>{props.rank}</td>
        <td>{props.team}</td>
        <td style={{ textAlign: "center" }}>{props.year}</td>
        <td style={{ textAlign: "center" }}>{props.week}</td>
        <td style={{ textAlign: "center" }}>{props.score}</td>
    </tr>
);

export default class RecordScores extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scores: {},
            ownerOverview: {},
            isLoading: true,
            type: props.type,
        };
    }

    getRankings() {
        return this.state.scores.map((score, rank) => {
            return (
                <RankingRow
                    key={rank}
                    team={
                        this.state.ownerOverview.find(
                            (owner) => owner.ownerId === score.teamId
                        ).teamName
                    }
                    year={score.year}
                    rank={rank + 1}
                    week={score.week}
                    score={score.score.toFixed(2)}
                />
            );
        });
    }

    componentDidMount() {
        const requestString = "http://192.168.0.13:5000/ownerOverview/";
        const boxScoresRequest =
            "http://192.168.0.13:5000/boxscores/" +
            this.state.type.toLowerCase() +
            "/";
        let urls = [requestString, boxScoresRequest];

        let requests = urls.map((url) => {
            return axios.get(url);
        });

        Promise.all(requests)
            .then((responses) => {
                this.setState({
                    ownerOverview: responses[0].data,
                    scores: responses[1].data,
                    isLoading: false,
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
            <div className="col-sm-6">
                <div className="card">
                    <div className="card-header text-white bg-dark">
                        <h5>{this.state.type} Scores</h5>
                    </div>
                    <div className="card-body p-0">
                        <div className="card">
                            <div className="card text-white bg-dark">
                                <div className="table-responsive">
                                    <table className="table table-dark table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">Rank</th>
                                                <th scope="col">Team</th>
                                                <th scope="col">Year</th>
                                                <th scope="col">Week</th>
                                                <th scope="col">Score</th>
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
