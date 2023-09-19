import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useLocation } from "react-router-dom";
import {useTranslation} from "react-i18next";
import {getUserApiCall} from "../../apiCalls/User/userApiCalls";
import UserListTable from "../Tables/User/UserListTable";
import {getCurrentUser} from "../../helpers/authHelper";
import {getProducerByIdApiCall} from "../../apiCalls/Producer/producerApiCalls";
import FormButtons from "../Form/FormButtons";



function UserPulpit(props) {

    const { t, i18n } = useTranslation();
    const currentUser = getCurrentUser()

    // const [message, setMessage] = useState('');
    const location = useLocation();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false)
    const [users, setUsers] = useState([]);
    const [allUser, setAllUser] = useState([]);

    const [username, setUsername] = useState('')

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

        getUserApiCall()
            .then((res) => res.json())
            .then((data) => {
                setIsLoaded(true);
                setUsers(data)
            })
            .catch(error => {
                setIsLoaded(true)
                setError(error.message);
            });

    }, []);

    console.log(currentUser.username)

    if(currentUser.role === 'admin'){
        return(
            <main>
                <h2>{t('top_menu.user_account')}</h2>
                <hr/>

                <h3>Witaj <span className="deepskyblue_color_text">{currentUser.username}</span> {t('account.logAs')}<span className='deleteSuccess'> admin</span></h3>

                <Link class="user-action-button-change-data">{t('account.edit')}</Link>
                <Link class="user-action-button-change-password">{t('account.change_password')}</Link>

                <h2>{t("account.users")}</h2><hr/>&nbsp;
                { !isLoaded  ? <p>{t('various.data.loading')}</p> : <UserListTable usrsList={users}/>}
                <p className="addEditSuccess">{addEditSuccess}</p>
                <p className="deleteSuccess">{deleteMessage}</p>
                <p>
                    <Link to="/user/add" className="button-add">{t('account.add_admin')}</Link>
                </p>
            </main>
        )
    }else{

        return(
            <main>
                <h2>{t('top_menu.user_account')}</h2>
                <hr/>
                <h3>Witaj <span className="deepskyblue_color_text">{currentUser.username}</span> {t('account.logAs')}<span className={currentUser.role === 'producer' ? 'addEditSuccess' :
                    'yellow_color_text'}>&nbsp;
                    {currentUser.role === 'producer' ? t('account.producer') :
                            (currentUser.role === 'wholesaler') ? t('account.wholesaler') : ''}</span></h3>

            </main>
        )
    }

}

export default UserPulpit