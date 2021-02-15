import React, { Component } from "react";

import OwnersList from "./owners-list.component";
import OverviewPage from "./overview-pane.component.js";
import OwnerPerformanceCard from "./owner-performance-card.component.js";

export default class OwnerPage extends Component {
    render() {
        return (
            <div className="grid-container">
                <div className="grid-item owners-list">
                    <OwnersList />
                </div>
                <div className="grid-item owner-pane">
                    <OverviewPage teamName="John Snowzeliak" />
                </div>
                <div className="grid-item regular-season">
                    <OwnerPerformanceCard cardTitle="Regular Season Performance" />
                </div>
                <div className="grid-item postseason">
                    <OwnerPerformanceCard cardTitle="Playoff Performance" />
                </div>
                <div className="grid-item historic">Historic Performance</div>
            </div>
        );
    }
}
