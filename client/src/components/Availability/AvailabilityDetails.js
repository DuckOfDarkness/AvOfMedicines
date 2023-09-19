import React from 'react';
import { Link } from 'react-router-dom';
import {getAvailabilitiesByIdApiCall} from "../../apiCalls/Availabilities/availabilityApiCalls";
import AvailabilitiesDetailsTable from "../Tables/Availabilities/AvailabilitiesDetailsTable";
import {t} from "i18next";

class AvailabilityDetails extends React.Component {
    constructor(props) {
        super(props)
        let pathname = window.location.pathname
        let id = pathname.split('/')
        let avId = id[3]
        this.state = {
            availabilitiesId: avId,
            availabilities: null,
            error: null,
            isLoaded: false,
            message: null
        }
    }

    componentDidMount() {
        this.fetchAvailabilityDetails()
    }

    fetchAvailabilityDetails = () => {
        getAvailabilitiesByIdApiCall(1)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            availabilities: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            availabilities: data,
                            message: null,
                        })
                    }
                    this.setState({
                        isLoaded: true,
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                })
    }

    render() {
        const { availabilities, error, isLoaded, message } = this.state
        let content;

        if (error) {
            content = <p>{t('various.data.error')}: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>{t('medicines.list.loading')}</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <AvailabilitiesDetailsTable availabilitiesData={availabilities} />
        }
        return (
            <main>
                <h2>{t('whole-med.form.details.title')}</h2>
                {content}
                <div className="section-buttons">
                    <Link to="/availability" className="button-back">{t('various.details.return')}</Link>
                </div>
            </main >
        )
    }
}

export default AvailabilityDetails