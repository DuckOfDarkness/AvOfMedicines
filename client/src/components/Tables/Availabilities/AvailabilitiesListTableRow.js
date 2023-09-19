import React from "react";
import {Link} from "react-router-dom";
import {getFormattedData} from "../../../helpers/dateHelper";
import {isAuthenticated} from "../../../helpers/authHelper";
import {t} from "i18next";

function AvailabilitiesListTableRow(props) {
    const av = props.avData
    return(
        <tr>
            <td>{av.medicines.name}</td>
            <td>{av.wholesaler.name}</td>
            <td>{av.amount}</td>
            <td className="responsiveness_correction">{av.date_of_purchase ? getFormattedData(av.date_of_purchase) : ""}</td>
            <td>
                {isAuthenticated() &&<ul className="list-actions">
                    <li><Link to={`details/${av._id}`} className="list-actions-button-details">{t('list-actions.details')}</Link></li>
                    <li><Link to={`edit/${av._id}`} className="list-actions-button-edit">{t('list-actions.edit')}</Link></li>
                    <li><Link to={`delete/${av._id}`} className="list-actions-button-delete">{t('list-actions.delete')}</Link></li>
                </ul>}
            </td>
        </tr>
    )
}

export default AvailabilitiesListTableRow