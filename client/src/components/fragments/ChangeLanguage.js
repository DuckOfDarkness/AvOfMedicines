import React from "react";
import {Navigation} from "../../index";
import {useTranslation} from "react-i18next";

function ChangeLanguage() {

    const {t, i18n} = useTranslation();
    let selected;
    const handleLanguageChange = (lng) => {
        localStorage.setItem('language', lng);
        i18n.changeLanguage(lng)
        selected = lng;
        console.log("selected: "+selected)
    }

    let x = 'selected'
    return (
        <>
            <button type="button" className={localStorage.getItem('language') === 'pl'? '' :'language-unactive'} onClick={() => handleLanguageChange('pl')}>
                <img src="/images/pl.jpg" width="37.5" height="25" alt="pl"></img></button>
            &nbsp;&nbsp;
            <button type="button" className={localStorage.getItem('language') === 'en'? '' :'language-unactive'} onClick={() => handleLanguageChange('en')}>
                <img src="/images/en.jpg" width="37.5" height="25" alt="en"></img>
            </button>
        </>
    )
}


export default ChangeLanguage


