import React from "react";
import {Link} from "react-router-dom";
import formMode from "../../helpers/formHelpser";
import {useTranslation} from "react-i18next";

function FormButtons(props){
    const { t, i18n } = useTranslation();
    // const submitButtonLabel = props.formMode === formMode.NEW ? t('medicines.form.details.btnLabel') : t('various.edit.confirm')
    let submitButtonLabel
    // eslint-disable-next-line default-case
    switch (props.formMode){
        case formMode.NEW: submitButtonLabel = t('medicines.form.details.btnLabel')
            break
        case formMode.EDIT: submitButtonLabel = t('various.edit.confirm')
            break
        case formMode.LOGIN: submitButtonLabel = t('account.logIn')
    }

    return(
        <div className="form-buttons">
            <p id="errorsSummary" className="errors-text">{props.error}</p>
            <input className="form-button-submit" type="submit" value={submitButtonLabel}/>
            <Link to={props.cancelPath} className="form-button-cancel">{t('various.edit.cancel')}</Link>
        </div>
    )
}

export default FormButtons