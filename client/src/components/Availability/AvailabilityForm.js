import React from "react";
import {Link} from "react-router-dom";
import {getMedicinesApiCall} from "../../apiCalls/Medicines/medicinesApiCalls";
import {getWholesalerApiCall} from "../../apiCalls/Wholesaler/wholesalerApiCalls";

class AvailabilityForm extends React.Component {
    render() {
        const allMedicines = getMedicinesApiCall()
        const allWholesaler = getWholesalerApiCall()

        return(
            <main>
                <h2>Nowa dostępność leku</h2><hr/>

                <form className="form">
                    <label htmlFor="medicines">Lek: <abbr title="required" aria-label="required">*</abbr></label>
                    <select id="medicines" name="medId" required>
                        <option value="">--- Wybierz lek ---</option>
                        {allMedicines.map(med =>
                            (<option key={med._id} value={med._id}  label={med.name}></option>)
                        )}
                    </select>
                    <span id="errorMedicines" className="errors-text"></span>

                    <label htmlFor="wholesaler">Hurtownia: <abbr title="required" aria-label="required">*</abbr></label>
                    <select id="wholesaler" name="wholeId" required>
                        <option value="">--- Wybierz hurtownie ---</option>
                        {allWholesaler.map(whole =>
                            (<option key={whole._id} value={whole._id}  label={whole.name}></option>)
                        )}
                    </select>
                    <span id="errorWholesaler" className="errors-text"></span>

                    <label htmlFor="amount">Ilość opakowań: <abbr title="required" aria-label="required">*</abbr></label>
                    <input type="number" name="amount" value="" id="amount" placeholder="1 - 9999"/>
                    <span id="errorAmount" className="errors-text"></span>

                    <label htmlFor="date_of_purchase">Data zakupu: <abbr title="required" aria-label="required">*</abbr></label>
                    <input type="date" name="date_of_purchase" value="" id="date_of_purchase" />
                    <span id="errorDate_of_purchase" className="errors-text"></span>

                    <div className="form-buttons">
                        <p id="errorsSummary" className="errors-text"></p>
                        <input className="form-button-submit" type="submit" value="Dodaj"/>
                        <Link to="/availability" className="form-button-cancel">Anuluj</Link>
                    </div>
                </form>
            </main>
        )
    }
}

export default AvailabilityForm