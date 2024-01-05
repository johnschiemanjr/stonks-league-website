import React, { Component } from "react";
import HistoricalPowerRankings from "../components/historical-power-rankings.component.js";
import HistoricalStandings from "../components/all-time-standings.component.js";
import RecordScores from "../components/record-scores.component.js";

export default class HistoryPage extends Component {
    // Biggest blowouts
    // Best manager efficiency
    // Longest win streak
    render() {
        return (
            <div>
                <HistoricalStandings />
                <HistoricalPowerRankings />
                <h1 className="col-sm-11 m-2">Records</h1>
                <div className="container-fluid">
                    <div className="row">
                        <RecordScores type="Top" />
                        <RecordScores type="Lowest" />
                    </div>
                </div>
            </div>
        );
    }
}
