import React, { Component } from "react";

//import OwnersList from "./owners-list.component";
import OverviewPane from "./overview-pane.component.js";
import RegularSeasonPerformance from "./regular-season-performance.component.js";
import PlayoffPerformance from "./playoff-performance.component.js";

export default class OwnerPage extends Component {
    render() {
        const OWNER_ID = 9;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-4 m-3">
                        <OverviewPane teamName="John Snowzeliak" ownerId={8} />
                    </div>
                    <div className="col-sm-7 mt-3">
                        <div className="container">
                            <div className="mb-3">
                                <RegularSeasonPerformance ownerId={OWNER_ID} />
                            </div>
                            <div className="mb-3">
                                <PlayoffPerformance ownerId={OWNER_ID} />
                            </div>
                        </div>
                    </div>
                </div>
                <div>Historic Performance</div>
            </div>
        );
    }
}
