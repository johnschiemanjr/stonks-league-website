import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Navbar from "./components/navbar.component";
import OwnerPage from "./components/owners-page.component";
import HeadToHeadPage from "./components/head-to-head-page.component";

function App() {
	return (
		<Router>
			<Navbar />
			<Route exact path="/" component={OwnerPage} />
			<Route path="/headToHead" component={HeadToHeadPage} />
		</Router>
	);
}

export default App;
