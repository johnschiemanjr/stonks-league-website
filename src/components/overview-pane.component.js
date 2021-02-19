import React, { Component } from "react";

class InfoCard extends Component {
    render() {
        return (
            <div className="text-center owner-pane-info-card">
                <div>
                    <div>
                        <h5>{this.props.title}</h5>
                        {this.props.content}
                        {"\n"}
                        {this.props.info}
                    </div>
                </div>
            </div>
        );
    }
}

export default class OverviewPane extends Component {
    render() {
        return (
            <div className="card owner-pane">
                <div className="card-header owner-pane-header">
                    {this.props.teamName}
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-4 owner-pane-column">
                            <InfoCard title="Seasons" content={1} />
                            <InfoCard title="Record" content="6-7-0" />
                            <InfoCard title="Current Win Streak" content="W1" />
                            <InfoCard
                                title="Biggest Winning Streak"
                                content={4}
                                info="2016 Week 10 - 2016 Week 5"
                            />
                            <InfoCard
                                title="Biggest Losing Streak"
                                content={4}
                            />
                            <InfoCard title="Seasons" content={1} />
                        </div>
                        <div className="col-lg-4">
                            <InfoCard title="Seasons" content={1} />
                        </div>
                        <div className="col-lg-4">
                            <InfoCard title="Seasons" content={1} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
