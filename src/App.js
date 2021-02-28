import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Navbar from "./components/navbar.component";
import OwnerPage from "./components/owners-page.component";

function App() {
	return (
		<Router>
			<Navbar />
			<OwnerPage />
		</Router>
	);
}

export default App;
