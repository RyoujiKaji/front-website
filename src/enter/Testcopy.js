import React, {useContext} from "react";
import Footer from "../generalComponents/Footer";
import EnterForm from "./components/EnterForm";
import { DataContext } from "../context/DataContext";

function Testcopy() {
    const { data } = useContext(DataContext);
    return (
        <>
            <p>Text</p>
        </>
    )
}

export default Testcopy