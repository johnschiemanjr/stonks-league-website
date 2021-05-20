import React, { Component } from "react";

const Score = (props) => (
    <tr>
        <td>{"Week " + props.week + " " + props.year}</td>
        <td>
            {props.winningTeamName +
                " - " +
                (Math.round(props.winningTeamScore * 100) / 100).toFixed(2) +
                " " +
                props.losingTeamName +
                " " +
                (Math.round(props.losingTeamScore * 100) / 100).toFixed(2)}
        </td>
    </tr>
);

export default class GameLog extends Component {
    gameLogs() {
        return this.props.gameLogs.map((gameLog) => {
            var winningTeamName;
            var losingTeamName;
            var winningTeamScore;
            var losingTeamScore;
            if (gameLog.owner1Score >= gameLog.owner2Score) {
                winningTeamName = this.props.owner1.teamName;
                losingTeamName = this.props.owner2.teamName;
                winningTeamScore = gameLog.owner1Score;
                losingTeamScore = gameLog.owner2Score;
            } else {
                winningTeamName = this.props.owner2.teamName;
                losingTeamName = this.props.owner1.teamName;
                winningTeamScore = gameLog.owner2Score;
                losingTeamScore = gameLog.owner1Score;
            }
            return (
                <Score
                    year={gameLog.year}
                    week={gameLog.week}
                    key={gameLog.boxscoreId}
                    winningTeamName={winningTeamName}
                    losingTeamName={losingTeamName}
                    winningTeamScore={winningTeamScore}
                    losingTeamScore={losingTeamScore}
                />
            );
        });
    }

    render() {
        if (!this.props.gameLogs) {
            return (
                <div className="card">
                    <div className="card-header">Game Logs</div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table game-log-table">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">Date</th>
                                        <th scope="col">Game</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className="card">
                <div className="card-header">Game Logs</div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table game-log-table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Game</th>
                                </tr>
                            </thead>
                            <tbody>{this.gameLogs()}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
