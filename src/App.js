import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import OwnersList from "./components/owners-list.component";

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Route path="/" exact component={OwnersList} />
    </Router>
  );
}

export default App;
