import React, { Component } from "react";
import HistoricalPowerRankings from "../components/historical-power-rankings.component.js";
import HistoricalStandings from "../components/all-time-standings.component.js";

export default class HistoryPage extends Component {
    render() {
        return (
            <div>
                <HistoricalStandings />
                <HistoricalPowerRankings />
            </div>
        );
    }
}
