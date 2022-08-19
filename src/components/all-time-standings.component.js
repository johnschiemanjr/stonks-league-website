import React, { Component } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

const useSortableData = (
    items,
    config = { key: "regWins", direction: "descending" }
) => {
    const [sortConfig, setSortConfig] = React.useState(config);

    const sortedItems = React.useMemo(() => {
        let sortableItems = [...items];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === "ascending" ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === "ascending" ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key) => {
        let direction = "descending";
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === "descending"
        ) {
            direction = "ascending";
        }
        setSortConfig({ key, direction });
    };

    return { owners: sortedItems, requestSort, sortConfig };
};

const ProductTable = (props) => {
    const { owners, requestSort, sortConfig } = useSortableData(props.owners);

    return (
        <table className="table table-dark table-striped">
            <thead>
                <tr style={{ textAlign: "center" }}>
                    <th scope="col">
                        <button
                            type="button"
                            onClick={() => requestSort("teamName")}
                            className="btn btn-dark"
                            style={{ fontWeight: "bold" }}
                        >
                            Team
                        </button>
                    </th>
                    <th>
                        <button
                            type="button"
                            onClick={() => requestSort("regWins")}
                            className="btn btn-dark"
                            style={{ fontWeight: "bold" }}
                        >
                            Wins
                        </button>
                    </th>
                    <th>
                        <button
                            type="button"
                            onClick={() => requestSort("regLosses")}
                            className="btn btn-dark"
                            style={{ fontWeight: "bold" }}
                        >
                            Losses
                        </button>
                    </th>
                    <th>
                        <button
                            type="button"
                            onClick={() => requestSort("regTies")}
                            className="btn btn-dark"
                            style={{ fontWeight: "bold" }}
                        >
                            Ties
                        </button>
                    </th>
                    <th>
                        <button
                            type="button"
                            onClick={() => requestSort("totalPoints")}
                            className="btn btn-dark"
                            style={{ fontWeight: "bold" }}
                        >
                            Points For
                        </button>
                    </th>
                    <th>
                        <button
                            type="button"
                            onClick={() => requestSort("totalPointsAgainst")}
                            className="btn btn-dark"
                            style={{ fontWeight: "bold" }}
                        >
                            Points Against
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody>
                {owners.map((owner) => (
                    <tr key={owner.ownerId}>
                        <td style={{ textAlign: "center" }}>
                            {owner.teamName}
                        </td>
                        <td style={{ textAlign: "center" }}>{owner.regWins}</td>
                        <td style={{ textAlign: "center" }}>
                            {owner.regLosses}
                        </td>
                        <td style={{ textAlign: "center" }}>{owner.regTies}</td>
                        <td style={{ textAlign: "center" }}>
                            {owner.totalPoints.toFixed(2)}
                        </td>
                        <td style={{ textAlign: "center" }}>
                            {owner.totalPointsAgainst.toFixed(2)}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default class HistoricalStandings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            owners: {},
            ownerOverview: {},
            isLoading: true,
        };
    }

    componentDidMount() {
        const requestString = "http://192.168.0.13:5000/ownerOverview/";
        const ownersRequest = "http://192.168.0.13:5000/owners/";
        let urls = [requestString, ownersRequest];

        let requests = urls.map((url) => {
            return axios.get(url);
        });

        Promise.all(requests)
            .then((responses) => {
                this.setState({
                    ownerOverview: responses[0].data,
                    owners: responses[1].data,
                    isLoading: false,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            );
        }
        console.log(this.state);
        return (
            <div className="container-fluid">
                <h4 className="col-sm-11 m-2">All-Time Standings</h4>
                <div className="row">
                    <div className="col-sm-11">
                        <div className="card">
                            <div className="card text-white bg-dark">
                                <div className="table-responsive">
                                    <ProductTable
                                        owners={this.state.ownerOverview}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
