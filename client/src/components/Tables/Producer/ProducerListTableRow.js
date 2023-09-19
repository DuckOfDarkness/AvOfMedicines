import React from 'react'
import {Link, useLocation} from 'react-router-dom'
import {useTranslation} from "react-i18next";
import {deleteProducerApicall} from "../../../apiCalls/Producer/producerApiCalls";
import {getCurrentUser} from "../../../helpers/authHelper";

function ProducerListTableRow(props) {
    const { t, i18n } = useTranslation();
    const currentUser = getCurrentUser()

    const location = useLocation();

    const prod = props.prodData

    const deleteProducer= (id) =>{
        deleteProducerApicall(id)
            .then((res) =>{
                console.log(res)
                localStorage.setItem("deleteMessage", t('producer.form.details.deleteProducerSuccess'))
                window.location.reload()
            })
    }

    return (
        <tr>
            <td>{prod.name}</td>
            <td>{prod.country}</td>


                <td>
                    {currentUser.role === 'admin' ?
                <ul className="list-actions">
                    <li><Link to={`details/${prod._id}`}className="list-actions-button-details">{t('list-actions.details')}</Link></li>
                    <li><Link to={`edit/${prod._id}`} className="list-actions-button-edit">{t('list-actions.edit')}</Link></li>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <li><Link onClick={() => {deleteProducer(prod._id)}} className="list-actions-button-delete">{t('list-actions.delete')}</Link></li>                </ul>
            : ''}
                    </td>
        </tr>
    )
}

export default ProducerListTableRow