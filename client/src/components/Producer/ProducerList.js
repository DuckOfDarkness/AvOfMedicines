import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {getProducerApiCall} from "../../apiCalls/Producer/producerApiCalls";
import ProducerListTable from "../Tables/Producer/ProducerListTable";
import {useTranslation} from "react-i18next";
import MedicinesListTable from "../Tables/Medicines/MedicinesListTable";
import {getCurrentUser, getUserName} from "../../helpers/authHelper";


function ProducerList() {

    const {t, i18n} = useTranslation();
    const user = getCurrentUser()

    const location = useLocation();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [producer, setProducer] = useState([]);

    const [addEditSuccess, setAddEditSuccess] = useState('')
    const [deleteMessage, setDeleteMessage] = useState('')

    useEffect(() => {

        setAddEditSuccess(localStorage.getItem("formMessage"))
        setDeleteMessage(localStorage.getItem("deleteMessage"))
        if (addEditSuccess !== null) {
            console.log(addEditSuccess)
            setTimeout(() => {
                localStorage.setItem("formMessage", '')
                setAddEditSuccess('')
            }, 2000)
        }
        if (deleteMessage !== null) {
            console.log(deleteMessage)
            setTimeout(() => {
                localStorage.setItem("deleteMessage", '')
                setDeleteMessage('')
            }, 2000)
        }
        getProducerApiCall()
            .then((res) => res.json())
            .then((data) => {
                setIsLoaded(true);
                setProducer(data)
            })
            .catch(error => {
                setIsLoaded(true)
                setError(error.message);
            });
    }, []);

    return (
        <main>
            <h2>{t('producer.list.title')}</h2>
            <hr/>
            {!isLoaded ? <p>{t('producer.list.loading')}</p> : <ProducerListTable prodList={producer}/>}
            <p className="addEditSuccess">{addEditSuccess}</p>
            <p className="deleteSuccess">{deleteMessage}</p>
            <p>
                {user.role === 'admin' ? <Link to="/producer/add" className="button-add">{t('producer.list.add')}</Link> : ''}
            </p>
        </main>
    )
}

export default ProducerList