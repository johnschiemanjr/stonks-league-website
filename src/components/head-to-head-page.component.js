import React, { Component } from "react";
import Select from "react-select";

import HeadToHeadResults from "./head-to-head-results.component.js";

export default class HeadToHeadPage extends Component {
    render() {
        const customStyles = {
            option: (provided, state) => ({
                ...provided,
                color: state.isSelected ? "blue" : "black",
                padding: 20,
            }),
        };

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-7 m-3">
                        <div className="row">
                            <div className="col-sm-6">
                                <Select
                                    styles={customStyles}
                                    placeholder={"Team 1"}
                                />
                            </div>
                            <div className="col-sm-6">
                                <Select
                                    styles={customStyles}
                                    placeholder={"Team 2"}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <HeadToHeadResults />
                        </div>
                    </div>
                    <div className="col-sm-4 m-3">
                        <div className="card">
                            <div className="card-header">Game Logs</div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table game-log-table">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col">Date</th>
                                                <th scope="col">Game</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Week 1 2020</td>
                                                <td>
                                                    John Snowzeliak - 123.72
                                                    Augusta 3 Putts 98.01
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>Jacob</td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>Larry</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
