import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {getProducerApiCall} from "../../../apiCalls/Producer/producerApiCalls";
import {getFormattedData} from "../../../helpers/dateHelper";
import {deleteMedicinesApicall} from "../../../apiCalls/Medicines/medicinesApiCalls";
import {useTranslation} from "react-i18next";
import {getCurrentUser, isAuthenticated} from "../../../helpers/authHelper";

function MedicinesListTableRow(props) {
    const med = props.medData
    const currentUser = getCurrentUser()
    const [producer, setProducer] = useState([])
    const {t, i18n} = useTranslation();

    const deleteMedicine = (id) => {
        deleteMedicinesApicall(id)
            .then((res) => {
                console.log(res)
                localStorage.setItem("deleteMessage", t('medicines.form.details.deleteMedicineSuccess'))
                window.location.reload()
            })
    }

    useEffect(() => {
        getProducerApiCall()
            .then((res) => res.json())
            .then((data) => {
                setProducer(data)
                getName(data, 1)
            })
    }, []);

    return (
        <tr>

            <td>{med.name}</td>
            <td className="responsiveness_correction">{med.parallel_importer}</td>
            <td>{getFormattedData(med.expiration_date)}</td>
            <td className="responsiveness_correction">{getName(producer, med.producer_id)}</td>
            <td>
                <ul className="list-actions">
                    <li>
                        <Link to={`details/${med._id}`}
                              className="list-actions-button-details">{t('list-actions.details')}</Link>
                    </li>
                    {currentUser.roleId === med.producer_id || currentUser.role === 'admin' ?
                    <li>
                        <Link to={`edit/${med._id}`}
                              className="list-actions-button-edit">{t('list-actions.edit')}</Link>
                    </li>
                        : '' }
                    {currentUser.roleId === med.producer_id || currentUser.role === 'admin'  ?
                        <li>
                        <Link onClick={() => {
                            deleteMedicine(med._id)
                        }} className="list-actions-button-delete">{t('list-actions.delete')}</Link>
                    </li>: '' }

                </ul>
            </td>
        </tr>
    )
}

//

function getName(producer, medId) {
    for (let i = 0; i < producer.length; i++) {
        if (producer[i]._id === medId) {
            return producer[i].name
        }
    }
}

export default MedicinesListTableRow