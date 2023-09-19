import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import formMode from "../../helpers/formHelpser";
import {
    addWholesalerApiCall,
    getWholesalerByIdApiCall,
    updateWholesalerApiCall
} from "../../apiCalls/Wholesaler/wholesalerApiCalls";
import {
    addProducerApiCall,
    getProducerByIdApiCall,
    updateProducerApiCall
} from "../../apiCalls/Producer/producerApiCalls";
import FormInput from "../Form/FormInput";
import FormButtons from "../Form/FormButtons";
import {
    checkCorrectCountry,
    checkIfItContainsOnly,
    checkRequired,
    checkTextLengthRange,
    checkThatItStartsWithACapitalLetter
} from "../../helpers/validationCommon";

export default function WholesalerForm() {

    const {t} = useTranslation();

    let pathname = window.location.pathname
    let id = pathname.split('/')
    const wholeId = id[3]

    const navigate = useNavigate()

    const currentFormMode = wholeId ? formMode.EDIT : formMode.NEW

    const [wholesaler, setWholesaler] = useState({
        name: '',
        nip: '',
        password: ''
    })

    const [name, setName] = useState("")
    const [nip, setNip] = useState("")
    const [password, setPassword] = useState("")

    const [nameError, setNameError] = useState('')
    const [nipError, setNipError] = useState('')
    let errors = [nameError, nipError]
    const [passwordError, setPasswordError] = useState('')

    const [error, setError] = useState('')

    const [isLoaded, setIsLoaded] = useState(false)
    const [message, setMessge] = useState('')

    const fetchError = error ? `Błąd: ${message}` : ''

    useEffect(() => {
        if (currentFormMode === formMode.EDIT && !isLoaded) {
            getWholesalerByIdApiCall(wholeId)
                .then((res) => (res.json()))
                .then((data) => {
                    setWholesaler(data)
                    setIsLoaded(true)
                })
                .catch((error) => {
                    setError(error)
                    setIsLoaded(true)
                })
        }
        setIsLoaded(true)

    }, [])


    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validateForm()
        if (isValid) {
            let promise, response, message;
            if (currentFormMode === formMode.NEW) {
                promise = addWholesalerApiCall(wholesaler)
                message = t('various.add.wholesaler_add')
                // navigate("/producer")
                // window.location.reload();
                localStorage.setItem("formMessage", message)
            } else if (currentFormMode === formMode.EDIT) {
                promise = updateWholesalerApiCall(wholeId, wholesaler)
                message = t('various.update.wholesaler_update')
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
                                navigate("/wholesaler")
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
        if (wholesaler.name === '') {
            setNameError(t('errors.req_field'))
            isValid = false;
        }
        if (wholesaler.nip === '') {
            setNipError(t('errors.req_field'))
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

    const handleChange = (event) => {
        const {name, value} = event.target
        setName(value)
        wholesaler[name] = value
        const errorMessage = validateField(name, value)
        switch (name) {
            case 'name':
                setNameError(errorMessage);
                break
            case 'nip':
                setNipError(errorMessage);
                break;
        }
    }

    const validateField = (fieldName, fieldValue) => {
        let errorMessage = '';

        if (fieldName === 'name') {
            if (!checkRequired(fieldValue)) {
                errorMessage = t('errors.req_field');
            } else if (!checkTextLengthRange(fieldValue, 2, 70)) {
                errorMessage = "Nazwa producenta musi miec od 2 do 70 znaków";
            } else if (checkIfItContainsOnly("numbers", fieldValue)) {
                errorMessage = t('errors.name.only_numbers');
            } else if (!checkThatItStartsWithACapitalLetter(fieldValue)) {
                errorMessage = t('errors.name.capital_letter');
            }
        }

        if (fieldName === 'nip') {
            if (!checkRequired(fieldValue)) {
                errorMessage = t('errors.req_field');
            }else if(!checkTextLengthRange(fieldValue, 10, 10)){
                errorMessage = "Numer NIP musi mięc 10 cyfr"
            }else if(!checkIfItContainsOnly("numbers", fieldValue)) {
                errorMessage = "Numer nip musi składać się z samych cyfr"
            }
        }
        return errorMessage
    }


    if (isLoaded) {
        return (

            <main>

                <h2>
                    {(currentFormMode === formMode.EDIT) ? t('wholesaler.form.edit.title') : t('wholesaler.form.details.addTitle')}
                </h2>
                <hr/>
                <p></p>

                <form className="form" onSubmit={handleSubmit}>
                    <FormInput
                        type="text"
                        label={t('wholesaler.list.name')}
                        required
                        error={nameError}
                        name="name"
                        placeholder={" 2 - 100 " + t('various.conditions.characters')}
                        onChange={handleChange}
                        value={wholesaler.name}
                    />
                    <FormInput
                        type="text"
                        label={t('wholesaler.list.nip')}
                        required
                        error={nipError}
                        name="nip"
                        placeholder={"10 " + t('various.conditions.digit')}
                        onChange={handleChange}
                        value={wholesaler.nip}
                    />
                    <FormInput
                        type="password"
                        label={t('account.password')}
                        required
                        error={passwordError}
                        name="password"
                        onChange={handleChange}
                        // value={}
                    />

                    <FormButtons
                        formMode={currentFormMode}
                        error={globalErrorMessage}
                        cancelPath="/wholesaler"
                    />
                </form>

            </main>
        )
    } else {
        return (
            <main>
                <h2>
                    {(currentFormMode === formMode.EDIT) ? t('wholesaler.form.edit.title') : t('wholesaler.list.add')}
                </h2>
                <hr/>
                <p>
                    {t('various.data.loading')}...
                </p>

            </main>
        )
    }

}

//
// class WholesalerForm extends React.Component {
//     render() {
//         return (
//             < main>
//                 < h2> Nowa hurtownia</h2><hr/>
//                 <form className="form">
//                     <label htmlFor="name">Nazwa: <abbr title="required" aria-label="required">*</abbr></label>
//                     <input type="text" name="name" id="name" placeholder="2 - 70 znaków" value=""/>
//                     <span id="errorName" className="errors-text"></span>
//
//                     <label htmlFor="nip">NIP: <abbr title="required" aria-label="required">*</abbr></label>
//                     <input type="nip" name="nip" id="nip" placeholder=" 10 cyfr" value=""/>
//                     <span id="errorNip" className="errors-text"></span>
//
//                     <div className="form-buttons">
//                         <p id="errorsSummary" className="errors-text"></p>
//                         <input className="form-button-submit" type="submit" value="Dodaj"/>
//                         <Link to="/wholesaler" className="form-button-cancel">Anuluj</Link>
//                     </div>
//                 </form>
//             </main>
//         )
//     }
// }
//
// export default WholesalerForm