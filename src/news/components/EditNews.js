import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ImageUploader from './ImageUpLoader';
import { useAppContext } from '../../context/DataContext';
//import { DataContext } from '../context/DataContext';

const EditNews = () => {
    //Состояния
   // const [author, setAuthor] = useState('');

    const today = new Date();
  //  const partDate = today.split('-');
    const newFormatDate = today.getDate().toString()+ '.'
     + (today.getMonth()+1).toString() + '.' + today.getFullYear().toString();
    const [date, setDate] = useState('');

    console.log(newFormatDate);
    console.log(date)

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const { state } = useLocation();
    const id  = state?.id;

    // const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState('');

    const imgUploaderRef = useRef();

    //Навигация и контекст
    const navigate = useNavigate();
    const data = useAppContext().data;
    const userId = data.id;
    // const { setData } = useContext(DataContext);

    //Обработка ввода информации в поля
    const handleChange = (event) => {
        const { name, value } = event.target;

        switch (name) {
            case 'title': {
                setTitle(value); // Обновляем состояние email
                break;
            }
            case 'content': {
                setContent(value); // Обновляем состояние password
                break;
            }
            default: break;
        }
    };

    //Обработка отправки формы и получения ответа
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(date)
        //обработка запроса 
        try {

/*             if(title===''&&content===''){
                throw new Error('Вы не можете создать пустую новость')
            } */

            const response1 = await fetch('http://localhost:8080/users/privateinfo', { // Добавьте await
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: userId })
            });

           // fetchName();

            if (!response1.ok) { // Проверьте статус ответа
                throw new Error('Ошибка запроса name');
            }

            const userName = await response1.json(); // Добавьте await для разбора JSON
            console.log(userName.name);
            const author= userName.name;

            //setAuthor(userName.name);

            const response = await fetch('http://localhost:8080/news/editnews', { // Замените на Ваш API //await - без ответа действие не продолжится
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: id,
                    author: author,
                    date: newFormatDate,
                    image: null,
                    title: title,
                    content: content
                })
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

            imgUploaderRef.current.uploadImg();

            //setData(data);
            navigate(-1);
            alert("Новость готова")

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
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Заголовок:
                        <input
                            type="text"
                            name="title"
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <p></p>
                <div>
                    <label>
                        Текст:
                        <textarea
                            name="content"
                            onChange={handleChange}
                        ></textarea>
                    </label>
                </div>
                <p></p>
                <div>
                    <label>Иллюстрация:</label>
                    <ImageUploader ref={imgUploaderRef} id={id} />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <p></p>
                <button type="submit">Создать новость</button>
            </form>
            <button onClick={handleReturnClick}>Вернуться</button>
        </>
    );
};

export default EditNews; // Экспортируем компонент