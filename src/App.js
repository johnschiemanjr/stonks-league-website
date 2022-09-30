import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Navbar from "./components/navbar.component";
import OwnerPage from "./pages/owners-page.component";
import HeadToHeadPage from "./pages/head-to-head-page.component";
import StandingsPage from "./pages/standings-page.component";
import HistoryPage from "./pages/history-page.component";

function App() {
    return (
        <Router>
            <Navbar />
            <Route exact path="/" component={OwnerPage} />
            <Route path="/headToHead" component={HeadToHeadPage} />
            <Route path="/standings" component={StandingsPage} />
            <Route path="/history" component={HistoryPage} />
        </Router>
    );
}

export default App;
