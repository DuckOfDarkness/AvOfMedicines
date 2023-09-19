// import React, {useEffect, useState} from "react";
// import formMode from "../../helpers/formHelpser";
// import {
//     addMedicinesApiCall, getMedicinesApiCall,
//     getMedicinesByIdApiCall,
//     updateMedicinesApiCall
// } from "../../apiCalls/Medicines/medicinesApiCalls";
// import {
//     checkRequired,
//     checkTextLengthRange,
//     checkThatItStartsWithACapitalLetter,
//     checkThatDateIs_ThanTheCurrent, checkIfItContainsOnly, checkDateFormat
// } from '../../helpers/validationCommon'
// import FormInput from "../Form/FormInput";
// import FormButtons from "../Form/FormButtons";
// import {getFormattedData} from "../../helpers/dateHelper";
// import {getProducerApiCall, getProducerByIdApiCall} from "../../apiCalls/Producer/producerApiCalls";
//
// function x() {
//     // const Chuyj = () => {
//     //     const history = useHistory();
//     //     return (
//     //         history.push('/medicines')
//     //     )
//     // }
// }
//
// let options;
//
// function getOptions(prod) {
//     options = []
//
//     let obj = {}
//     obj['value'] = 0;
//     obj['label'] = '-- Wybierz z listy --';
//     options.push(obj)
//
//     for (let i of prod) {
//         let obj = {}
//         obj['value'] = i._id;
//         obj['label'] = i.name;
//         options.push(obj)
//     }
// }
//
// let choiceProducer;
//
// class MedicinesForm extends React.Component {
//
//
//     constructor(props) {
//         super(props);
//         let pathname = window.location.pathname
//         let id = pathname.split('/')
//         const paramsMedId = id[3]
//         const currentFormMode = paramsMedId ? formMode.EDIT : formMode.NEW
//         const nameError = currentFormMode === formMode.NEW ? 'Nazwa nie moze być pusta' : ''
//         const expiration_dateError = currentFormMode === formMode.NEW ? 'Data nie może być pusta' : ''
//         const producer_idError = currentFormMode === formMode.NEW ? 'Producent nie może być pusty' : ''
//
//         this.state = {
//             medId: paramsMedId,
//             allProducers: '',
//             options: [],
//             producer: 'empty producer',
//             selectedOption: 'None',
//             med: {
//                 name: '',
//                 parallel_importer: '',
//                 expiration_date: '',
//                 producer_id: ''
//             },
//             errors: {
//                 name: nameError,
//                 parallel_importer: '',
//                 expiration_date: expiration_dateError,
//                 producer_id: producer_idError
//             },
//             formMode: currentFormMode,
//             redirect: false,
//             error: null
//         }
//         if (currentFormMode === formMode.NEW) {
//
//         } else {
//
//         }
//         this.fetchProducers()
//
//     }
//
//     componentDidMount = () => {
//         const currentFormMode = this.state.formMode
//         if (currentFormMode === formMode.EDIT) {
//             this.fetchMedicinesDetails()
//         }
//     }
//
//     handleChange = (event) => {
//         const {name, value} = event.target
//         const med = {...this.state.med}
//         med[name] = value
//
//         const errorMessage = this.validateField(name, value)
//         const errors = {...this.state.errors}
//         errors[name] = errorMessage
//
//         this.setState({
//             // med: med,
//             // errors: errors
//             med,
//             errors
//         })
//     }
//
//     selectHandleChange = ({target}) => {
//         const med = {...this.state.med}
//         const {value} = target
//         this.setState({
//             selectedOption: target.value
//         })
//         med["producer_id"] = value;
//         const errorMessage = this.validateField("producer_id", value)
//         const errors = {...this.state.errors}
//         errors["producer_id"] = errorMessage
//
//         this.setState({
//             med,
//             errors
//         })
//
//     }
//
//     fetchProducers = () => {
//         getProducerApiCall()
//             .then((res) => res.json())
//             .then((data) => {
//                     this.setState({
//                         allProducers: data
//                     })
//                 }
//             )
//     }
//
//     fetchMedicinesDetails = () => {
//         getMedicinesByIdApiCall(this.state.medId)
//             .then((res) => res.json())
//             .then(
//                 (data) => {
//                     if (data.message) {
//                         this.setState({
//                             message: data.message
//                         })
//                     } else {
//                         this.setState({
//                             med: data,
//                             selectedOption: data.producer_id,
//                             message: null
//                         })
//                         getProducerByIdApiCall(data.producer_id)
//                             .then((res) => res.json())
//                             .then((data) => {
//                                 this.setState({
//                                     producer: data
//                                 })
//                             })
//                     }
//                     this.setState({
//                         isLoaded: true
//                     })
//                 })
//             .then()
//             .catch((error) => {
//                 this.setState({
//                     isLoaded: true,
//                     error: error.message
//                 });
//             })
//     }
//
//
//     validateField = (fieldName, fieldValue) => {
//         let errorMessage = '';
//
//         if (fieldName === 'name') {
//             if (!checkRequired(fieldValue)) {
//                 errorMessage = "Nazwa nie moze być pusta";
//             } else if (!checkTextLengthRange(fieldValue, 2, 90)) {
//                 errorMessage = "Nazwa musi zawierać od 2 do 90 znaków.";
//             } else if (checkIfItContainsOnly("numbers", fieldValue)) {
//                 errorMessage = "Nazwa nie może zawierać samych cyfr.";
//             } else if (!checkThatItStartsWithACapitalLetter(fieldValue)) {
//                 errorMessage = "Nazwa musi zaczynać się z dużej litery.";
//             }
//         }
//
//         if (fieldName === 'parallel_importer') {
//             if (checkRequired(fieldValue)) {
//                 if (!checkTextLengthRange(fieldValue, 2, 100)) {
//                     errorMessage = "Importer równoległy może być pusty lub zawierać od 2 do 100 znaków.";
//                 } else if (checkIfItContainsOnly("numbers", fieldValue)) {
//                     errorMessage = "Importer równoległy nie może zawierać samych cyfr.";
//                 } else if (!checkThatItStartsWithACapitalLetter(fieldValue)) {
//                     errorMessage = "Importer równoległy musi zaczynać się z dużej litery.";
//                 }
//             }
//         }
//
//         if (fieldName === 'expiration_date') {
//             if (!checkRequired(fieldValue)) {
//                 errorMessage = "Data nie może być pusta.";
//             } else if (!checkDateFormat(fieldValue)) {
//                 errorMessage = "Wprowadzono błędny format daty. Data powinna być w formacie dd.MM.rrrrr (np. 02.11.2023).";
//             } else if (checkThatDateIs_ThanTheCurrent("earlier", fieldValue)) {
//                 errorMessage = "Data ważności nie może być wcześniejsza niż aktualna.";
//             }
//         }
//
//         if (fieldName === 'producer_id') {
//             if (fieldValue === "0") {
//                 errorMessage = "Producent nie może być pusty";
//             }
//         }
//         return errorMessage
//     }
//
//     render() {
//
//         const {redirect} = this.state
//         if (redirect) {
//             const currentFormMode = this.state.formMode;
//             const notice = currentFormMode === formMode.NEW ? 'Gra została dodana' : 'Gra została zaktualizowana';
//             return (
//             console.log("dsf")
//                 // <Redirect to={{
//                 //     pathname: '/games',
//                 //     state: {
//                 //         notice,
//                 //     }
//                 // }} />
//             )
//         }
//
//         let
//             prod = this.state.allProducers
//
//         getOptions(prod)
//
//         const
//             errorsSummary = this.hasErrors() ? 'Formularz zawiera błędy' : ''
//         const
//             fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
//         const
//             pageTitle = this.state.formMode === formMode.NEW ? 'Nowy lek' : 'Edycja leku'
//
//         choiceProducer = this.state.med.producer_id
//
//         const
//             selectedProducer = this.state.formMode === formMode.NEW ? 0 : choiceProducer
//
//         const
//             globalErrorMessage = errorsSummary || fetchError || this.state.message
//
//         return (
//
//             <main>
//                 <h2> {
//                     pageTitle
//                 }
//
//                 </h2>
//                 <form className="form" onSubmit={this.handleSubmit}>
//                     <FormInput
//                         type="text"
//                         label="Nazwa leku"
//                         required
//                         error={this.state.errors.name}
//                         name="name"
//                         placeholder=" 2 - 90 znaków"
//                         onChange={this.handleChange}
//                         value={this.state.med.name}
//                     />
//                     <FormInput
//                         type="text"
//                         label="Importer równoległy"
//                         error={this.state.errors.parallel_importer}
//                         name="parallel_importer"
//                         placeholder=" Pusty lub 2 - 100 znaków"
//                         onChange={this.handleChange}
//                         value={this.state.med.parallel_importer}
//                     />
//                     <FormInput
//                         type="date"
//                         label="Data ważności"
//                         required
//                         error={this.state.errors.expiration_date}
//                         name="expiration_date"
//                         placeholder="dd.mm.rrrr"
//                         onChange={this.handleChange}
//                         value={getFormattedData(this.state.med.expiration_date)}
//                     />
//
//                     <label>Producent: <abbr title="Pole wymagane" aria-label="required"
//                                             className='symbol-required'> *</abbr></label>
//                     <select name='select' value={this.state.selectedOption} onChange={this.selectHandleChange}
//                             className={this.state.errors["producer_id"] === '' ? '' : "error-input"} required>
//                         {
//                             options.map(({value, label}) => <option value={value}>{label}</option>)
//                         }
//                     </select>
//
//                     <span id="errorSelect" className="errors-text">{this.state.errors["producer_id"]}</span>
//
//
//                     <FormButtons
//                         formMode={this.state.formMode}
//                         error={globalErrorMessage}
//                         cancelPath="/medicines"
//                     />
//                 </form>
//             </main>
//         )
//     }
//
//     handleSubmit = (event) => {
//         event.preventDefault();
//         const isValid = this.validateForm()
//         if (isValid) {
//             const
//                 med = this.state.med,
//                 currentFormMode = this.state.formMode
//             let
//                 promise,
//                 response;
//             if (currentFormMode === formMode.NEW) {
//                 promise = addMedicinesApiCall(med)
//             } else if (currentFormMode === formMode.EDIT) {
//                 const medId = this.state.medId
//                 console.log(med)
//                 promise = updateMedicinesApiCall(medId, med)
//             }
//             if (promise) {
//                 promise
//                     .then(
//                         (data) => {
//                             response = data
//                             if (response.status === 201 || response.status === 500) {
//                                 return data.json()
//                             }
//                         })
//                     .then(
//                         (data) => {
//                             if (!response.ok && response.status === 500) {
//                                 for (const i in data) {
//                                     const errorItem = data[i]
//                                     const errorMessage = errorItem.message
//                                     const fieldName = errorItem.path
//                                     const errors = {...this.state.errors}
//                                     errors[fieldName] = errorMessage
//                                     this.setState({
//                                         errors: errors,
//                                         error: null
//                                     })
//                                 }
//                             } else {
//                                 this.setState({
//                                     redirect: true
//                                 })
//                             }
//                         },
//                         (error) => {
//                             this.setState({error})
//                             console.log(error)
//                         }
//                     )
//             }
//         }
//     }
//
//     validateForm = () => {
//         const med = this.state.med
//         const prod = this.state.allProducers
//         const errors = this.state.errors
//         for (const fieldName in med) {
//             const fieldValue = med[fieldName]
//             const errorMessage = this.validateField(fieldName, fieldValue)
//             errors[fieldName] = errorMessage
//
//         }
//         this.setState({
//             errors: errors
//         })
//         return !this.hasErrors()
//     }
//
//     hasErrors = () => {
//         const errors = this.state.errors
//         for (const errorField in this.state.errors) {
//             if (errors[errorField].length > 0) {
//                 return true
//             }
//         }
//         return false
//     }
// }
//
// export default MedicinesForm