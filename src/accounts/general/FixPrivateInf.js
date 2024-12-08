import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/DataContext';

const FixPrivateInf = () => {
    //Состояния
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [errorDate, setErrorDate] = useState('');
    //const [id, setId] = useState('');
    //const [userRole, setUserRole] = useState('');

    //const oldName='', oldDate='', oldEmail='';
    const [oldName, setOldName] = useState('');
    const [oldDate, setOldDate] = useState('');
    const [oldEmail, setOldEmail] = useState('');

    //Навигация и контекст
    const navigate = useNavigate();
    const data = useAppContext().data
    const id = data.id;
    const userRole = data.role;

    //получение исходных данных
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

            setOldName(data.name);
            setOldDate(data.date);
            setOldEmail(data.email);

        } catch (error) {
            setError(error.message);
        }
    }, []);

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

        //обработка запроса 
        try {

            if (oldName === name || oldDate === date || oldEmail === email) {
                throw new Error('Новые данные совпадают со старыми');
            }

            /* const response = await fetch('https://example.com/api/fixprivateinf', { // Замените на Ваш API //await - без ответа действие не продолжится
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, date, email, id }),
            });

            if (!response.ok) {
                throw new Error('Неверная почта или пароль');
            }

            const data = await response.json(); //разобрать //получаем тело ответа в формате json объекта  
 */
            let data = {
                success: true,
                error: 'У вас уже есть аккаунт, зарегистрированный на эту почту'
            }

            if (!data.success) {
                throw new Error(data.error);
            }

            //setData(data);
            navigate('/' + userRole + 'account');
            alert("Данные успешно изменены")

        } catch (error) {
            setError(error.message); // Устанавливаем ошибку
        }
    };

    const handleReturnClick = () => {
        navigate('/' + userRole + 'account');
    }

    //Создание компонента
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Имя пользователя:
                        <input
                            type="text"
                            name="name"
                            onChange={handleChange}
                            placeholder={oldName}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Дата рождения:
                        <input
                            type="date"
                            name="date"
                            onChange={handleChange}
                        />
                        <label style={{ color: 'grey' }}>{oldDate}</label>
                        {errorDate && <p style={{ color: 'red' }}>{errorDate}</p>}
                    </label>
                </div>
                <div>
                    <label>
                        Электронная почта:
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            placeholder={oldEmail}
                        />
                    </label>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Изменить</button>
            </form>
            <button onClick={handleReturnClick}>Вернуться в личный кабинет</button>
        </>
    );
};

export default FixPrivateInf; // Экспортируем компонент