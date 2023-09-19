import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import formMode from "../../helpers/formHelpser";
import {
    addProducerApiCall,
    getProducerByIdApiCall,
    updateProducerApiCall
} from "../../apiCalls/Producer/producerApiCalls";
import {
    checkCorrectCountry,
    checkDateFormat,
    checkIfItContainsOnly,
    checkRequired,
    checkTextLengthRange, checkThatDateIs_ThanTheCurrent,
    checkThatItStartsWithACapitalLetter
} from "../../helpers/validationCommon";
import FormInput from "../Form/FormInput";
import FormButtons from "../Form/FormButtons";
import {hashPassword} from "../../helpers/authHelper";

export default function ProducerForm() {

    const {t} = useTranslation();

    let pathname = window.location.pathname
    let id = pathname.split('/')
    const prodId = id[3]

    const navigate = useNavigate()

    const currentFormMode = prodId ? formMode.EDIT : formMode.NEW

    const [producer, setProducer] = useState({})
    const [name, setName] = useState('')
    const [country, setCountry] = useState('')

    const [nameError, setNameError] = useState('')
    const [countryError, setCountryError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const [error, setError] = useState(null)
    const [message, setMessge] = useState('')

    const [redirect, setRedirect] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)

    const[password, setPassword] = useState('')

    const fetchError = error ? `Błąd: ${message}` : ''

    let errors = [nameError, countryError]

    const[blankPassword, setBlankPassword] = useState(true)

    useEffect(() => {
        if (currentFormMode === formMode.EDIT && !isLoaded) {
            getProducerByIdApiCall(prodId)
                .then((res) => (res.json()))
                .then((data) => {
                    setProducer(data)
                    setIsLoaded(true)
                })
                .catch((error) => {
                    setError(error)
                    setIsLoaded(true)
                })
        } else {
            setProducer({
                name: '',
                country: '',
                medicines: [],
                password: ''
            })
            console.log(producer)
            setIsLoaded(true)
        }
    }, [])

    console.log(producer)
    const handleChange = (event) => {
        const {name, value} = event.target
        setName(value)
        producer[name] = value

        if(name === 'password'){
            setBlankPassword(false)
        }

        const errorMessage = validateField(name, value)
        switch (name) {
            case 'name':
                setNameError(errorMessage);
                break
            case 'country':
                setCountryError(errorMessage);
                break;
            case 'password':
                setPasswordError(errorMessage)
                break;
        }
    }

    const validateField = (fieldName, fieldValue) => {
        let errorMessage = '';

        if (fieldName === 'name') {
            if (!checkRequired(fieldValue)) {
                errorMessage = t('errors.req_field');
            } else if (!checkTextLengthRange(fieldValue, 2, 100)) {
                errorMessage = t('errors.producer.name_2-100');
            } else if (checkIfItContainsOnly("numbers", fieldValue)) {
                errorMessage = t('errors.name.only_numbers');
            } else if (!checkThatItStartsWithACapitalLetter(fieldValue)) {
                errorMessage = t('errors.name.capital_letter');
            }
        }

        if (fieldName === 'country') {
            if (!checkRequired(fieldValue)) {
                errorMessage = t('errors.req_field');
            }else if(!checkTextLengthRange(fieldValue, 2, 100)){
                errorMessage = t('errors.producer.country_2-90');
            }else if(!checkThatItStartsWithACapitalLetter(fieldValue)) {
                errorMessage = t('errors.producer.country_invalid');
            }else if (checkCorrectCountry(fieldValue)) {
                errorMessage = t('errors.producer.country_onlyLetters');
            }
        }

        if(fieldName === 'password') {
            if (!checkRequired(fieldValue)) {
                errorMessage = t('errors.req_field');
            }
        }

        return errorMessage
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validateForm()
        if (isValid) {
            let passwordBeforeHash = producer["password"]
            producer["password"] = hashPassword(passwordBeforeHash)
            let promise, response, message;
            if (currentFormMode === formMode.NEW) {
                promise = addProducerApiCall(producer)
                message = t('various.add.producer_add')
                // navigate("/producer")
                // window.location.reload();
                localStorage.setItem("formMessage", message)
            } else if (currentFormMode === formMode.EDIT) {
                promise = updateProducerApiCall(prodId, producer)
                message = t('various.update.producer_update')
                localStorage.setItem("formMessage", message)
                // navigate("/producer")
                // window.location.reload();
            }
            if (promise) {
                promise
                    .then((res) => {
                        response = res;
                        if(res.status === 201 || res.status === 500){
                            console.log(res)
                            return res.json()
                        }
                    })
                    .then(
                        (data) => {
                            if (data && data.status === 500) {
                                console.log("Error")
                            } else {
                                localStorage.setItem("formMessage", message)
                                navigate("/producer")
                                // window.location.reload();
                            }
                        },
                        (error) => {
                            console.log(error)
                            setError("error: "+error)
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
        if (producer.name === '') {
            setNameError(t('errors.req_field'))
            isValid = false;
        }
        if (producer.country === '') {
            setCountryError(t('errors.req_field'))
            isValid = false;
        }
        if(producer.password === ''){
            setPasswordError(t('errors.req_field'))
            isValid = false;
        }
        if(blankPassword){
            setPasswordError(t('errors.req_field'))
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
                    {(currentFormMode === formMode.EDIT) ? t('producer.form.edit.title') : t('producer.list.addTitle')}
                </h2>
                <hr/>
                <p></p>

                <form className="form" onSubmit={handleSubmit}>
                    <FormInput
                        type="text"
                        label={t('producer.list.name')}
                        required
                        error={nameError}
                        name="name"
                        placeholder={" 2 - 100 " + t('various.conditions.characters')}
                        onChange={handleChange}
                        value={producer.name}
                    />
                    <FormInput
                        type="text"
                        label={t('producer.list.country')}
                        required
                        error={countryError}
                        name="country"
                        placeholder={" 2 - 100 " + t('various.conditions.characters')}
                        onChange={handleChange}
                        value={producer.country}
                    />
                    <FormInput
                        type="password"
                        label={t('account.password')}
                        required
                        error={passwordError}
                        name="password"
                        placeholder={" 2 - 100 " + t('various.conditions.characters')}
                        onChange={handleChange}
                        value={producer.password}
                    />

                    <FormButtons
                        formMode={currentFormMode}
                        error={globalErrorMessage}
                        cancelPath="/producer"
                    />
                </form>

            </main>
        )
    } else {
        return (
            <main>
                <h2>
                    {(currentFormMode === formMode.EDIT) ? t('producer.form.edit.title') : t('producer.list.add')}
                </h2>
                <hr/>
                <p>
                    {t('various.data.loading')}...
                </p>

            </main>
        )
    }

}

