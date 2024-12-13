import React from 'react';
import { useNavigate } from 'react-router-dom';
//import { useAppContext } from '../context/DataContext';

const Header = (props) => {

    const navigate = useNavigate();

    //Берем ID и роль пользователя из контекста
    /* const { data, setData } = useAppContext();
    const userRole = data.role;
    const userId = data.id; */

    const handleClick = (event) => {
        switch(event.target.name){
            case 'news': navigate("/"); return;
            case 'account': {
                let way='/'+props.role+'account'
                navigate(way); 
                return;
            }
            default: return;
        }
    }

    return (
       <div class = "header">
       <label>Игровой портал </label>
       <button onClick={handleClick} name='news'>Новости</button>
       <button onClick={handleClick} name='account'>Личный кабинет</button>
       </div>
    )
};

export default Header;