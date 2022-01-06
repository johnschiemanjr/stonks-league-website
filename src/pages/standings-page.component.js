import React, { Component } from "react";
// import Select from "react-select";
// import axios from "axios";
// import Spinner from "react-bootstrap/Spinner";

// import Division from "../components/division.component.js";

// const SERVER_IP = "192.168.0.13";

export default class Standings extends Component {
    constructor(props) {
        super(props);

        // this.state = {
        //     owners: [],
        //     seasons: [],
        //     isLoading: true,
        //     season: 2020,
        // };

        // this.handleSeasonChange = this.handleSeasonChange.bind(this);
    }

    // async componentDidMount() {
    //     this.setState({ isLoading: true });

    //     const [ownersResponse, seasonsResponse] = await Promise.all([
    //         axios.get("http://" + SERVER_IP + ":5000/owners"),
    //         axios.get("http://" + SERVER_IP + ":5000/seasons/"),
    //     ]);

    //     this.setState({
    //         owners: ownersResponse.data,
    //         isLoading: false,
    //         seasons: seasonsResponse.data,
    //     });
    // }

    // getDivisions() {
    //     let divisionComponents = [];
    //     let currentSeason = this.getSeason(this.state.season);

    //     let owners = [];
    //     for (var j = 0; j < currentSeason.owners.length; j++) {
    //         console.log(currentSeason);
    //         let owner = currentSeason.owners[j];
    //         owner.name = this.getOwnerName(owner.ownerId).teamName;
    //         owners.push(owner);
    //     }

    //     for (var i = 0; i < currentSeason.divisions.length; i++) {
    //         divisionComponents.push(
    //             <Division
    //                 division={currentSeason.divisions[i]}
    //                 owners={owners}
    //                 key={i}
    //             />
    //         );
    //     }
    //     return <div>{divisionComponents}</div>;
    // }

    // getSeason(season) {
    //     return this.state.seasons.find((seasonToFind) => {
    //         return seasonToFind.year === season;
    //     });
    // }

    // getOwnerName(ownerId) {
    //     return this.state.owners.find((owner) => {
    //         return owner.ownerId === ownerId;
    //     });
    // }

    // renderSeasonsList() {
    //     let seasonsArray = [];
    //     seasonsArray.push({
    //         label: "All",
    //         value: 0,
    //     });
    //     return seasonsArray.concat(
    //         this.state.seasons.map((season) => ({
    //             label: season.year,
    //             value: season.year,
    //         }))
    //     );
    // }

    // handleSeasonChange(selectedOption) {
    //     this.setState({
    //         season: selectedOption.value,
    //     });
    // }

    render() {
        // if (this.state.isLoading) {
        //     return (
        //         <Spinner animation="border" role="status">
        //             <span className="sr-only">Loading...</span>
        //         </Spinner>
        //     );
        // }

        // const customStyles = {
        //     option: (provided, state) => ({
        //         ...provided,
        //         color: state.isSelected ? "blue" : "black",
        //         padding: 20,
        //     }),
        // };

        return (
            <div>Under Construction</div>
            // <div className="container-fluid">
            //     <div className="row">
            //         <div className="col-sm-6 mt-3">
            //             <div>
            //                 <Select
            //                     options={this.renderSeasonsList()}
            //                     styles={customStyles}
            //                     defaultValue={{
            //                         label: "2020",
            //                         value: 1,
            //                     }}
            //                     onChange={this.handleSeasonChange}
            //                 />
            //             </div>
            //             <div>{this.getDivisions()}</div>
            //         </div>
            //     </div>
            // </div>
        );
    }
}
