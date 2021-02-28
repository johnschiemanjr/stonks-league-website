import React, { Component } from "react";

//import OwnersList from "./owners-list.component";
import OverviewPane from "./overview-pane.component.js";
import OwnerPerformanceCard from "./owner-performance-card.component.js";

export default class OwnerPage extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-4 m-3">
                        <OverviewPane teamName="John Snowzeliak" ownerId={8} />
                    </div>
                    <div className="col-sm-7 mt-3">
                        <div className="container">
                            <div className="mb-3">
                                <OwnerPerformanceCard cardTitle="Regular Season Performance" />
                            </div>
                            <div className="mb-3">
                                <OwnerPerformanceCard cardTitle="Playoff Performance" />
                            </div>
                        </div>
                    </div>
                </div>
                <div>Historic Performance</div>
            </div>
        );
    }
}
