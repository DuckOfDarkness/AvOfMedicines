import React from 'react'
import MedicinesListTableRow from "./MedicinesListTableRow";
import {getFormattedData} from "../../../helpers/dateHelper";
import {useTranslation} from "react-i18next";

function MedicinesListTable(props) {
    const { t, i18n } = useTranslation();
    const medicines = props.medList
    if(medicines.length !== 0){
        return (
            <table className="table-list">
                <thead>
                <tr>
                    <th>{t('whole-med.list.name')}</th>
                    <th className="responsiveness_correction">{t('medicines.list.parallel_import')}</th>
                    <th>{t('medicines.list.expiration_date')}</th>
                    <th className="responsiveness_correction">{t('medicines.list.producer')}</th>
                    <th>{t('list-actions.title')}</th>
                </tr>
                </thead>
                <tbody>
                {medicines.map(med =>
                    <MedicinesListTableRow medData={med} key={med._id}/>)}
                </tbody>
            </table>
    )
    }else{
        return (
            <p className="errors-text">{t('medicines.list.noData')}</p>
        )
    }
}

export default MedicinesListTable