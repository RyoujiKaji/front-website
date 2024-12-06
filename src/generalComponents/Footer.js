import React, { Component } from 'react'

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visits: 0,
            date: "",
            error: ''
        };
    }

    componentDidMount() {
        try {
            /*  const response = fetch('https://example.com/api/visitsanddate', { // Замените на Ваш API //await - без ответа действие не продолжится
               method: 'POST'
             });
       
             if (!response.ok) {
               throw new Error('Ошибка получения данных');
             } 
       
             const data = response.json();
             */
            let data = {
                visits: 12,
                date: "06.12.2024"
            }

            this.setState({
                visits: data.visits,
                date: data.date
            });

        } catch (error) {
            this.setState({ error: error.message });
        }
    }

    render() {
        const { visits, date, error } = this.state;
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
    }
}

export default Footer