import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Navbar from "./components/navbar.component";
import OwnersList from "./components/owners-list.component";

function App() {
    return (
        <Router>
            <Navbar />
            <div className="grid-container">
                <div className="grid-item owners-list">
                    {" "}
                    <Route path="/" exact component={OwnersList} />
                </div>
                <div className="grid-item owner-pane">Owner Pane</div>
                <div className="grid-item regular-season">
                    Regular Season Performance
                </div>
                <div className="grid-item postseason">
                    Postseason Performance
                </div>
                <div className="grid-item historic">Historic Performance</div>
            </div>
            <div></div>
        </Router>
    );
}

export default App;
