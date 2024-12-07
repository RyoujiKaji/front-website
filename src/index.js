import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Enter from './enter/Enter';
import Registration from './registration/Registration';
import Home from './home/Home';
import UserAccount from './accounts/userAccount/UserAccount';
import ModerAccount from './accounts/moderAccount/ModerAccount';
import AdminAccount from './accounts/adminAccount/AdminAccount';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <DataProvider>
        <Router>
            <Routes>
                <Route path="/" element={<Enter />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/home" element={<Home />} />
                <Route path="/userAccount" element={<UserAccount />} />
                <Route path="/moderAccount" element={<ModerAccount />} />
                <Route path="/adminAccount" element={<AdminAccount />} />
            </Routes>
        </Router>
    </DataProvider>
);
