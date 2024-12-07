import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/DataContext';

const EnterForm = () => {
  const [email, setEmail] = useState(''); // Используем useState для управления состоянием
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { data, setData } = useAppContext();

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'email': {
        setEmail(value); // Обновляем состояние email
        break;
      }
      case 'password': {
        setPassword(value); // Обновляем состояние password
        break;
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password.length < 3) {
      setError('Неверная почта или пароль'); // Устанавливаем ошибку
      return;
    }

    try {
      /* const response = await fetch('https://example.com/api/login', { // Замените на Ваш API //await - без ответа действие не продолжится
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Неверная почта или пароль');
      }

      const data = await response.json(); //разобрать //получаем тело ответа в формате json объекта  */
      let userData = {
        id: 1,
        role: 'user'
      };


      setData({
        id: userData.id,
        role: userData.role
      });
      navigate('/home');

    } catch (error) {
      setError(error.message); // Устанавливаем ошибку
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Войти</button>
    </form>
  );
};

export default EnterForm; // Экспортируем компонент

