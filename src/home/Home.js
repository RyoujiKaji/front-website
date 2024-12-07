import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/DataContext';

const Home = () => {

    const navigate = useNavigate();
    const { data, setData } = useAppContext();
    const userRole = data.role;
    const userId = data.id;

    const handleClick = () => {
        navigate("/")
    }

    return (
        <>
            <p onClick={handleClick} style={{ color: 'blue' }}>{userId} {userRole}</p>
        </>
    )
};

export default Home; // Экспортируем компонент