import React, {useEffect, useState} from "react";
import formMode, {formValidationKeys} from "../../helpers/formHelpser";
import {
    addMedicinesApiCall, getMedicinesApiCall,
    getMedicinesByIdApiCall,
    updateMedicinesApiCall
} from "../../apiCalls/Medicines/medicinesApiCalls";
import {
    checkRequired,
    checkTextLengthRange,
    checkThatItStartsWithACapitalLetter,
    checkThatDateIs_ThanTheCurrent, checkIfItContainsOnly, checkDateFormat
} from '../../helpers/validationCommon'
import FormInput from "../Form/FormInput";
import FormButtons from "../Form/FormButtons";
import {getFormattedData} from "../../helpers/dateHelper";
import {getProducerApiCall, getProducerByIdApiCall} from "../../apiCalls/Producer/producerApiCalls";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

export default function MedicinesForm() {


    const {t} = useTranslation();

    let pathname = window.location.pathname
    let id = pathname.split('/')
    const medId = id[3]

    const navigate = useNavigate()

    const currentFormMode = medId ? formMode.EDIT : formMode.NEW

    const [name, setName] = useState('')

    const [medicines, setMedicines] = useState({})
    const [allProducer, setAllProducer] = useState({})
    const [producer, setProducer] = useState({})
    const [selectedOption, setSelectedOption] = useState('')

    const [nameError, setNameError] = useState('')
    const [parallel_importerError, setParallel_importerError] = useState('')
    const [expiration_dateError, setExpiration_dateError] = useState('')
    const [producer_idError, setProducer_idError] = useState('')

    const [error, setError] = useState(null)
    const [message, setMessge] = useState('')

    const [redirect, setRedirect] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)

    const fetchError = error ? `Błąd: ${message}` : ''

    let errors = [nameError, parallel_importerError, expiration_dateError, producer_idError]

    useEffect(() => {
        if (currentFormMode === formMode.EDIT && !isLoaded) {
            getMedicinesByIdApiCall(medId)
                .then((res) => (res.json()))
                .then((data) => {
                    setMedicines(data)
                    setSelectedOption(data.producer_id)

                })
        } else {
            setMedicines({
                name: '',
                parallel_importer: '',
                expiration_date: '',
                producer_id: '',
                producer: [],
                wholesalerMedicines: []
            })
        }
        getProducerApiCall()
            .then((res) => (res.json()))
            .then((data) => {
                setAllProducer(data)
                setIsLoaded(true)
            })
            .catch((error) => {
                setError(error)
                setIsLoaded(true)
            })
    }, [])

    if (medicines.parallel_importer === null) {
        medicines['parallel_importer'] = ''
    }

    let options;
    if (isLoaded) {
        let text = t('various.conditions.choose_from_list')
        options = []
        let obj = {}
        obj['value'] = 0;
        obj['label'] = '-- ' + text + ' --'
        options.push(obj)
        for (let i of allProducer) {
            let obj = {}
            obj['value'] = i._id;
            obj['label'] = i.name;
            options.push(obj)
        }

    }

    const handleChange = (event) => {
        const {name, value} = event.target
        console.log("name: " + name)
        console.log("value: " + value)
        console.log("medicine: ")
        console.log(medicines)
        setName(value)
        medicines[name] = value

        const errorMessage = validateField(name, value)
        switch (name) {
            case 'name':
                setNameError(errorMessage);
                break
            case 'parallel_importer':
                setParallel_importerError(errorMessage);
                break;
            case 'expiration_date' :
                setExpiration_dateError(errorMessage);
                break;
        }
        //
        // this.setState({
        //     med,
        //     errors
        // })
    }

    const selectHandleChange = ({target}) => {
        const {value} = target
        setSelectedOption(value)
        medicines["producer_id"] = value
        for (let prod of allProducer) {
            if (prod._id.toString() === value) {
                medicines["producer"] = prod
            }
        }
        const errorMessage = validateField("producer_id", value)
        setProducer_idError(errorMessage)
    }

    const validateField = (fieldName, fieldValue) => {
        let errorMessage = '';

        if (fieldName === 'name') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 90)) {
                errorMessage = formValidationKeys.len_2_90
            } else if (checkIfItContainsOnly("numbers", fieldValue)) {
                errorMessage = t('errors.name.only_numbers');
            } else if (!checkThatItStartsWithACapitalLetter(fieldValue)) {
                errorMessage = t('errors.name.capital_letter');
            }
        }

        if (fieldName === 'parallel_importer') {
            if (checkRequired(fieldValue)) {
                if (!checkTextLengthRange(fieldValue, 2, 100)) {
                    errorMessage = t('errors.medicines.parallel_importer_2-100');
                } else if (checkIfItContainsOnly("numbers", fieldValue)) {
                    errorMessage = t('errors.medicines.parallel_importer_only_numbers');
                } else if (!checkThatItStartsWithACapitalLetter(fieldValue)) {
                    errorMessage = t('errors.medicines.parallel_importer_capital_letter');
                }
            }
        }

        if (fieldName === 'expiration_date') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkDateFormat(fieldValue)) {
                errorMessage = t('errors.expiration_date_invalid_format');
            } else if (checkThatDateIs_ThanTheCurrent("earlier", fieldValue)) {
                errorMessage = t('errors.medicines.expiration_date_not_after_then_today');
            }
        }

        if (fieldName === 'producer_id') {
            if (fieldValue === "0") {
                errorMessage = t('errors.req_field');
            }
        }
        return errorMessage
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validateForm()
        if (isValid) {
            let promise, response, message;
            if (currentFormMode === formMode.NEW) {
                promise = addMedicinesApiCall(medicines)
                message = t('medicines.form.details.addMedicineSuccess')
            } else if (currentFormMode === formMode.EDIT) {
                promise = updateMedicinesApiCall(medId, medicines)
                message = t('medicines.form.details.editMedicineSuccess')
            }
            if (promise) {
                promise
                    .then((res) => {
                        response = res;
                        if(res.status === 201 || res.status === 500){
                            return res.json()
                        }
                    })
                    .then(
                        (data) => {
                            if (data && data.status === 500) {
                                console.log("Error")
                            } else {
                                localStorage.setItem("formMessage", message)
                                navigate("/medicines")
                            }
                        },
                        (error) => {
                            setError(error)
                        }
                    )
            }
        }
    }

    const validateForm = () => {
        let isValid = true;
        if (hasErrors()) {
            isValid = false;
        }
        if (medicines.name === '') {
            setNameError(t('errors.req_field'))
            isValid = false;
        }
        if (medicines.expiration_date === '') {
            setExpiration_dateError(t('errors.req_field'))
            isValid = false;
        }
        if (medicines.producer_id === "") {
            setProducer_idError(t('errors.req_field'))
            isValid = false;
        }
        return isValid;
    }

    const hasErrors = () => {
        for (const fieldName in errors) {
            if (errors[fieldName].length > 0) {
                return true;
            }
        }
        return false;
    }

    const errorsSummary = hasErrors() ? t('errors.errorsSummary') : ''
    const globalErrorMessage = errorsSummary || fetchError || message

    if (isLoaded) {
        return (

            <main>

                <h2>
                    {(currentFormMode === formMode.EDIT) ? t('medicines.form.edit.title') : t('medicines.form.details.addTitle')}
                </h2>
                <hr/>
                <p></p>

                <form className="form" onSubmit={handleSubmit}>
                    <FormInput
                        type="text"
                        label={t('wholesaler.form.details.drugName')}
                        required
                        error={nameError}
                        name="name"
                        placeholder={" 2 - 90 " + t('various.conditions.characters')}
                        onChange={handleChange}
                        value={medicines.name}
                    />
                    <FormInput
                        type="text"
                        label={t('medicines.list.parallel_import')}
                        error={parallel_importerError}
                        name="parallel_importer"
                        placeholder={t('various.conditions.empty_or') + " 2 - 100 " + t('various.conditions.characters')}
                        onChange={handleChange}
                        value={medicines.parallel_importer}
                    />
                    <FormInput
                        type="date"
                        label={t('medicines.list.expiration_date')}
                        required
                        error={expiration_dateError}
                        name="expiration_date"
                        placeholder={t('various.conditions.date_format')}
                        onChange={handleChange}
                        value={getFormattedData(medicines.expiration_date)}
                    />

                    <label>{t('medicines.list.producer')}: <abbr title={t('errors.req_field')} aria-label="required"
                                                                 className='symbol-required'> *</abbr></label>
                    <select name='select' value={selectedOption} onChange={selectHandleChange}
                            className={producer_idError === '' ? '' : "error-input"} required>
                        {
                            options.map(({value, label}) => <option value={value}>{label}</option>)
                        }
                    </select>

                    <span id="errorSelect" className="errors-text">{producer_idError}</span>

                    <FormButtons
                        formMode={currentFormMode}
                        error={globalErrorMessage}
                        cancelPath="/medicines"
                    />
                </form>

            </main>


        )
    } else {
        return (
            <main>
                <h2>
                    {(currentFormMode === formMode.EDIT) ? t('medicines.form.edit.title') : t('medicines.form.details.addTitle')}
                </h2>
                <hr/>
                <p>
                    {t('various.data.loading')}...
                </p>

            </main>
        )
    }

}
