import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/DataContext';
import Footer from '../generalComponents/Footer'
import Header from './components/Header';

const Home = () => {

    const navigate = useNavigate();

    //Берем ID и роль пользователя из контекста
    const data= useAppContext().data;
    const userRole = data.role;

    const handleClick = () => {
        navigate("/")
    }

    return (
        <>
            <Header role={userRole} />
            <Footer />
        </>
    )
};

export default Home; // Экспортируем компонент