import React, { Component } from 'react';

class EnterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: ''
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => { 
    event.preventDefault();
    const { email, password } = this.state;

    if (password.length < 3) {
      this.setState({ error: 'Неверная почта или пароль' });
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
      
      let data={
        id: 1
      }
      
      
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render() {
    const { email, password, error } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>
            Электронная почта:
            <input
              type="email"
              name="email"
              onChange={this.handleChange}
              required //обязательное поле
            />
          </label>
        </div>
        <div>
          <label>
            Пароль:
            <input
              type="password"
              name="password"
              onChange={this.handleChange}
              required //обязательное поле
            />
          </label>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p> //разообрать
        }
        <button type="submit">Войти</button>
      </form>
    );
  }
}

export default EnterForm;
