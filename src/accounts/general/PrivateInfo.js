import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageFetcher from '../../generalComponents/ImageFetcher';

const PrivateInfo = (props) => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [id, setId] = useState(props.id);

    const navigate=useNavigate();

    useEffect(() => {
        try {
            /* const response = fetch('https://example.com/api/privateinf', { // Замените на Ваш API //await - без ответа действие не продолжится
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id })
            });

            if (!response.ok) {
                throw new Error('Ошибка получения данных');
            }

            const data = response.json(); */

            let data = {
                name: 'Jon',
                date: "2005-03-01",
                email: 'mail@gmail.com'
            }

            setName(data.name);
            setDate(data.date);
            setEmail(data.email);

        } catch (error) {
            setError(error.message);
        }
    });

    const handleClick = (event) => {
        navigate('/fixprivateinfo')
    }

    //<ObtainedImage url='https://example.com/api/avatar' id={id}/>
    return (
        <div>
            <p>Ава добавить</p>
            <p>Имя пользователя: {name}</p>
            <p>Дата рождения: {date}</p>
            <p>Электронная почта: {email}</p>
            <button onClick={handleClick}>Изменить личные данные</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default PrivateInfo