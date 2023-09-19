import React, {useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {useTranslation} from 'react-i18next';
import {isAuthenticated} from "../../helpers/authHelper";


export function Navigation(props) {
    const {t, i18n} = useTranslation();

    const {pathname} = useLocation();

    const handleLanguageChange = (lng) => {
        console.log(lng)
        i18n.changeLanguage(lng)
    }

    const handleReload = () =>{
        if(!pathname.includes('edit') && !pathname.includes('add')){
            window.location.reload()
        }
    }

    const loginLogoutLink = isAuthenticated() ? <button onClick={props.handleLogout}>{t('account.logout')}</button> :
        <Link to="/login" class={(pathname.includes('login')) ? 'active' : ''}>{t('account.logIn')}</Link>

    return (
        <nav>
            <ul>
                <li><Link to="/" class={(pathname === '/') ? 'active' : ''}>{t('top_menu.main-page')}</Link></li>


                <li>{(isAuthenticated()) ? pathname.includes('wholesaler') ? < Link className="active" onClick={handleReload}>{t('top_menu.wholesalers')}</Link> :<Link to= "/wholesaler" class={(pathname.includes('wholesaler')) ? 'active' : ''}>{t('top_menu.wholesalers')}</Link> : ''}</li>

                <li>{isAuthenticated() ? pathname.includes('medicines') ? < Link className="active" onClick={handleReload}>{t('top_menu.medicines')}</Link> :<Link to="/medicines" class={(pathname.includes('medicines')) ? 'active' : ''}>{t('top_menu.medicines')}</Link> : ''}</li>
                <li>{isAuthenticated() ? pathname.includes('producer') ? < Link className="active" onClick={handleReload}>{t('top_menu.producers')}</Link> :<Link to="/producer" class={(pathname.includes('producer')) ? 'active' : ''}>{t('top_menu.producers')}</Link> : ''}</li>

                <li>{pathname.includes('availability') ? < Link className="active" onClick={handleReload}>{t('top_menu.whole-med')}</Link> :<Link to="/availability" class={(pathname.includes('availability')) ? 'active' : ''}>{t('top_menu.whole-med')}</Link>}</li>

                <li>{isAuthenticated() ? pathname.includes('user') ? < Link className="active" onClick={handleReload}>{t('top_menu.user_account')}</Link> :<Link to="/user" class={(pathname.includes('user')) ? 'active' : ''}>{t('top_menu.user_account')}</Link> : ''}</li>

                <li className='lang'>{loginLogoutLink}</li>
            </ul>
        </nav>
    )
}

export default Navigation