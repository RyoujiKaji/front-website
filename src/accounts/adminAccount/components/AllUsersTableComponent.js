import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageFetcher from "../../general/ImageFetcher";

const AllUsersTableComponent = (props) => {

    const navigate = useNavigate();
    //Получаем из контекста id пользователя
    /*const data = useAppContext().data;
    const userId = data.id; */

    const partDate=props.date.split('-');
    const newFormatDate = partDate[2]+'.'+partDate[1]+'.'+partDate[0];

    const [name, setName] = useState(props.name);
    const [date, setDate] = useState(newFormatDate);
    const [email, setEmail] = useState(props.email);
    const [id, setId] = useState(props.id);
    const [role, setRole] = useState(props.role);
    //const [error, setError] = useState('');

    const handleClick = (event) => {
        switch (event.target.name) {
            case 'privateInf': navigate('/fixprivateinfo', { state: { id: id } }); break;
            case 'avatar': navigate('/changeAvatar', { state: { id: id } }); break;
            default: break;
        }
    }

    //<ObtainedImage url='https://example.com/api/avatar' id={id}/>
    return (
        <div style={{border: '3px solid rgb(0, 0, 0)', padding: '10px'}}>
            <p>ID пользователя: {id}</p>
            <ImageFetcher id={id}/>
            <button name='avatar' onClick={handleClick}>Изменить аватар</button>
            <p>Имя пользователя: {name}</p>
            <p>Дата рождения: {date}</p>
            <p>Электронная почта: {email}</p>
            <p>Роль: {role}</p>
            <button name='privateInf' onClick={handleClick}>Изменить личные данные</button>
        </div>
    );
};

export default AllUsersTableComponent; // Экспортируем компонент