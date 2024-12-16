import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/DataContext";
import ImageFetcher from "./ImageFetcher";

const News = (props) => {

    const navigate = useNavigate();
    //Получаем из контекста id пользователя
    const data = useAppContext().data;
    const userRole = data.role;

    const [author, setAuthor] = useState(props.author);
    const [date, setDate] = useState(props.date);
    const [content, setContent] = useState(props.content);
    const [id, setId] = useState(props.id);
    const [title, setTitle] = useState(props.title);
    //const [error, setError] = useState('');

    const handleClick = (event) => {
        /* switch (event.target.name) {
            case 'edit': navigate('/fixprivateinfo', { state: { id: id } }); break;
            case 'avatar': navigate('/changeAvatar', { state: { id: id } }); break;
            case 'role': navigate('/changerole', { state: { id: id, oldRole: role } }); break;
            default: break;
        } */
        navigate('/editnews', { state: { id: id } });
    }

    //<ObtainedImage url='https://example.com/api/avatar' id={id}/>
    return (
        <div style={{ border: '3px solid rgb(0, 0, 0)', padding: '10px' }}>
            <h1>{title}</h1>
            <ImageFetcher id={id} />
            <p>{content}</p>
            <p>{author}, {date}</p>
            {(userRole === 'moder' || userRole === 'admin') && <button name='role' onClick={handleClick}>Изменить новость</button>}
        </div>
    );
};

export default News; // Экспортируем компонент