import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageFetcher from '../../generalComponents/ImageFetcher';
import { useAppContext } from '../../context/DataContext';

const PrivateInfo = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const contData = useAppContext().data;

    useEffect(() => {
        const fetchData = async () => { // Оберните в асинхронную функцию
            try {
                const response = await fetch('http://localhost:8080/users/privateinfo', { // Добавьте await
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: contData.id })
                });

                if (!response.ok) { // Проверьте статус ответа
                    throw new Error('Ошибка запроса');
                }

                const userData = await response.json(); // Добавьте await для разбора JSON
                console.log(userData);

                setName(userData.name);
                setDate(userData.date);
                setEmail(userData.email);

            } catch (error) {
                setError(error.message);
            }
        };

        fetchData(); // Вызовите асинхронную функцию
    }, []);

    const handleClick = (event) => {
        switch (event.target.name) {
            case 'privateInf': navigate('/fixprivateinfo'); break;
            case 'avatar': navigate('/changeAvatar'); break;
            default: break;
        }
    }

    //<ObtainedImage url='https://example.com/api/avatar' id={id}/>
    return (
        <div>
            <p>Ава добавить</p>
            <button name='avatar' onClick={handleClick}>Изменить аватар</button>
            <p>Имя пользователя: {name}</p>
            <p>Дата рождения: {date}</p>
            <p>Электронная почта: {email}</p>
            <button name='privateInf' onClick={handleClick}>Изменить личные данные</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default PrivateInfo