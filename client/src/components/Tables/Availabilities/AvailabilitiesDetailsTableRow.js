import React from "react";
import {Link} from "react-router-dom";
import {getFormattedData} from "../../../helpers/dateHelper";

function AvailabilitiesDetailsTableRow(props) {
    const av = props.avData
    return(
        <tr>
            <td>{av.medicines.name}</td>
            <td>{av.wholesaler.name}</td>
            <td>{av.amount}</td>
            <td>{av.date_of_purchase ? getFormattedData(av.date_of_purchase) : ""}}</td>
        </tr>
    )
}

export default AvailabilitiesDetailsTableRow