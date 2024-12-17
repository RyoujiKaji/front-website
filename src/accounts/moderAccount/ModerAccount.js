import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/DataContext';
import Header from '../general/Header';
import PrivateInfo from '../general/PrivateInfo';


const ModerAccount = () => {

    const navigate = useNavigate();
    //Получаем из контекста id пользователя
    const data = useAppContext().data;
    const userId = data.id;

    const handleClickEdit = () => {
        navigate('/editnews', { state: { id: 0 } })
    }

    return (
        <>
            <Header role={'moder'} />
            <PrivateInfo id={userId} />
            <div class = "header"><p></p>
                <button onClick={handleClickEdit}>Создать новость</button>
            </div>
        </>
    )
};

export default ModerAccount; // Экспортируем компонент