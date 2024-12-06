import React, {useContext} from "react";
import Footer from "../generalComponents/Footer";
import EnterForm from "./components/EnterForm";
import { DataContext } from "../context/DataContext";

function Test() {
    const { data } = useContext(DataContext);
    return (
        <>
            <Footer />
        </>
    )
}

export default Test