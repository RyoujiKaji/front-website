import React, { Component } from "react";
import Footer from "../generalComponents/Footer";
import EnterForm from "./components/EnterForm";
import { useNavigate } from 'react-router-dom';

function Enter() {
    const navigate = useNavigate();

    const handleClick = () =>{
        navigate("/registration")
    }

    return (
    <>
        <div class = "enter">
        <EnterForm />
        <p onClick={handleClick} style={{ color: 'blue' }}>Нет аккаунта? Зарегиcтрироваться</p>
        <Footer />
        </div>
    </>
    )
}

export default Enter