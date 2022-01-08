import React, { Component } from "react";

export default class WinRateCard extends Component {
	render() {
		let style;
		if (this.props.winPercentage < 40) {
			style = "progress-bar bg-danger";
		} else if (
			this.props.winPercentage > 40 &&
			this.props.winPercentage < 60
		) {
			style = "progress-bar bg-warning";
		} else {
			style = "progress-bar bg-success";
		}

		const winPercentageString = this.props.winPercentage.toFixed(2) + "%";

		return (
			<div className="col-md-3 text-center mb-2">
				<div className="card">
					<div className="card-body">
						<h5 className="card-title">{this.props.title}</h5>
						<p className="card-text">{winPercentageString}</p>
						<div className="progress">
							<div
								className={style}
								role="progressbar"
								style={{ width: winPercentageString }}
								aria-valuenow={winPercentageString}
								aria-valuemin="0"
								aria-valuemax="100"
							></div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
