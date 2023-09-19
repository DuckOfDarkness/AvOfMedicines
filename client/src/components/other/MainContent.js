import React from "react";
import { useTranslation } from 'react-i18next';

function MainContent() {
    const {t} = useTranslation();

    return (
        <main>
            <h2>
                {t('main.title')}
            </h2>
            <hr></hr>
            <p>
                {t('main.description')}
            </p>
        </main>
    )
}

export default MainContent