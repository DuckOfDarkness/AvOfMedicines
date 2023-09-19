import React from "react";
import {Link} from "react-router-dom";
import {getWholesalerByIdApiCall} from "../../apiCalls/Wholesaler/wholesalerApiCalls";
import {getAvailabilitiesApiCall} from "../../apiCalls/Availabilities/availabilityApiCalls";
import WholesalerDetailsTable from "../Tables/Wholesaler/WholesalerDetailsTable";
import availabilityDetails from "../Availability/AvailabilityDetails";
import availabilitiesList from "../Availability/AvailabilitiesList";


class WholesalerDetails extends React.Component {

    constructor(props) {
        super(props);
        let pathname = window.location.pathname
        let id = pathname.split('/')
        let whole_Id = id[3]
        this.state = {
            wholeId: whole_Id,
            wholesaler: null,
            availabilities: null,
            error: null,
            isLoaded: false,
            message: null
        }
    }

    componentDidMount() {
        this.fetchWholesalerDetails()
        this.fetchAvailabilitiesList()
    }

    fetchWholesalerDetails = () => {
        getWholesalerByIdApiCall(this.state.wholeId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            wholesaler: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            wholesaler: data,
                            message: null
                        })
                    }
                    this.setState({
                        isLoaded: true
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                })
    }

    fetchAvailabilitiesList = () => {
        getAvailabilitiesApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        availabilities: data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const {wholesaler, error, isLoaded, message} = this.state
        let content;
        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie danych</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            console.log(wholesaler.availabilities)
            content = <WholesalerDetailsTable wholeData={wholesaler}/>
        }
        return (

            <main>
                <h2>Szczególy hurtowni</h2>
                {content}
                <p><Link to="/wholesaler" className="button-add">Powrót</Link></p>
            </main>
        )
    }
}

export default WholesalerDetails

