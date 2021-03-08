import React, { Component } from "react";

class HeadToHeadRow extends Component {
    render() {
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
                                        <div className="info">
                                            ({this.props.team1Info})
                                        </div>
                                    )}
                                </div>
                                <div className="card text-white bg-dark col-6 head-to-head-result ">
                                    {this.props.team2Result}
                                    {typeof this.props.team2Info !==
                                        "undefined" && (
                                        <div className="info">
                                            ({this.props.team2Info})
                                        </div>
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
        return (
            <div className="col-sm-12">
                <div className="card text-white bg-dark">
                    <div className="card-body">
                        <HeadToHeadRow
                            title="Current Streak"
                            team1Result="W5"
                            team2Result="L5"
                        />
                        <HeadToHeadRow
                            title="Highest Win Streak"
                            team1Result="W5"
                            team2Result="W0"
                        />
                        <HeadToHeadRow
                            title="Total Points"
                            team1Result={1149.71}
                            team2Result={1182.92}
                        />
                        <HeadToHeadRow
                            title="Average Points"
                            team1Result={95.81}
                            team2Result={98.58}
                        />
                        <HeadToHeadRow
                            title="Highest Score"
                            team1Result={95.81}
                            team2Result={98.58}
                            team1Info="2020 Week 2"
                            team2Info="2020 Week 5"
                        />
                        <HeadToHeadRow
                            title="Lowest Score"
                            team1Result={95.81}
                            team2Result={98.58}
                        />
                        <HeadToHeadRow
                            title="Best Win"
                            team1Result={95.81 + " - " + 45.45}
                            team2Result={95.81 + " - " + 45.45}
                            team1Info="2020 Week 2"
                            team2Info="2020 Week 5"
                        />
                        <HeadToHeadRow
                            title="Closest Win"
                            team1Result={95.81}
                            team2Result={98.58}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
