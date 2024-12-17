import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/DataContext';
import Header from '../general/Header';
import PrivateInfo from '../general/PrivateInfo';


const AdminAccount = () => {

    const navigate = useNavigate();
    //Получаем из контекста id пользователя
    const data = useAppContext().data;
    const userId = data.id;

    const handleClickEdit = (event) => {
        switch(event.target.name){
            case 'users': navigate("/alluserstable"); break;
            case 'news':  navigate('/editnews', { state: { id: 0 } }); break;
            default: break;
        }
    }

    return (
        <>
            <Header role={'admin'} />
            <PrivateInfo id={userId} />
            <div class = "header"><p></p>
                <button onClick={handleClickEdit} name='news'>Создать новость</button>
            </div>
            <div class = "header"><p></p>
                <button onClick={handleClickEdit} name='users'>Редактировать пользователей</button>
            </div>
        </>
    )
};

export default AdminAccount; // Экспортируем компонент