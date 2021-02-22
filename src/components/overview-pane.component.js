import React, { Component } from "react";
import "../stylesheets/owner-pane.component.css";

class InfoCard extends Component {
    render() {
        return (
            <div className="text-center card-body owner-pane-card">
                <div>
                    <div>
                        <h5 className="owner-pane-header">
                            {this.props.title}:
                        </h5>
                        <div>{this.props.content}</div>
                        {typeof this.props.info !== "undefined" && (
                            <div className="owner-pane-info">
                                ({this.props.info})
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default class OverviewPane extends Component {
    render() {
        return (
            <div className="card text-white bg-dark">
                <div className="card-header">{this.props.teamName}</div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-6">
                            <InfoCard title="Seasons" content={1} />
                            <InfoCard title="Current Streak" content="W1" />
                            <InfoCard title="Average Points" content={116.45} />
                            <InfoCard
                                title="Highest Score"
                                content={175.85}
                                info="2016 Week 10 vs Team Name"
                            />
                            <InfoCard title="Total Points" content={1561.34} />
                            <InfoCard
                                title="Longest Winning Streak"
                                content={4}
                                info="2016 Week 10 - 2016 Week 5"
                            />
                            <InfoCard
                                title="Highest Win Margin"
                                content={85.85}
                                info="2019 Week 4 vs Team Name"
                            />
                            <InfoCard
                                title="Highest Loss Margin"
                                content={85.85}
                                info="2019 Week 4 vs Team Name"
                            />
                        </div>
                        <div className="col-sm-6">
                            <InfoCard title="All Time Record" content="6-7-0" />
                            <InfoCard title="All Time Win %" content="93.75%" />
                            <InfoCard
                                title="Average Points Against"
                                content={115.36}
                            />
                            <InfoCard
                                title="Lowest Score"
                                content={74.94}
                                info="2016 Week 10 vs Team Name"
                            />
                            <InfoCard
                                title="Total Points Against"
                                content={1534.87}
                            />
                            <InfoCard
                                title="Longest Losing Streak"
                                content={4}
                                info="2016 Week 10 - 2016 Week 5"
                            />
                            <InfoCard
                                title="Lowest Win Margin"
                                content={85.85}
                                info="2019 Week 4 vs Team Name"
                            />
                            <InfoCard
                                title="Lowest Loss Margin"
                                content={85.85}
                                info="2019 Week 4 vs Team Name"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
