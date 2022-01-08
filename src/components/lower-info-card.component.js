import React, { Component } from "react";

export default class LowerInfoCard extends Component {
    render() {
        return (
            <div className="col-md-4 text-center">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{this.props.title}</h5>
                        <p className="card-text">{this.props.content}</p>
                    </div>
                </div>
            </div>
        );
    }
}
