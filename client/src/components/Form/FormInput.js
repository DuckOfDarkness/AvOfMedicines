import React from "react";
import {t} from "i18next";
import {useTranslation} from "react-i18next";

function FormInput(props) {
    const {t} = useTranslation();

    const className = props.error === '' ? '' : 'error-input'
    const name = props.name
    const errorSpanId = 'error' + name[0].toUpperCase() + name.slice(1)
    return (
        <>
            <label htmlFor={props.name}>
                {props.label}:
                {props.required && <abbr title={t('errors.req_field')} aria-label="required" className='symbol-required'> *</abbr>}
            </label>
            <input
                type={props.type}
                className={className}
                name={props.name}
                id={props.name}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
            />
            <span id={errorSpanId} className="errors-text">{props.error}</span>
        </>
    )
}

export default FormInput