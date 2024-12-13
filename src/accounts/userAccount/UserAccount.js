import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/DataContext';
import Header from '../general/Header';
import PrivateInfo from '../general/PrivateInfo';

const UserAccount = () => {

    //const navigate = useNavigate();
    //Получаем из контекста id пользователя
    const data = useAppContext().data;
    const userId = data.id;

    /* const handleClick = () =>{
        navigate("/")
    }
 */
    return (
        <>
        <Header role={'user'} />
        <PrivateInfo id={userId}/>
        </>
    )
};

export default UserAccount; // Экспортируем компонент