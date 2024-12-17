import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import News from "./components/News";
import { useAppContext } from "../context/DataContext";

const AllNews = () => {
    const [error, setError] = useState('');
    const [news, setNews] = useState([]); // Изменено на массив

    const navigate = useNavigate();
    const data= useAppContext().data;
    const userRole = data.role;
    /*  const data = useAppContext().data;
     const userRole = data.role;
  */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/news/allnewswithoutimg', {
                    method: 'POST'
                });

                if (!response.ok) {
                    throw new Error('Ошибка запроса');
                }

                const userData = await response.json();
                setNews(userData); // Установите данные пользователей напрямую

            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    const allNewsComponentsArray = news.reverse().map(oneNews => (
        <News key={oneNews.id} id={oneNews.id} author={oneNews.author} date={oneNews.date} title={oneNews.title}
            content={oneNews.content} />
    ));

    const handleReturnClick = () => {
        navigate(-1);
    }

    const handleClick = ()=>{
        navigate('/editnews', { state: { id: 0 } })
    }

    return (
        <>
            <p>
                <button style={{ left: '10px' }} onClick={handleReturnClick}>Вернуться</button>
            </p>
            {(userRole === 'moder' || userRole === 'admin') &&
            <p>
                <button style={{ left: '10px' }} onClick={handleClick}>Создать новость</button>
            </p>}
            <div style={{ padding: '10px' }}>
                <div>
                    {allNewsComponentsArray}
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </>
    )
};

export default AllNews;