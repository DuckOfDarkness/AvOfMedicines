import React from "react";

function MedicinesDetailsTable(props) {
    const whole = props.wholeData
    return (
        <React.Fragment>
            <hr/>
            <p><b>Nazwa hurtowni: </b>{whole.name}</p>
            <p><b>Numer NIP: </b>{whole.nip}</p>

            <p>&nbsp;</p>
            <p><h2>Lista dostępności leków w hurtowni</h2></p>
            <hr/>
            <table className="table-list">
                <thead>
                <tr>
                    <th>Nazwa leku</th>
                    <th>Dostępna ilość</th>
                    <th>Data zakupu</th>
                </tr>
                </thead>
                <tbody>
                    {whole.availabilities.map(
                        wh =>
                            <tr key={wh._id}>
                                <td>{wh.name}</td>
                                <td>{wh.name}</td>
                                <td>{wh.name}</td>
                            </tr>
                    )}
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default MedicinesDetailsTable

