import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import RegistrationForm from './components/RegistrationForm';
import Footer from '../generalComponents/Footer';

const Registration = () => {

    const navigate = useNavigate();

    const handleClick = () =>{
        navigate("/")
    }

    return (
        <>
            <div class = "registration">
            <RegistrationForm />
            <p onClick={handleClick} style={{ color: 'blue' }}>Есть аккаунт? Войти</p>
            <Footer />
            </div>
        </>
    )
};

export default Registration; // Экспортируем компонент