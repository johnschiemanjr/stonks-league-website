import React, { Component } from "react";

const StandingsRow = (props) => (
    <tr>
        <td>{props.rank}</td>
        <td>{props.teamName}</td>
        <td>{props.wins}</td>
        <td>{props.losses}</td>
        <td>{props.ties}</td>
        <td>
            {props.divisionWins}-{props.divisionLosses}-{props.divisionTies}
        </td>
        <td>
            {isNaN(
                (props.wins / (props.wins + props.losses + props.ties)).toFixed(
                    3
                )
            )
                ? (0.0).toFixed(2)
                : (
                      props.wins /
                      (props.wins + props.losses + props.ties)
                  ).toFixed(3)}
        </td>
        <td>{props.pointsFor.toFixed(2)}</td>
        <td>{props.pointsAgainst.toFixed(2)}</td>
    </tr>
);

export default class Division extends Component {
    getOwnerName(ownerId) {
        return this.props.owners.find((owner) => {
            return owner.ownerId === ownerId;
        });
    }

    getRows() {
        let rank = 1;
        return this.props.owners
            .sort(function (owner1, owner2) {
                return owner1.seasonRank - owner2.seasonRank;
            })
            .map((owner) => {
                if (this.props.division.id === owner.divisionId) {
                    return (
                        <StandingsRow
                            rank={owner.seasonRank === 0 ? "--" : rank++}
                            teamName={owner.name}
                            wins={owner.wins}
                            losses={owner.losses}
                            ties={owner.ties}
                            divisionWins={owner.divisionWins}
                            divisionLosses={owner.divisionLosses}
                            divisionTies={owner.divisionTies}
                            pointsFor={owner.pointsFor}
                            pointsAgainst={owner.pointsAgainst}
                            key={owner.ownerId}
                        />
                    );
                }
            });
        // if (this.state.season === 0) {
        //     //The selection is for All seasons
        //     return this.state.owners.map((owner) => {
        //         return (
        //             <StandingsRow
        //                 teamName={owner.teamName}
        //                 key={owner.ownerId}
        //                 pointsFor={0}
        //                 pointsAgainst={0}
        //             />
        //         );
        //     });
        // } else {
        //     let seasonToDisplay = this.getSeason(this.state.season);
        //     return seasonToDisplay.owners
        //         .sort(function (owner1, owner2) {
        //             return owner1.seasonRank - owner2.seasonRank;
        //         })
        //         .map((owner) => {
        //             return (
        //                 <StandingsRow
        //                     rank={owner.seasonRank}
        //                     teamName={this.getOwnerName(owner.ownerId).teamName}
        //                     wins={owner.wins}
        //                     losses={owner.losses}
        //                     ties={owner.ties}
        //                     divisionWins={owner.divisionWins}
        //                     divisionLosses={owner.divisionLosses}
        //                     divisionTies={owner.divisionTies}
        //                     pointsFor={owner.pointsFor}
        //                     pointsAgainst={owner.pointsAgainst}
        //                     key={owner.ownerId}
        //                 />
        //             );
        //         });
        // }
    }

    render() {
        if (false) {
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
            <div className="card mt-3 mb-3">
                <div className="card-header text-white bg-dark">
                    {this.props.division.name}
                </div>
                <div className="card">
                    <div className="table-responsive">
                        <table className="table table-sm table-striped">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Rank</th>
                                    <th scope="col">Team</th>
                                    <th scope="col">W</th>
                                    <th scope="col">L</th>
                                    <th scope="col">T</th>
                                    <th scope="col">Division</th>
                                    <th scope="col">PCT</th>
                                    <th scope="col">PF</th>
                                    <th scope="col">PA</th>
                                </tr>
                            </thead>
                            <tbody>{this.getRows()}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
