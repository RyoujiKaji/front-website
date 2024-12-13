import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
//import { useAppContext } from '../../context/DataContext';

const FixRole = () => {
    //Состояния
    // const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const { state } = useLocation();
    const { id, oldRole } = state;

    // Устанавливаем первую кнопку отмеченной по умолчанию
    const [selectedOption, setSelectedOption] = useState(oldRole);

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
        console.log(selectedOption);
    };

    //Навигация и контекст
    const navigate = useNavigate();

    //Обработка отправки формы и получения ответа
    const handleClick = async (event) => {
        //обработка запроса 
        try {
            if (oldRole === selectedOption) {
                throw new Error("Новые данные совпадают со старыми")
            }

            const response = await fetch('http://localhost:8080/users/fixrole', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    role: selectedOption,
                    id: id
                }),
            });

            if (!response.ok) {
                throw new Error('Ошибка запроса');
            }

            const data = await response.json(); //разобрать //получаем тело ответа в формате json объекта  
            /* let data = {
                success: true,
                error: 'У вас уже есть аккаунт, зарегистрированный на эту почту'
            } */

            if (!data.success) {
                throw new Error(data.error);
            }

            //setData(data);
            // navigate('/' + userRole + 'account');

            //throw new Error(selectedOption);
            navigate(-1);
            alert("Данные успешно изменены");

        } catch (error) {
            setError(error.message); // Устанавливаем ошибку
        }
    };

    const handleReturnClick = () => {
        navigate(-1);
    }

    //Создание компонента
    return (
        <>
            <div>
                <p>
                    <input type="radio" onChange={handleChange} value="user" checked={selectedOption === 'user'} name="role" />
                    Пользователь
                </p>
                <p>
                    <input type="radio" onChange={handleChange} value="moder" checked={selectedOption === 'moder'} name="role" />
                    Модератор
                </p>
                <p>
                    <input type="radio" onChange={handleChange} value="admin" checked={selectedOption === 'admin'} name="role" />
                    Администратор
                </p>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={handleClick}>Изменить</button>
            <p>
                <button onClick={handleReturnClick}>Вернуться</button>
            </p>
        </>
    );
};

export default FixRole; // Экспортируем компонент
