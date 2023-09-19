import React from "react";
import Select from "react-select";

function SelectInput(props) {
    const className = props.error === '' ? '' : 'error-input'
    const name = props.name
    const errorSpanId = 'error' + name[0].toUpperCase() + name.slice(1)
    return (
        <>
            <label htmlFor={props.name}>
                {props.label}:
                {props.required && <abbr title="Pole wymagane" aria-label="required" className='symbol-required'> *</abbr>}
            </label>
            <select
                value={props.selected}
                options={props.options}
                className={className}
                name={props.name}
                placeholder={props.placeholder}
                onChange={props.onChange}
            />

            <span id={errorSpanId} className="errors-text">{props.error}</span>
        </>
    )
}

export default SelectInput