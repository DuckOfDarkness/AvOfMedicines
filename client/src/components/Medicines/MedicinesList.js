import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getMedicinesApiCall} from "../../apiCalls/Medicines/medicinesApiCalls";
import MedicinesListTable from "../Tables/Medicines/MedicinesListTable";
import {useLocation } from "react-router-dom";
import {useTranslation} from "react-i18next";



function MedicinesList(props) {

    const { t, i18n } = useTranslation();

    // const [message, setMessage] = useState('');
    const location = useLocation();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false)
    const [medicines, setMedicines] = useState([]);

    const[addEditSuccess, setAddEditSuccess] = useState('')
    const[deleteMessage, setDeleteMessage] = useState('')

    // let message = document.querySelector('.errors-text')


    // const {state} = location;
    // const notice = state && state.notice ? state.notice : ''
    // setMessage(notice)


    useEffect(() =>{
        setAddEditSuccess(localStorage.getItem("formMessage"))
        setDeleteMessage(localStorage.getItem("deleteMessage"))
        if(addEditSuccess !== null){
                setTimeout(() =>{
                    localStorage.setItem("formMessage", '')
                    setAddEditSuccess('')
                }, 2000)
        }
        if(deleteMessage !== null){
            setTimeout(() =>{
                localStorage.setItem("deleteMessage", '')
                setDeleteMessage('')
            }, 2000)
        }
        getMedicinesApiCall()
            .then((res) => res.json())
            .then((data) => {
                setIsLoaded(true);
                setMedicines(data)
            })
            .catch(error => {
                setIsLoaded(true)
                setError(error.message);
            });
    }, []);

    return(
        <main>
            <h2>{t('medicines.list.title')}</h2>
            <hr/>
            { !isLoaded  ? <p>{t('medicines.list.loading')}</p> : <MedicinesListTable medList={medicines}/>}
            <p className="addEditSuccess">{addEditSuccess}</p>
            <p className="deleteSuccess">{deleteMessage}</p>
            <p>
                <Link to="/medicines/add" className="button-add">{t('medicines.list.add')}</Link>
            </p>
        </main>
    )
}

export default MedicinesList


//
// class MedicinesList1 extends React.Component {

    // constructor(props) {
    //     super(props);
    //     let notice = props.window.location.state && props.location.state.notice ? props.location.state.notice : ''
    //     this.state = {
    //         error: null,
    //         isLoaded: false,
    //         medicines: [],
    //         notice: notice,
    //     }
    // }
    //
    // componentDidMount() {
    //     this.fetchMedicinesList()
    // }
    //
    // fetchMedicinesList = () => {
    //     getMedicinesApiCall()
    //         .then(res => res.json())
    //         .then(
    //             (data) => {
    //                 this.setState({
    //                     isLoaded: true,
    //                     medicines: data
    //                 });
    //             },
    //             (error) => {
    //                 this.setState({
    //                     isLoaded: true,
    //                     error
    //                 });
    //             }
    //         )

//
//     }
//
//     render() {
//         const {error, isLoaded, medicines} = this.state
//         let content
//
//         if (error) {
//             content = <p>Błąd: {error.message}</p>
//         } else if (!isLoaded) {
//             content = <p>Ładowaie danych leków...</p>
//         } else {
//             content = <MedicinesListTable medList={medicines}/>
//         }
//
//         return (
//             <main>
//                 <h2>Lista leków</h2>
//                 <hr/>
//                 {content}
//                 <p>
//                     <Link to="/medicines/add" className="button-add">Dodaj nowy lek</Link>
//                 </p>
//                 <p className="success">{this.state.notice}</p>
//             </main>
//         )
//     }
// }
