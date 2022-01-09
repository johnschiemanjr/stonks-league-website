import React, { Component } from "react";
import Select from "react-select";

export default class HistoryPage extends Component {
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
                    <div className="col-sm-11 mt-3">
                        <div className="card">
                            <div className="card-header">
                                <div>
                                    <Select
                                        styles={customStyles}
                                        default={"All Time"}
                                    />
                                </div>
                            </div>
                            <div className="card text-white bg-dark">
                                <div className="table-responsive">
                                    <table class="table table-dark table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">Rank</th>
                                                <th scope="col">Team</th>
                                                <th scope="col">W</th>
                                                <th scope="col">L</th>
                                                <th scope="col">T</th>
                                                <th scope="col">PCT</th>
                                                <th scope="col">PF</th>
                                                <th scope="col">PA</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>John Snowzeliak</td>
                                                <td>103</td>
                                                <td>16</td>
                                                <td>2</td>
                                                <td>.571</td>
                                                <td>12652.65</td>
                                                <td>12846.12</td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>Cleveland Steamers</td>
                                                <td>103</td>
                                                <td>16</td>
                                                <td>2</td>
                                                <td>.571</td>
                                                <td>12652.65</td>
                                                <td>12846.12</td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>Cleveland Steamers</td>
                                                <td>103</td>
                                                <td>16</td>
                                                <td>2</td>
                                                <td>.571</td>
                                                <td>12652.65</td>
                                                <td>12846.12</td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>Cleveland Steamers</td>
                                                <td>103</td>
                                                <td>16</td>
                                                <td>2</td>
                                                <td>.571</td>
                                                <td>12652.65</td>
                                                <td>12846.12</td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>Cleveland Steamers</td>
                                                <td>103</td>
                                                <td>16</td>
                                                <td>2</td>
                                                <td>.571</td>
                                                <td>12652.65</td>
                                                <td>12846.12</td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>Cleveland Steamers</td>
                                                <td>103</td>
                                                <td>16</td>
                                                <td>2</td>
                                                <td>.571</td>
                                                <td>12652.65</td>
                                                <td>12846.12</td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>Cleveland Steamers</td>
                                                <td>103</td>
                                                <td>16</td>
                                                <td>2</td>
                                                <td>.571</td>
                                                <td>12652.65</td>
                                                <td>12846.12</td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>Cleveland Steamers</td>
                                                <td>103</td>
                                                <td>16</td>
                                                <td>2</td>
                                                <td>.571</td>
                                                <td>12652.65</td>
                                                <td>12846.12</td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>Cleveland Steamers</td>
                                                <td>103</td>
                                                <td>16</td>
                                                <td>2</td>
                                                <td>.571</td>
                                                <td>12652.65</td>
                                                <td>12846.12</td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>Cleveland Steamers</td>
                                                <td>103</td>
                                                <td>16</td>
                                                <td>2</td>
                                                <td>.571</td>
                                                <td>12652.65</td>
                                                <td>12846.12</td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>Cleveland Steamers</td>
                                                <td>103</td>
                                                <td>16</td>
                                                <td>2</td>
                                                <td>.571</td>
                                                <td>12652.65</td>
                                                <td>12846.12</td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>Cleveland Steamers</td>
                                                <td>103</td>
                                                <td>16</td>
                                                <td>2</td>
                                                <td>.571</td>
                                                <td>12652.65</td>
                                                <td>12846.12</td>
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
