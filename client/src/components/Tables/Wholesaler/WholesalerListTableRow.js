import React from 'react'
import { Link } from 'react-router-dom'

function ProducerListTableRow(props) {
    const whole = props.wholeData
    return (
        <tr>
            <td>{whole.name}</td>
            <td>{whole.nip}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`details/${whole._id}`} className="list-actions-button-details">Szczegóły</Link></li>
                    <li><Link to={`edit/${whole._id}`} className="list-actions-button-edit">Edytuj</Link></li>
                    <li><Link to={`delete/${whole._id}`} className="list-actions-button-delete">Usuń</Link></li>
                </ul>
            </td>
        </tr>
    )
}

export default ProducerListTableRow