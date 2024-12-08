import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/DataContext';

const Header = (props) => {

    const navigate=useNavigate();
    const setData = useAppContext().setData;

    const handleClick = (event) => {
        switch(event.target.name){
            case 'news': navigate("/"); return;
            case 'home': {
                navigate('/home'); 
                return;
            }
            case 'exit':{
                setData({
                    id: '',
                    role: ''
                })
                navigate('/');
                return;
            }
            default: return;
        }
    }

    const userRole=()=>{
        switch(props.role){
            case 'user': return 'пользователя';
            case 'moder': return 'модератора';
            case 'admin': return 'администратора';
            default: return;
        }
    }

    return (
       <>
       <label>Игровой портал: личный кабинет {userRole()} </label>
       <button onClick={handleClick} name='news'>Новости</button>
       <button onClick={handleClick} name='home'>Домашняя страница</button>
       <button onClick={handleClick} name='exit'>Выйти из личного кабинета</button>
       </>
    )
};

export default Header;