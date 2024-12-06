import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Enter from './enter/Enter';
import Test from './enter/Test';
import Testcopy from './enter/Testcopy';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <DataProvider>
        <Router>
            <Routes>
                <Route path="/" element={<Enter />} />
                <Route path="/test" element={<Testcopy />} />
            </Routes>
        </Router>
    </DataProvider>
);
