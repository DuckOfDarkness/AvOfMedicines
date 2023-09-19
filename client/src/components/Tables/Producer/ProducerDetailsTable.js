import React from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

function MedicinesDetailsTable(props) {
    const prod = props.prodData
    const { t } = useTranslation();


    return (
        <React.Fragment>
            <h2>{t('producer.form.details.title')}</h2>
            <hr/>
            <p><b>{t('producer.list.name')}: </b>{prod.name}</p>
            <p><b>{t('producer.list.country')}: </b>{prod.country}</p>

            <p>&nbsp;</p>
            <p><h2>{t('producer.form.details.secondTitle')}</h2></p>

            <hr/>
            &nbsp;
            {prod.medicines.length === 0 ?  <p className='errors-text'>{t('medicines.list.noData')}</p>  :
            <form className="form">
            <table className="table-list">
                <thead>
                <tr>
                    <th>{t('producer.form.details.name')}</th>
                </tr>
                </thead>
                <tbody>
                {
                    prod.medicines.map(
                        pro =>
                            <tr key={pro._id}>
                                <td><Link to={`/medicines/details/${pro._id}`}>{pro.name}</Link></td>
                            </tr>
                    )}
                </tbody>
            </table>
            </form>}
        </React.Fragment>
    )
}

export default MedicinesDetailsTable

