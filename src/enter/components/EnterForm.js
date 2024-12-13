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
      const response = await fetch('http://localhost:8080/users/enter', { // Замените на Ваш API //await - без ответа действие не продолжится
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password })
      });

      if (!response.ok) {
        throw new Error('Ошибка запроса');
      }

      //setError(response.json());
      const userData = await response.json(); //разобрать //получаем тело ответа в формате json объекта  
      console.log(userData);
      if (!userData.success) {
        setError("Неверная почта или пароль");
        return;
      }

      setData({
        id: userData.id,
        role: userData.role
      });


      const response1 = await fetch('http://localhost:8080/general/update', { // Замените на Ваш API //await - без ответа действие не продолжится
        method: 'POST'
      });

      if (!response1.ok) {
        throw new Error('Ошибка запроса');
      }

      //setError(response.json());
      const userData1 = await response1.json(); //разобрать //получаем тело ответа в формате json объекта  
      console.log(userData1);
      if (!userData1.success) {
        setError("Ошибка обновления посещений");
        return;
      }

      navigate('/home');
    } catch (error) {
      setError(error.message); // Устанавливаем ошибку
    }}

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
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <p></p>
        <button type="submit">Войти</button>
      </form>
    );
  };

  export default EnterForm; // Экспортируем компонент

