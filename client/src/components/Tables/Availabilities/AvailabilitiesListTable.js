import React from 'react'
import AvailabilitiesListTableRow from "./AvailabilitiesListTableRow";
import {useTranslation} from "react-i18next";
import {t} from "i18next";


function AvailabilitiesListTable(props) {
    const avail = props.avData
     if(avail.length !== 0){
        return (
            <table className="table-list">
                <thead>
                <tr>
                    <th>{t('medicines.list.name')}</th>
                    <th>{t('medicines.form.details.wholesalerName')}</th>
                    <th>{t('medicines.form.details.amount')}</th>
                    <th className="responsiveness_correction">{t('medicines.form.details.date_of_purchase')}</th>
                    <th>{t('list-actions.title')}</th>
                </tr>
                </thead>
                <tbody>
                {avail.map(availability =>
                    <AvailabilitiesListTableRow avData={availability} key={availability._id}/>
                )}
                </tbody>
            </table>
        )
    }else{
        return (
            <p className="errors-text">{t('whole-med.list.noData')}</p>
        )
    }

}

export default AvailabilitiesListTable