import React, { Component } from "react";
import axios from "axios";
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
    constructor(props) {
        super(props);

        this.state = { ownerOverview: [], isLoading: true };
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        axios
            .get("http://localhost:5000/boxscores/ownerBoxscores/1")
            .then((response) => {
                this.setState({
                    ownerOverview: response.data,
                    isLoading: false,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        if (this.state.isLoading) {
            return <p>Loading ...</p>;
        }

        console.log(this.state.ownerOverview.bestWin.difference);
        return (
            <div className="card text-white bg-dark">
                <div className="card-header">{this.props.teamName}</div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-6">
                            <InfoCard title="Seasons" content={1} />
                            <InfoCard title="Current Streak" content="W1" />
                            <InfoCard
                                title="Average Points"
                                content={(
                                    Math.round(
                                        this.state.ownerOverview.averagePoints *
                                            100
                                    ) / 100
                                ).toFixed(2)}
                            />
                            <InfoCard
                                title="Highest Score"
                                content="hi"
                                info="2016 Week 10 vs Team Name"
                            />
                            <InfoCard title="Total Points" content={1561.34} />
                            <InfoCard
                                title="Longest Winning Streak"
                                content={4}
                                info="2016 Week 10 - 2016 Week 5"
                            />
                            <InfoCard
                                title="Best Win"
                                content={85.85}
                                info="2019 Week 4 vs Team Name"
                            />
                            <InfoCard
                                title="Worst Loss"
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
                                title="Closest Win"
                                content={85.85}
                                info="2019 Week 4 vs Team Name"
                            />
                            <InfoCard
                                title="Closest Loss"
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
