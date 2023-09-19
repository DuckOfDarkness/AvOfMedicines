import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getMedicinesByIdApiCall} from "../../apiCalls/Medicines/medicinesApiCalls";
import MedicinesDetailsTable from "../Tables/Medicines/MedicinesDetailsTable";
import { useTranslation } from 'react-i18next';
import {t} from "i18next";
import {getFormattedData} from "../../helpers/dateHelper";

function MedicinesDetails(){
    const { t } = useTranslation();

    let pathname = window.location.pathname
    let id = pathname.split('/')

    let med_id = id[3]
    const [medicines, setMedicines] = useState({})
    const [producer, setProducer] = useState({})
    const [availabilities, setAvailabilities] = useState({})
    // const [wholesalerMedicines, setWholesalerMedicines] = useState({})

    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [message, setMessage] = useState('')

     useEffect(() => {
             getMedicinesByIdApiCall(med_id)
                 .then(res => res.json())
                 .then((data) => {
                     setMedicines(data);
                     setProducer(data.producer)
                     setAvailabilities(data.wholesalerMedicines)
                     // setWholesalerMedicines(data.wholesalerMedicines)
                     setIsLoaded(true)
                 })
             .catch((error) => {
                 setIsLoaded(true)
                 setError(error)
             })
     },[])

            console.log("availabilities")
            console.log(availabilities)

    let content;
    if(error) {
        content = <p>{t('various.data.error')} {error.message}</p>
    }else if(!isLoaded){
        content = <p>{t('various.data.loading')}</p>
    }else if(message){
        content = <p>{message}</p>
    }else{
        content = <MedicinesDetailsTable medData = {medicines}/>
    }
    return (
        <main>
            {content}
            <p><Link to="/medicines" className="button-add">{t('various.details.return')}</Link></p>
        </main>
    )
}


// class MedicinesDetails extends React.Component{
//     constructor(props) {
//         super(props);
//         let pathname = window.location.pathname
//         let id = pathname.split('/')
//         let med_id = id[3]
//         this.state = {
//             medId: med_id,
//             medicines: null,
//             availabilities: null,
//             error: null,
//             isLoaded: false,
//             message: null
//         }
//     }
//
//
//     componentDidMount() {
//         this.fetchMedicinesDetails()
//     }
//
//     fetchMedicinesDetails = () =>{
//         getMedicinesByIdApiCall(this.state.medId)
//             .then(res => res.json())
//             .then(
//                 (data) => {
//                     if(data.message){
//                         this.setState({
//                             medicines: null,
//                             message: data.message
//                         })
//                     } else{
//                         this.setState({
//                             medicines:data,
//                             message: null
//                         })
//                     }
//                     this.setState({
//                         isLoaded: true
//                     })
//                 },
//                 (error) => {
//                     this.setState({
//                         isLoaded:true,
//                         error
//                     })
//                 })
//     }
//
//     render() {
//
//         const {medicines, error, isLoaded, message} = this.state
//         let content;
//         if(error) {
//             content = <p>{t('various.data.error')} {error.message}</p>
//         }else if(!isLoaded){
//             content = <p>{t('various.data.loading')}</p>
//         }else if(message){
//             content = <p>{message}</p>
//         }else{
//             content = <MedicinesDetailsTable medData = {medicines}/>
//         }
//         return(
//
//             <main>
//                 <h2>{t('medicines.form.details.title')}</h2>
//                 {content}
//                 <p><Link to="/medicines" className="button-add">{t('various.details.return')}</Link></p>
//             </main>
//         )
//     }
// }

export default MedicinesDetails

