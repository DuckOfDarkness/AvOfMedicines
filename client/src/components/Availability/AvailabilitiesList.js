import React from "react";
import {Link} from "react-router-dom";
import {getAvailabilitiesApiCall} from "../../apiCalls/Availabilities/availabilityApiCalls";
import AvailabilitiesListTable from "../Tables/Availabilities/AvailabilitiesListTable";

class AvailabilitiesList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            availabilities: []
        }
    }

    componentDidMount() {
        this.fetchAvailabilitiesList()
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
        const {error, isLoaded, availabilities} = this.state
        let content

        if(error){
            content = <p>Błąd: {error.message}</p>
        } else if(!isLoaded) {
            content = <p>Ładowaie danych leków...</p>
        }else{
            content = <AvailabilitiesListTable avData = {availabilities} />
        }

        return (
            <main>
                <h2>Lista dostępności leków w hurtowniach</h2>
                <hr/>
                {content}
                <p>
                    <Link to="/vailability/add" className="button-add">Dodaj nową dostępność</Link>
                </p>
            </main>
        )
    }
}

export default AvailabilitiesList