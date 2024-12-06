import React, { Component } from "react";
import Footer from "../generalComponents/Footer";
import EnterForm from "./components/EnterForm";
import { useNavigate } from 'react-router-dom';

function Enter() {
    return (
    <>
        <EnterForm />
        <Footer />
    </>
    )
}

export default Enter