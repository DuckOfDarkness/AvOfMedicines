import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useLocation, useNavigate} from "react-router-dom";
import {loginApiCall} from "../../apiCalls/Auth/authApiCalls";
import formMode, {formValidationKeys} from "../../helpers/formHelpser";
import {checkRequired} from "../../helpers/validationCommon";
import FormButtons from "../Form/FormButtons";
import FormInput from "../Form/FormInput";
import {hashPassword} from "../../helpers/authHelper";

function LoginForm(props) {
    const [user, setUser] = useState(
        {
            name: '',
            password: ''
        }
    )
    const [errors, setErrors] = useState(
        {
            name: '',
            password: ''
        }
    )

    const currentFormMode = formMode.LOGIN
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(null)
    const [message, setMessage] = useState(null)

    const [logoutMessage, setLogoutMessage] = useState(localStorage.getItem("logoutMessage"))

    const {t} = useTranslation()
    const navigate = useNavigate()


    function handleChange(event) {
        const {name, value} = event.target
        const errorMessage = validateField(name, value)
        setLoginFailed(false)
        setErrors({
            ...errors,
            [name]: errorMessage
        })
        setUser({
            ...user,
            [name]: value
        })
    }

    const [loginFailed, setLoginFailed] = useState(false)
    let errorsSummary = hasErrors() ? t('errors.errorsSummary') : (loginFailed) ? t('errors.loginFailed') : (logoutMessage === '' ? '' : logoutMessage)
    const fetchError = error ? `${t('error')}: ${error.message}` : ''
    let globalErrorMessage = errorsSummary || fetchError || message

    useEffect(() => {
        if (logoutMessage !== null) {
            setTimeout(() =>{
                localStorage.setItem("logoutMessage", '')
            }, 2000)
        }
    })

    function handleSubmit(event) {
        event.preventDefault()
        const isValid = validateForm()

        if (isValid) {
            let response
            loginApiCall(user)
                .then(res => {
                    response = res
                    return res.json()
                })
                .then(
                    (data) => {
                        if (response.status === 200) {
                            if (data.token) {
                                const userString = JSON.stringify(data)
                                props.handleLogin(userString)
                                navigate(-1)
                            } else if (response.status === 401) {
                                setMessage(data.message)
                            }
                        } else if (response.status === 401) {
                            setLoginFailed(true)
                            console.log(errorsSummary)
                        }
                    },
                    (error) => {
                        setIsLoaded(true)
                        setError(error)
                    }
                )
        }
    }

    function validateField(fieldName, fieldValue) {
        let errorMessage = ''
        if (fieldName === 'name') {
            if (!checkRequired(fieldValue)) {
                // errorMessage = formValidationKeys.notEmpty
                errorMessage = t('validation.messages.notEmpty')
            }
        }
        if (fieldName === 'password') {
            if (!checkRequired(fieldValue)) {
                // errorMessage = formValidationKeys.notEmpty
                errorMessage = t('validation.messages.notEmpty')
            }
        }
        return errorMessage
    }

    function validateForm() {
        let isValid = true
        let serverFieldsErrors = {...errors}
        Object.entries(user).forEach(([key, value]) => {
            const errorMessage = validateField(key, value)
            serverFieldsErrors[key] = errorMessage
            if (errorMessage.length > 0) {
                isValid = false
            }
        })
        setErrors(serverFieldsErrors)
        return isValid
    }

    function hasErrors() {
        let hasErrors = false
        Object.values(errors).forEach((value) => {
            if (value.length > 0) {
                hasErrors = true
            }
        })
        return hasErrors
    }

    return (
        <main>
            <div id="login">
                <h2>{t('account.title')}</h2>
                <form className="form" method="post" onSubmit={handleSubmit}>
                    <FormInput
                        required
                        name="name"
                        value={user.name}
                        error={errors.name}
                        label={t('account.usrName')}
                        onChange={handleChange}
                        type="text"
                    />
                    <FormInput
                        required
                        name="password"
                        value={user.password}
                        error={errors.password}
                        label={t('account.password')}
                        onChange={handleChange}
                        type="password"
                    />
                    <FormButtons
                        formMode={currentFormMode}
                        cancelPath="/"
                        error={globalErrorMessage}
                        submitButtonLabel={t('form.actions.login')}
                    />
                    <p className={logoutMessage ? 'addEditSuccess' : 'errors-text'}>{loginFailed}</p>
                </form>
            </div>
        </main>
    )
}

export default LoginForm
