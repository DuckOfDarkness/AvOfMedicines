import React from 'react'
import {useTranslation} from "react-i18next";
import UserListTableRow from "./UserListTableRow";

function UserListTable(props) {
    const { t } = useTranslation();
    const users = props.usrsList
    if(users.length !== 0){
        return (
            <table className="table-list">
                <thead>
                <tr>
                    <th>{t('account.usrName')}</th>
                    <th>{t('account.role')}</th>
                    <th className="responsiveness_correction">{t('account.id_usr')}</th>
                    <th>{t('list-actions.title')}</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user =>
                    <UserListTableRow userData={user} key={user._id}/>)}
                </tbody>
            </table>
    )
    }else{
        return (
            <p className="errors-text">{t('account.noData')}</p>
        )
    }
}

export default UserListTable