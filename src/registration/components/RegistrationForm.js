import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import { DataContext } from '../context/DataContext';

const RegistrationForm = () => {
    //Состояния
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState('');
    const [errorDate, setErrorDate] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    //Навигация и контекст
    const navigate = useNavigate();
    // const { setData } = useContext(DataContext);

    //Обработка ввода информации в поля
    const handleChange = (event) => {
        const { name, value } = event.target;

        switch (name) {
            case 'name': {
                setName(value); // Обновляем состояние 
                break;
            }
            case 'date': {
                setErrorDate('');
                setDate(value); // Обновляем состояние
                break;
            }
            case 'email': {
                setEmail(value); // Обновляем состояние email
                break;
            }
            case 'password': {
                setErrorPassword('');
                setPassword(value); // Обновляем состояние password
                break;
            }
            case 'repeatPassword': {
                setErrorPassword('');
                setRepeatPassword(value); // Обновляем состояние
                break;
            }
            default: break;
        }
    };

    //Обработка отправки формы и получения ответа
    const handleSubmit = async (event) => {
        event.preventDefault();

        //Ошибки ввода даты рождения
        if (new Date(date) > new Date()) {
            setErrorDate('Вы еще не родились');
            return;
        }
        if ((new Date().getFullYear() - new Date(date).getFullYear()) > 100) {
            setErrorDate('Вам слишком много лет');
            return;
        }

        //Ошибки ввода паролей
        if (password.length < 3) {
            setErrorPassword('Длина пароля должна быть не меньше 3'); // Устанавливаем ошибку
            return;
        }
        if (repeatPassword !== password) {
            setErrorPassword('Пароли не совпадают'); // Устанавливаем ошибку
            return;
        }

        //обработка запроса 
        try {
            /* const response = await fetch('https://example.com/api/registration', { // Замените на Ваш API //await - без ответа действие не продолжится
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, date, email, password }),
            });

            if (!response.ok) {
                throw new Error('Неверная почта или пароль');
            }

            const data = await response.json(); //разобрать //получаем тело ответа в формате json объекта  
 */
            const response = await fetch('http://localhost:8080/users/registration', { // Замените на Ваш API //await - без ответа действие не продолжится
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: 0,
                    name: name,
                    date: date,
                    image: null,
                    role: "user",
                    email: email, 
                    password: password })
            });

            if (!response.ok) {
                throw new Error('Ошибка запроса');
            }

            //setError(response.json());
            const userData = await response.json(); //разобрать //получаем тело ответа в формате json объекта  
            console.log(userData);
            if (!userData.success) {
                throw new Error(userData.error);
            }

            //setData(data);
            navigate('/');
            alert("Регистрация успешно завершена. Войдите в аккаунт")

        } catch (error) {
            setError(error.message); // Устанавливаем ошибку
        }
    };

    //Создание компонента
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Имя пользователя:
                    <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        required // обязательное поле
                    />
                </label>
            </div>
            <p></p>
            <div>
                <label>
                    Дата рождения:
                    <input
                        type="date"
                        name="date"
                        onChange={handleChange}
                        required // обязательное поле
                    />
                    {errorDate && <p style={{ color: 'red' }}>{errorDate}</p>}
                </label>
            </div>
            <p></p>
            <div>
                <label>
                    Электронная почта:
                    <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        required // обязательное поле
                    />
                </label>
            </div>
            <p></p>
            <div>
                <label>
                    Пароль:
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        required // обязательное поле
                    />
                </label>
                {errorPassword && <p style={{ color: 'red' }}>{errorPassword}</p>}
            </div>
            <p></p>
            <div>
                <label>
                    Повторите пароль:
                    <input
                        type="password"
                        name="repeatPassword"
                        onChange={handleChange}
                        required // обязательное поле
                    />
                </label>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p></p>
            <button type="submit">Зарегистироваться</button>
        </form>
    );
};

export default RegistrationForm; // Экспортируем компонент