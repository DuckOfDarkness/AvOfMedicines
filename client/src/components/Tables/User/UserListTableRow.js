import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import {useTranslation} from "react-i18next";
import {getCurrentUser, isAuthenticated} from "../../../helpers/authHelper";
import {deleteUserApicall} from "../../../apiCalls/User/userApiCalls";
import {getProducerByIdApiCall} from "../../../apiCalls/Producer/producerApiCalls";
import {deleteMedicinesApicall} from "../../../apiCalls/Medicines/medicinesApiCalls";

function UserListTableRow(props) {
    const user = props.userData
    const { t } = useTranslation();
    const currentUser = getCurrentUser()

    const [error, setError] = useState('')

    const deleteUser = (id) => {
        deleteUserApicall(id)
            .then((res) => {
                localStorage.setItem("deleteMessage", t('various.delete.user_delete'))
                window.location.reload()
                // window.location.href = '/user';
            })
    }

    const [producer, setProducer] = useState({})
    function prodData (prodId){
        getProducerByIdApiCall(prodId)
            .then(res => res.json())
            .then((data) => {
                setProducer(data)
            })
            .catch((error) => {
                setError(error)
            })
    }


    return (
        <tr>
            <td>{user.name}</td>
            <td>{user.role}</td>
            <td className="responsiveness_correction">{user.role_id}</td>

                <td>
                    <ul className="list-actions">
                        {user.role !== 'admin' ?
                        <li><Link to= {user.role=== 'producer' ? `/producer/details/${user.role_id}` :
                            user.role=== 'wholesaler' ? `/wholesaler/details/${user.role_id}` : ''} className="list-actions-button-details">{t('list-actions.details')}</Link></li>
                            : ''}

                        {user.role !== 'admin' ?
                        <li><Link to={user.role=== 'producer' ? `/producer/edit/${user.role_id}` :
                            user.role=== 'wholesaler' ? `/wholesaler/edit/${user.role_id}` : ''} className="list-actions-button-edit">{t('list-actions.edit')}</Link></li>
                            : '' }

                        {user._id !== currentUser.userId ?
                        <li>
                            <Link onClick={() => {
                            deleteUser(user._id)
                        }} className="list-actions-button-delete">{t('list-actions.delete')}</Link>
                        </li>:'' }
                    </ul>
                </td>
        </tr>
    )
}

export default UserListTableRow