import React from 'react'
import ProducerListTableRow from "./ProducerListTableRow";
import {useTranslation} from "react-i18next";

function ProducerListTable(props) {
    const { t, i18n } = useTranslation();
    const producer = props.prodList
    if(producer.length !== 0){
        return (

            <table className="table-list">
                <thead>
                <tr>
                    <th>{t('producer.list.name')}</th>
                    <th>{t('producer.list.country')}</th>
                    <th>{t('list-actions.title')}</th>
                </tr>
                </thead>
                <tbody>
                {producer.map(prod =>
                    <ProducerListTableRow prodData={prod} key={prod._id}/>)}
                </tbody>
            </table>
        )
    }else{
        return (
            <p className="errors-text">{t('producer.list.noData')}</p>
        )
    }


}

export default ProducerListTable