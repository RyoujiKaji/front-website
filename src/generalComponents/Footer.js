import React, { useEffect, useState } from 'react';

const Footer = () => {
    const [visits, setVisits] = useState(0);
    const [date, setDate] = useState("");
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/general/footer', { // Замените на Ваш API
                    method: 'POST'
                });

                if (!response.ok) {
                    throw new Error('Ошибка получения данных');
                }

                const data = await response.json();

                setVisits(data.visits);
                setDate(data.date);

            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []); // Пустой массив зависимостей для выполнения только при монтировании

    return (
        <div>
            <p>
                Посещений: {visits}
            </p>
            <p>
                Сегодня: {date}
            </p>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Footer;
