import React, { Component } from 'react'
import ObtainedImage from '../../generalComponents/ObtainedImage';

class PrivateInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            date: "",
            email: '',
            error: '',
            id: props.id
        };
    }

    componentDidMount() {
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
                date: "25.03.2005",
                email: 'mail@gmail.com'
            }

            this.setState({
                name: data.name,
                date: data.date,
                email: data.email
            });

        } catch (error) {
            this.setState({ error: error.message });
        }
    }

    //<ObtainedImage url='https://example.com/api/avatar' id={id}/>
    render() {
        const { name, date, email, id, error } = this.state;
        return (
            <div>
                <p>Ава добавить</p>
                <p>Имя пользователя: {this.state.name}</p>
                <p>Дата рождения: {this.state.date}</p>
                <p>Электронная почта: {this.state.email}</p>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        );
    }
}

export default PrivateInfo