import React, {useState} from "react";
import Header from "./components/fragments/Header";
import Navigation from "./components/fragments/Navigation";
import MainContent from "./components/other/MainContent";
import Footer from "./components/fragments/Footer";
import {BrowserRouter as Router, Route, Routes, useNavigate} from "react-router-dom";
import WholesalersList from "./components/Wholesasler/WholesalersList";
import WholesalerDetails from "./components/Wholesasler/WholesalerDetails";
import WholesalerForm from "./components/Wholesasler/WholesalerForm";
import AvailabilitiesList from "./components/Availability/AvailabilitiesList";
import AvailabilityDetails from "./components/Availability/AvailabilityDetails";
import AvailabilityForm from "./components/Availability/AvailabilityForm";
import MedicinesList from "./components/Medicines/MedicinesList";
import MedicinesForm from "./components/Medicines/MedicinesForm";
import ProducerList from "./components/Producer/ProducerList";
import ProducerDetails from "./components/Producer/ProducerDetails";
import ProducerForm from "./components/Producer/ProducerForm";
import MedicinesDetails from "./components/Medicines/MedicinesDetails";
import {render} from "react-dom";
import LoginForm from "./components/other/LoginForm";
import ProtectedRoute from "./helpers/ProtectedRoute";
import {useTranslation} from "react-i18next";
import UserPulpit from "./components/User/UserPulpit";


function App() {
    const {t} = useTranslation();


    const [user, setUser] = useState()
    // const [currentUser, setCurrentUser ] = useState()

    const handleLogin = (user) => {
        localStorage.setItem('user', user)
        setUser(user)
        window.location.href = '/user';

    }

    const handleLogout = () => {
        localStorage.removeItem('user')
        const message = t('account.logout_message')
        setUser(null)
        // setCurrentUser(undefined)
        localStorage.setItem("logoutMessage", message)
        window.location.href = '/login';
    }

    return (
        <Router>
            <div>
                <Header/>
                <Navigation handleLogout={handleLogout} />
                <Routes>
                    <Route exact path="/" element={<MainContent/>}  />

                    <Route exact path="/wholesaler" element={ <ProtectedRoute><WholesalersList/> </ProtectedRoute>} />
                    <Route exact path="/wholesaler/details/:wholesalerId" element={<ProtectedRoute><WholesalerDetails/></ProtectedRoute>} />
                    <Route exact path="/wholesaler/add" element={<ProtectedRoute><WholesalerForm/></ProtectedRoute>} />
                    <Route exact path="/wholesaler/edit/:wholesalerId" element={<ProtectedRoute><WholesalerForm/></ProtectedRoute>} />

                    <Route exact path="/availability" element={<AvailabilitiesList/>} />
                    <Route exact path="/availability/details/:availabilityId" element={<ProtectedRoute><AvailabilityDetails/></ProtectedRoute>} />
                    <Route exact path="/availability/add" element={<ProtectedRoute><AvailabilityForm/></ProtectedRoute>} />
                    <Route exact path="/availability/edit/:availabilityId" element={<ProtectedRoute><AvailabilityForm/></ProtectedRoute>} />

                    <Route exact path="/medicines" element={<ProtectedRoute><MedicinesList/></ProtectedRoute>} />
                    <Route exact path="/medicines/details/:medicinesId" element={<ProtectedRoute><MedicinesDetails/></ProtectedRoute>} />
                    <Route exact path="/medicines/add" element={<ProtectedRoute><MedicinesForm/></ProtectedRoute>} />
                    <Route exact path="/medicines/edit/:medicinesId" element={<ProtectedRoute><MedicinesForm/></ProtectedRoute>} />

                    <Route exact path="/producer" element={<ProtectedRoute><ProducerList/></ProtectedRoute>} />
                    <Route exact path="/producer/details/:producerId" element={<ProtectedRoute><ProducerDetails/></ProtectedRoute>} />
                    <Route exact path="/producer/add" element={<ProtectedRoute><ProducerForm/></ProtectedRoute>} />
                    <Route exact path="/producer/edit/:producerId" element={<ProtectedRoute><ProducerForm/></ProtectedRoute>} />

                    <Route exact path="/user" element={<ProtectedRoute><UserPulpit/></ProtectedRoute>} />
                    {/*<Route exact path="/user/details/:userId" element={<ProtectedRoute><UserPulpitDetails/></ProtectedRoute>} />*/}
                    {/*<Route exact path="/user/add" element={<ProtectedRoute><UserPulpitForm/></ProtectedRoute>} />*/}
                    {/*<Route exact path="/user/edit/:userId" element={<ProtectedRoute><UserPulpitForm/></ProtectedRoute>} />*/}

                    <Route path="/login" element={<LoginForm handleLogin={handleLogin} />} />
                </Routes>
                <Footer/>
            </div>
        </Router>

    );

}



export default App;