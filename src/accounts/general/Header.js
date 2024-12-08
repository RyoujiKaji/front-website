import React from 'react';

const Header = (props) => {

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
       <label>Игровой портал: личный кабинет {userRole()}</label>
       </>
    )
};

export default Header;