import React from "react";
import { useTranslation } from 'react-i18next';

function Header(){
    const { t } = useTranslation();
    return(
        <header>
            <h1>{t('main.name')}</h1>
            <img src="/images/logo.jpg" alt="Drug Availability Search" width="224" height="348" />
        </header>
    )
}

export default Header