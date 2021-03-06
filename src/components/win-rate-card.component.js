import React, { Component } from "react";

export default class WinRateCard extends Component {
	// Function to get gradient for win rate
	// pickHex(color1, color2, weight) {
	//     console.log("hello");
	//     var w1 = weight;
	//     var w2 = 1 - w1;
	//     var rgb = [
	//         Math.round(color1[0] * w1 + color2[0] * w2),
	//         Math.round(color1[1] * w1 + color2[1] * w2),
	//         Math.round(color1[2] * w1 + color2[2] * w2),
	//     ];
	//     return rgb;
	//}

	render() {
		return (
			<div className="col-md-3 text-center mb-2">
				<div className="card">
					<div className="card-body">
						<h5 className="card-title">{this.props.title}</h5>
						<p className="card-text">{this.props.winPercentage}</p>
						<div className="progress">
							<div
								className="progress-bar"
								role="progressbar"
								style={{ width: this.props.winPercentage }}
								aria-valuenow={this.props.winPercentage}
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
