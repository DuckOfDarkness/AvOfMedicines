import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {getProducerByIdApiCall} from "../../apiCalls/Producer/producerApiCalls";
import {getMedicinesApiCall} from "../../apiCalls/Medicines/medicinesApiCalls";

import ProducerDetailsTable from "../Tables/Producer/ProducerDetailsTable";
import {useTranslation} from "react-i18next";
import MedicinesDetailsTable from "../Tables/Medicines/MedicinesDetailsTable";

function ProducerDetails() {
    const {t} = useTranslation();
    let pathname = window.location.pathname
    let id = pathname.split('/')
    let prod_Id = id[3]


    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [message, setMessage] = useState('')

    const [producer, setProducer] = useState({})
    useEffect(() => {
        getProducerByIdApiCall(prod_Id)
            .then(res => res.json())
            .then((data) => {
                setProducer(data)
                setIsLoaded(true)
            })
            .catch((error) => {
                setIsLoaded(true)
                setError(error)
            })
    },[])

    let content;
    if(error) {
        content = <p>{t('various.data.error')} {error.message}</p>
    }else if(!isLoaded){
        content = <p>{t('producer.list.loading')}</p>
    }else if(message){
        content = <p>{message}</p>
    }else{
        content = <ProducerDetailsTable prodData = {producer}/>
    }
    return (
        <main>
            {content}
            &nbsp;
            <p><Link to="/producer" className="button-add">{t('various.details.return')}</Link></p>
        </main>
    )
}

export default ProducerDetails

