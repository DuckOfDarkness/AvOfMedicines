import React from 'react'
import WholesalerListTableRow from "./WholesalerListTableRow";

function WholesalerListTable(props) {
    const wholesaler = props.wholeList
    if(wholesaler.length !== 0){
        return (
            <table className="table-list">
                <thead>
                <tr>
                    <th>Nazwa hurtowni</th>
                    <th>Numer NIP</th>
                    <th>Akcje</th>
                </tr>
                </thead>
                <tbody>
                {wholesaler.map(whole =>
                    <WholesalerListTableRow wholeData={whole} key={whole._id}/>)}
                </tbody>
            </table>
        )
    }else{
        return (
            <p className="errors-text">Brak hurtowni w bazie danych</p>
        )
    }
}

export default WholesalerListTable