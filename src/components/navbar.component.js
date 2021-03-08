import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">
          Stonks League
        </Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">
                Owner Overview
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/headToHead" className="nav-link">
                Head to Head
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
