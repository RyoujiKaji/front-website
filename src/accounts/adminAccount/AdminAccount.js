import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/DataContext';
import Header from '../general/Header';
import PrivateInfo from '../general/PrivateInfo';
//import { DataContext } from '../context/DataContext';

const AdminAccount = () => {

    const navigate = useNavigate();
    //Получаем из контекста id пользователя
    const data = useAppContext().data;
    const userId = data.id;

    const handleClickEdit = ()=>{
        navigate("/alluserstable")
    }

    return (
        <>
        <Header role={'admin'} />
        <PrivateInfo id={userId}/>
        <button onClick={handleClickEdit}>Редактировать пользователей</button>
        </>
    )
};

export default AdminAccount; // Экспортируем компонент