import {getFormattedData} from "../../../helpers/dateHelper";
import React from "react";
import AvailabilitiesListTableRow from "./AvailabilitiesListTableRow";
import {t} from "i18next";

function AvailabilitiesDetailsTable(props) {
    const av = props.availabilitiesData
    return(
        <React.Fragment>
            <p><b>{t('wholesaler.form.details.drugName')}: </b>{av.medicines.name}</p>
            <p><b>{t('wholesaler.list.name')}: </b>{av.wholesaler.name}</p>
            <p><b>{t('wholesaler.form.details.amount')}: </b>{av.amount}</p>
            <p><b>{t('wholesaler.form.details.date_of_purchase')}: </b>{getFormattedData(av.date_of_purchase)}</p>

            {/*{avail.map(availability =>*/}
            {/*    <AvailabilitiesListTableRow avData={availability} key={availability._id}/>*/}
            {/*)}*/}
            {/*{avail.medicines_id}*/}
            {/*<p><b>Nazwa leku: </b>{avail.medicines.name}</p>*/}
            {/*<p><b>Nazwa hurtowni: </b>{avail.wholesaler.name}</p>*/}
            {/*<p><b>Dostępna ilość: </b>{avail.amount}</p>*/}
            {/*<p><b>Data zakupu: </b>{avail.date_of_purchase ? getFormattedData(avail.date_of_purchase) : ""}</p>*/}
        </React.Fragment>
    )
}

export default AvailabilitiesDetailsTable

