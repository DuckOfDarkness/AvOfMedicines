import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './i18n';
import ChangeLanguage from "./components/fragments/ChangeLanguage";


ReactDOM.render(
    <React.StrictMode>
        <ChangeLanguage/>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
)

