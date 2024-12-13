import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../context/DataContext";
import AllUsersTableComponent from "./AllUsersTableComponent";

const AllUserTable = () => {
    const [error, setError] = useState('');
    const [users, setUsers] = useState([]); // Изменено на массив

    const navigate = useNavigate();
    const data = useAppContext().data;
    const userRole = data.role;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/users/allUserswithoutImg', {
                    method: 'POST'
                });

                if (!response.ok) {
                    throw new Error('Ошибка запроса');
                }

                const userData = await response.json();
                setUsers(userData); // Установите данные пользователей напрямую

            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    const allUsersTableComponentsArray = users.map(user => (
        <AllUsersTableComponent key={user.id} id={user.id} name={user.name} date={user.date} email={user.email} role={user.role} />
    ));

    const handleReturnClick = () => {
        navigate('/' + userRole + 'account');
    }

    return (
        <div style={{ padding: '10px' }}>
            <div>
                {allUsersTableComponentsArray}
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p>
                <button onClick={handleReturnClick}>Вернуться в личный кабинет</button>
            </p>
        </div>
    )
};

export default AllUserTable;
