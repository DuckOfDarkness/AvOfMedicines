import {getFormattedData} from "../../../helpers/dateHelper";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";

function MedicinesDetailsTable(props) {
    const med = props.medData
    const {t} = useTranslation();
    const [producer, setProducer] = useState({})

    console.log("med.producer: ")
    console.log(med.producer)


    return (
        <React.Fragment>
            <h2>{t('medicines.form.details.title')}</h2><hr/>
            <p><b>{t('whole-med.list.name')}: </b>{med.name}</p>
            <p><b>{t('medicines.list.parallel_import')}: </b>{med.parallel_importer}</p>
            <p><b>{t('medicines.list.producer')}: </b>{med.producer.name}</p>
            <p><b>{t('medicines.list.expiration_date')}: </b>{med.expiration_date ? getFormattedData(med.expiration_date) : ""}</p>

            &nbsp;
            <p><h2>{t('medicines.form.details.secondTitle')}</h2></p><hr/>&nbsp;
            <table className="table-list">
                <thead>
                <tr>
                    <th>{t('medicines.form.details.wholesalerName')}</th>
                    <th>{t('medicines.form.details.amount')}</th>
                    <th>{t('medicines.form.details.date_of_purchase')}</th>
                </tr>
                </thead>
                <tbody>

                    {med.wholesalerMedicines.map(
                        av =>
                            <tr key={av._id}>
                                <td>{av.wholesaler.name}</td>
                                <td>{av.amount}</td>
                                <td>{av.date_of_purchase ? getFormattedData(av.date_of_purchase) : ""}</td>
                            </tr>
                    )}
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default MedicinesDetailsTable

